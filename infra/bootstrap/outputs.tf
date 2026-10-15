output "state_bucket" {
  description = "S3 bucket used by environment backends."
  value       = aws_s3_bucket.terraform_state.id
}

output "lock_table" {
  description = "DynamoDB table used for Terraform state locking."
  value       = aws_dynamodb_table.terraform_locks.name
}

output "state_kms_key_arn" {
  description = "KMS key used to encrypt Terraform state."
  value       = aws_kms_key.terraform_state.arn
}

output "backend_region" {
  description = "AWS region used by the remote state backend."
  value       = var.aws_region
}

output "github_oidc_provider_arn" {
  description = "GitHub Actions OIDC provider used by deployment roles."
  value       = local.github_oidc_arn
}

output "github_plan_role_arns" {
  description = "Environment-scoped roles used by trusted same-repository pull requests for Terraform plans."
  value       = { for environment, role in aws_iam_role.github_plan : environment => role.arn }
}

output "github_deploy_role_arns" {
  description = "Environment-scoped roles used for Terraform apply and web deployment."
  value       = { for environment, role in aws_iam_role.github_deploy : environment => role.arn }
}

output "foundation_service_role_boundary_arns" {
  description = "Mandatory permissions boundaries for environment foundation service roles."
  value       = local.foundation_boundary_arns
}
