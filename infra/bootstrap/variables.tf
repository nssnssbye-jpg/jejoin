variable "project_name" {
  description = "Project name used for resource names and tags."
  type        = string
  default     = "guild-portal"

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]{2,30}$", var.project_name))
    error_message = "project_name must be 3-31 lowercase alphanumeric or hyphen characters and start with a letter."
  }
}

variable "aws_region" {
  description = "AWS region that stores the Terraform state."
  type        = string
  default     = "ap-northeast-2"
}

variable "github_repository_subject" {
  description = "Repository portion of the GitHub OIDC sub claim, such as owner/repo or the immutable owner@id/repo@id form."
  type        = string

  validation {
    condition     = can(regex("^[^/:]+/[^/:]+$", var.github_repository_subject))
    error_message = "github_repository_subject must contain exactly the owner and repository subject segments."
  }
}

variable "github_oidc_provider_arn" {
  description = "Existing GitHub Actions OIDC provider ARN. Leave null to create the provider in this bootstrap stack."
  type        = string
  default     = null
  nullable    = true

  validation {
    condition     = var.github_oidc_provider_arn == null || can(regex("^arn:[^:]+:iam::[0-9]{12}:oidc-provider/token\\.actions\\.githubusercontent\\.com$", var.github_oidc_provider_arn))
    error_message = "github_oidc_provider_arn must be a GitHub Actions IAM OIDC provider ARN."
  }
}

variable "github_permissions_boundary_arn" {
  description = "Optional IAM permissions boundary attached to GitHub Actions roles."
  type        = string
  default     = null
  nullable    = true
}
