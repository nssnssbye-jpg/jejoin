output "vpc_id" {
  description = "Prod VPC ID."
  value       = module.foundation.vpc_id
}

output "private_subnet_ids" {
  description = "Prod private subnet IDs."
  value       = module.foundation.private_subnet_ids
}

output "kms_key_arn" {
  description = "Prod foundation KMS key ARN."
  value       = module.foundation.kms_key_arn
}

output "artifact_bucket_name" {
  description = "Prod encrypted baseline S3 bucket name."
  value       = module.foundation.artifact_bucket_name
}

output "web_bucket_name" {
  description = "Prod static web origin bucket."
  value       = module.foundation.web_bucket_name
}

output "web_distribution_id" {
  description = "Prod CloudFront distribution ID."
  value       = module.foundation.web_distribution_id
}

output "web_url" {
  description = "Prod web application URL."
  value       = module.foundation.web_url
}
