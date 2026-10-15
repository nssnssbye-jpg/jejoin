variable "project_name" {
  description = "Project name used for resource names and tags."
  type        = string
  default     = "guild-portal"
}

variable "aws_region" {
  description = "AWS deployment region."
  type        = string
  default     = "ap-northeast-2"
}

variable "vpc_cidr" {
  description = "IPv4 CIDR assigned to the dev VPC."
  type        = string
  default     = "10.10.0.0/16"
}
