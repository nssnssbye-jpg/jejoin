# GitHub Actions and AWS OIDC setup

This runbook bootstraps keyless Terraform and static web deployments. GitHub Actions receives short-lived AWS STS credentials through OIDC; no AWS access key is stored in GitHub.

## 1. Bootstrap AWS once

Use an administrator or approved bootstrap role locally to create the remote-state resources, GitHub OIDC provider, and environment roles.

```bash
cd infra/bootstrap
cp terraform.tfvars.example terraform.tfvars
# Set github_repository_subject in terraform.tfvars.
terraform init
terraform plan
terraform apply
terraform output
```

If the account already has `token.actions.githubusercontent.com` configured as an IAM OIDC provider, set `github_oidc_provider_arn` instead of creating a duplicate.

### Repository subject format

The trust policy matches the exact GitHub `sub` claim. Existing repositories normally use `OWNER/REPOSITORY`. Repositories using GitHub immutable OIDC subjects use `OWNER@OWNER_ID/REPOSITORY@REPOSITORY_ID`; copy the repository segment from an inspected OIDC claim. The generated roles further restrict the subject to either `pull_request` or one of the `dev`, `staging`, and `prod` GitHub Environments.

## 2. Configure repository variables

Create these GitHub Actions repository variables from the bootstrap outputs:

| Variable | Bootstrap output |
| --- | --- |
| `AWS_REGION` | `backend_region` |
| `AWS_PLAN_ROLE_ARN_DEV` | `github_plan_role_arns["dev"]` |
| `AWS_PLAN_ROLE_ARN_STAGING` | `github_plan_role_arns["staging"]` |
| `AWS_PLAN_ROLE_ARN_PROD` | `github_plan_role_arns["prod"]` |
| `TF_STATE_BUCKET` | `state_bucket` |
| `TF_STATE_LOCK_TABLE` | `lock_table` |
| `TF_STATE_KMS_KEY_ARN` | `state_kms_key_arn` |

Role ARNs and backend identifiers are configuration, not secrets. Do not add `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` to GitHub.

## 3. Protect deployment environments

Create GitHub Environments named `dev`, `staging`, and `prod`. In each environment, add `AWS_DEPLOY_ROLE_ARN` from the matching entry in the `github_deploy_role_arns` output.

- `dev`: allow deployments from `main`; approval is optional so merges deploy automatically.
- `staging`: restrict deployment branches and require at least one reviewer.
- `prod`: restrict deployment branches and require production owners as reviewers. Prevent self-review when the GitHub plan supports it.

Environment approval rules are enforced by GitHub before the job receives its OIDC token or environment variables.

## 4. Workflow behavior

### Pull requests

`.github/workflows/terraform-pr.yml` performs the following:

1. installs dependencies and builds the static Next.js application;
2. runs repository tests and Terraform format/validate checks;
3. assumes the read-only plan role through OIDC for same-repository pull requests;
4. plans `dev`, `staging`, and `prod` without locking state;
5. creates or updates one plan comment per environment; and
6. fails the required check if any plan fails.

Pull requests from forks run uncredentialed static checks but do not receive an AWS token or state access.

### Deployments

`.github/workflows/terraform-deploy.yml` deploys `dev` after a change reaches `main`. A manual workflow dispatch promotes the same revision to `staging` or `prod`, where GitHub Environment reviewers approve the job.

The job builds the static export, applies Terraform, uploads immutable `_next` assets and HTML to the private S3 origin, and invalidates CloudFront. The deployment URL is read from Terraform output and attached to the GitHub deployment.

## 5. Initial verification

1. Open a same-repository pull request that changes a harmless Terraform tag.
2. Confirm static checks and all three plan jobs pass and post comments.
3. Merge the pull request and confirm `dev` applies and publishes the web export.
4. Dispatch `staging`; confirm the job waits for approval before AWS authentication.
5. Reject a test approval or introduce an invalid Terraform expression and confirm deployment is blocked.

Do not apply bootstrap or environment stacks from an unreviewed branch. Bootstrap state remains local until an organization-specific bootstrap backend is approved.
