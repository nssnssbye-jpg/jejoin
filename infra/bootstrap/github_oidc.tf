data "aws_partition" "current" {}

locals {
  github_environments = {
    dev = {
      state_key = "${var.project_name}/dev/terraform.tfstate"
    }
    staging = {
      state_key = "${var.project_name}/staging/terraform.tfstate"
    }
    prod = {
      state_key = "${var.project_name}/prod/terraform.tfstate"
    }
  }
  github_oidc_arn = var.github_oidc_provider_arn != null ? var.github_oidc_provider_arn : aws_iam_openid_connect_provider.github[0].arn
  environment_bucket_arns = {
    for environment, config in local.github_environments : environment => [
      "arn:${data.aws_partition.current.partition}:s3:::${var.project_name}-${environment}-${data.aws_caller_identity.current.account_id}-${var.aws_region}",
      "arn:${data.aws_partition.current.partition}:s3:::${var.project_name}-${environment}-web-${data.aws_caller_identity.current.account_id}-${var.aws_region}"
    ]
  }
  foundation_boundary_arns = {
    for environment, policy in aws_iam_policy.foundation_service_boundary : environment => policy.arn
  }
}

resource "aws_iam_openid_connect_provider" "github" {
  count = var.github_oidc_provider_arn == null ? 1 : 0

  url             = "https://token.actions.githubusercontent.com"
  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = []

  tags = {
    Name = "github-actions-oidc"
  }
}

data "aws_iam_policy_document" "github_plan_assume_role" {
  for_each = local.github_environments

  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [local.github_oidc_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repository_subject}:pull_request"]
    }
  }
}

data "aws_iam_policy_document" "github_deploy_assume_role" {
  for_each = local.github_environments

  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = [local.github_oidc_arn]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:${var.github_repository_subject}:environment:${each.key}"]
    }
  }
}

resource "aws_iam_role" "github_plan" {
  for_each = local.github_environments

  name                 = "${var.project_name}-github-${each.key}-plan"
  description          = "Read-only Terraform plan role for ${each.key}"
  assume_role_policy   = data.aws_iam_policy_document.github_plan_assume_role[each.key].json
  max_session_duration = 3600
  permissions_boundary = var.github_permissions_boundary_arn

  tags = {
    Name        = "${var.project_name}-github-${each.key}-plan"
    Environment = each.key
    Purpose     = "terraform-plan"
  }
}

resource "aws_iam_role" "github_deploy" {
  for_each = local.github_environments

  name                 = "${var.project_name}-github-${each.key}-deploy"
  description          = "Terraform and web deployment role for the ${each.key} GitHub Environment"
  assume_role_policy   = data.aws_iam_policy_document.github_deploy_assume_role[each.key].json
  max_session_duration = 3600
  permissions_boundary = var.github_permissions_boundary_arn

  tags = {
    Name        = "${var.project_name}-github-${each.key}-deploy"
    Environment = each.key
    Purpose     = "terraform-deploy"
  }
}

data "aws_iam_policy_document" "foundation_service_boundary" {
  for_each = local.github_environments

  statement {
    sid       = "DescribeLogGroups"
    effect    = "Allow"
    actions   = ["logs:DescribeLogGroups"]
    resources = ["*"]
  }

  statement {
    sid    = "PublishEnvironmentFlowLogs"
    effect = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:DescribeLogStreams",
      "logs:PutLogEvents"
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/vpc/${var.project_name}-${each.key}/flow-logs:*"
    ]
  }
}

resource "aws_iam_policy" "foundation_service_boundary" {
  for_each = local.github_environments

  name        = "${var.project_name}-foundation-${each.key}-boundary"
  description = "Maximum permissions for ${each.key} foundation service roles"
  policy      = data.aws_iam_policy_document.foundation_service_boundary[each.key].json

  tags = {
    Name        = "${var.project_name}-foundation-${each.key}-boundary"
    Environment = each.key
    Purpose     = "service-role-boundary"
  }
}

data "aws_iam_policy_document" "github_plan" {
  for_each = local.github_environments

  statement {
    sid = "ReadStateBucketMetadata"
    actions = [
      "s3:GetBucketLocation",
      "s3:GetBucketVersioning",
      "s3:GetEncryptionConfiguration"
    ]
    resources = [aws_s3_bucket.terraform_state.arn]
  }

  statement {
    sid       = "ListEnvironmentState"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.terraform_state.arn]

    condition {
      test     = "StringLike"
      variable = "s3:prefix"
      values   = [each.value.state_key]
    }
  }

  statement {
    sid       = "ReadEnvironmentState"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.terraform_state.arn}/${each.value.state_key}"]
  }

  statement {
    sid       = "DecryptTerraformState"
    actions   = ["kms:Decrypt", "kms:DescribeKey"]
    resources = [aws_kms_key.terraform_state.arn]
  }

  statement {
    sid       = "ReadNetworkConfiguration"
    actions   = ["ec2:Describe*"]
    resources = ["*"]
  }

  statement {
    sid = "ReadKmsConfiguration"
    actions = [
      "kms:DescribeKey",
      "kms:GetKeyPolicy",
      "kms:GetKeyRotationStatus",
      "kms:ListAliases",
      "kms:ListResourceTags"
    ]
    resources = ["*"]
  }

  statement {
    sid = "ReadEnvironmentBuckets"
    actions = [
      "s3:GetBucketLocation",
      "s3:GetBucketPolicy",
      "s3:GetBucketPublicAccessBlock",
      "s3:GetBucketTagging",
      "s3:GetBucketVersioning",
      "s3:GetEncryptionConfiguration",
      "s3:GetLifecycleConfiguration",
      "s3:GetReplicationConfiguration",
      "s3:ListBucket"
    ]
    resources = local.environment_bucket_arns[each.key]
  }

  statement {
    sid = "ReadEnvironmentLogs"
    actions = [
      "logs:DescribeLogGroups",
      "logs:ListTagsForResource"
    ]
    resources = ["*"]
  }

  statement {
    sid = "ReadEnvironmentRoles"
    actions = [
      "iam:GetRole",
      "iam:GetRolePolicy",
      "iam:ListAttachedRolePolicies",
      "iam:ListRolePolicies",
      "iam:ListRoleTags"
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:role/${var.project_name}-${each.key}-*"
    ]
  }

  statement {
    sid = "ReadCloudFrontConfiguration"
    actions = [
      "cloudfront:DescribeFunction",
      "cloudfront:GetCachePolicy",
      "cloudfront:GetDistribution",
      "cloudfront:GetDistributionConfig",
      "cloudfront:GetFunction",
      "cloudfront:GetOriginAccessControl",
      "cloudfront:ListCachePolicies",
      "cloudfront:ListDistributions",
      "cloudfront:ListFunctions",
      "cloudfront:ListOriginAccessControls",
      "cloudfront:ListTagsForResource"
    ]
    resources = ["*"]
  }

  statement {
    sid       = "ReadCallerIdentity"
    actions   = ["sts:GetCallerIdentity"]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "github_plan" {
  for_each = local.github_environments

  name   = "${each.key}-terraform-plan"
  role   = aws_iam_role.github_plan[each.key].id
  policy = data.aws_iam_policy_document.github_plan[each.key].json
}

data "aws_iam_policy_document" "github_deploy_state" {
  for_each = local.github_environments

  statement {
    sid = "ReadStateBucketMetadata"
    actions = [
      "s3:GetBucketLocation",
      "s3:GetBucketVersioning",
      "s3:GetEncryptionConfiguration"
    ]
    resources = [aws_s3_bucket.terraform_state.arn]
  }

  statement {
    sid       = "ListEnvironmentState"
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.terraform_state.arn]

    condition {
      test     = "StringLike"
      variable = "s3:prefix"
      values   = [each.value.state_key]
    }
  }

  statement {
    sid = "ManageEnvironmentState"
    actions = [
      "s3:DeleteObject",
      "s3:GetObject",
      "s3:PutObject"
    ]
    resources = ["${aws_s3_bucket.terraform_state.arn}/${each.value.state_key}"]
  }

  statement {
    sid = "LockEnvironmentState"
    actions = [
      "dynamodb:DeleteItem",
      "dynamodb:DescribeTable",
      "dynamodb:GetItem",
      "dynamodb:PutItem"
    ]
    resources = [aws_dynamodb_table.terraform_locks.arn]

    condition {
      test     = "ForAllValues:StringLike"
      variable = "dynamodb:LeadingKeys"
      values   = ["${aws_s3_bucket.terraform_state.id}/${each.value.state_key}*"]
    }
  }

  statement {
    sid = "EncryptTerraformState"
    actions = [
      "kms:Decrypt",
      "kms:DescribeKey",
      "kms:Encrypt",
      "kms:GenerateDataKey"
    ]
    resources = [aws_kms_key.terraform_state.arn]
  }
}

resource "aws_iam_role_policy" "github_deploy_state" {
  for_each = local.github_environments

  name   = "${each.key}-terraform-state"
  role   = aws_iam_role.github_deploy[each.key].id
  policy = data.aws_iam_policy_document.github_deploy_state[each.key].json
}

data "aws_iam_policy_document" "github_deploy_environment" {
  for_each = local.github_environments

  source_policy_documents = [data.aws_iam_policy_document.github_plan[each.key].json]

  statement {
    sid = "CreateTaggedEnvironmentNetwork"
    actions = [
      "ec2:CreateFlowLogs",
      "ec2:CreateSubnet",
      "ec2:CreateVpc"
    ]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/Project"
      values   = [var.project_name]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/Environment"
      values   = [each.key]
    }
  }

  statement {
    sid = "ManageTaggedEnvironmentNetwork"
    actions = [
      "ec2:CreateTags",
      "ec2:DeleteFlowLogs",
      "ec2:DeleteSubnet",
      "ec2:DeleteTags",
      "ec2:DeleteVpc",
      "ec2:ModifySubnetAttribute",
      "ec2:ModifyVpcAttribute"
    ]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/Project"
      values   = [var.project_name]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/Environment"
      values   = [each.key]
    }
  }

  statement {
    sid       = "CreateTaggedEnvironmentKeys"
    actions   = ["kms:CreateKey"]
    resources = ["*"]

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/Project"
      values   = [var.project_name]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:RequestTag/Environment"
      values   = [each.key]
    }
  }

  statement {
    sid = "ManageTaggedEnvironmentKeys"
    actions = [
      "kms:CancelKeyDeletion",
      "kms:DisableKeyRotation",
      "kms:EnableKeyRotation",
      "kms:PutKeyPolicy",
      "kms:ScheduleKeyDeletion",
      "kms:TagResource",
      "kms:UntagResource"
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:kms:${var.aws_region}:${data.aws_caller_identity.current.account_id}:key/*"
    ]

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/Project"
      values   = [var.project_name]
    }

    condition {
      test     = "StringEquals"
      variable = "aws:ResourceTag/Environment"
      values   = [each.key]
    }
  }

  statement {
    sid = "ManageEnvironmentKeyAlias"
    actions = [
      "kms:CreateAlias",
      "kms:DeleteAlias",
      "kms:UpdateAlias"
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:kms:${var.aws_region}:${data.aws_caller_identity.current.account_id}:alias/${var.project_name}-${each.key}",
      "arn:${data.aws_partition.current.partition}:kms:${var.aws_region}:${data.aws_caller_identity.current.account_id}:key/*"
    ]
  }

  statement {
    sid     = "ManageEnvironmentBuckets"
    actions = ["s3:*"]
    resources = concat(
      local.environment_bucket_arns[each.key],
      [for arn in local.environment_bucket_arns[each.key] : "${arn}/*"]
    )
  }

  statement {
    sid = "ManageEnvironmentLogs"
    actions = [
      "logs:CreateLogGroup",
      "logs:DeleteLogGroup",
      "logs:DeleteRetentionPolicy",
      "logs:DescribeLogGroups",
      "logs:ListTagsForResource",
      "logs:PutRetentionPolicy",
      "logs:TagResource",
      "logs:UntagResource"
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:logs:${var.aws_region}:${data.aws_caller_identity.current.account_id}:log-group:/aws/vpc/${var.project_name}-${each.key}/flow-logs*"
    ]
  }

  statement {
    sid = "ManageEnvironmentCloudFront"
    actions = [
      "cloudfront:CreateDistribution",
      "cloudfront:CreateFunction",
      "cloudfront:CreateInvalidation",
      "cloudfront:CreateOriginAccessControl",
      "cloudfront:DeleteDistribution",
      "cloudfront:DeleteFunction",
      "cloudfront:DeleteOriginAccessControl",
      "cloudfront:DescribeFunction",
      "cloudfront:GetCachePolicy",
      "cloudfront:GetDistribution",
      "cloudfront:GetDistributionConfig",
      "cloudfront:GetFunction",
      "cloudfront:GetInvalidation",
      "cloudfront:GetOriginAccessControl",
      "cloudfront:ListCachePolicies",
      "cloudfront:ListDistributions",
      "cloudfront:ListFunctions",
      "cloudfront:ListInvalidations",
      "cloudfront:ListOriginAccessControls",
      "cloudfront:ListTagsForResource",
      "cloudfront:PublishFunction",
      "cloudfront:TagResource",
      "cloudfront:UntagResource",
      "cloudfront:UpdateDistribution",
      "cloudfront:UpdateFunction",
      "cloudfront:UpdateOriginAccessControl"
    ]
    resources = ["*"]
  }
}

resource "aws_iam_role_policy" "github_deploy_environment" {
  for_each = local.github_environments

  name   = "${each.key}-foundation-deploy"
  role   = aws_iam_role.github_deploy[each.key].id
  policy = data.aws_iam_policy_document.github_deploy_environment[each.key].json
}

data "aws_iam_policy_document" "github_deploy_iam" {
  for_each = local.github_environments

  statement {
    sid     = "CreateBoundedFoundationRole"
    actions = ["iam:CreateRole"]
    resources = [
      "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:role/${var.project_name}-${each.key}-vpc-flow-logs"
    ]

    condition {
      test     = "StringEquals"
      variable = "iam:PermissionsBoundary"
      values   = [local.foundation_boundary_arns[each.key]]
    }
  }

  statement {
    sid = "ManageBoundedFoundationRole"
    actions = [
      "iam:DeleteRole",
      "iam:DeleteRolePolicy",
      "iam:GetRole",
      "iam:GetRolePolicy",
      "iam:ListAttachedRolePolicies",
      "iam:ListRolePolicies",
      "iam:ListRoleTags",
      "iam:PutRolePolicy",
      "iam:TagRole",
      "iam:UntagRole"
    ]
    resources = [
      "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:role/${var.project_name}-${each.key}-vpc-flow-logs"
    ]
  }

  statement {
    sid     = "PassFoundationRoleToFlowLogs"
    actions = ["iam:PassRole"]
    resources = [
      "arn:${data.aws_partition.current.partition}:iam::${data.aws_caller_identity.current.account_id}:role/${var.project_name}-${each.key}-vpc-flow-logs"
    ]

    condition {
      test     = "StringEquals"
      variable = "iam:PassedToService"
      values   = ["vpc-flow-logs.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "github_deploy_iam" {
  for_each = local.github_environments

  name   = "${each.key}-bounded-role-management"
  role   = aws_iam_role.github_deploy[each.key].id
  policy = data.aws_iam_policy_document.github_deploy_iam[each.key].json
}
