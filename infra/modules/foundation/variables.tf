variable "project_name" {
  description = "Project name used for resource names and tags."
  type        = string
  default     = "guild-portal"

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]{2,30}$", var.project_name))
    error_message = "project_name must be 3-31 lowercase alphanumeric or hyphen characters and start with a letter."
  }
}

variable "environment" {
  description = "Deployment environment."
  type        = string

  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "environment must be dev, staging, or prod."
  }
}

variable "vpc_cidr" {
  description = "IPv4 CIDR assigned to the environment VPC."
  type        = string

  validation {
    condition     = can(cidrnetmask(var.vpc_cidr))
    error_message = "vpc_cidr must be a valid IPv4 CIDR."
  }
}

variable "log_retention_days" {
  description = "CloudWatch log retention in days."
  type        = number
  default     = 30
}

variable "force_destroy_bucket" {
  description = "Whether the baseline artifact bucket can be destroyed while non-empty."
  type        = bool
  default     = false
}

variable "common_tags" {
  description = "Additional tags applied to all foundation resources."
  type        = map(string)
  default     = {}
}
