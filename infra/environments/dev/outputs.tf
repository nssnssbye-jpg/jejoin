output "vpc_id" {
  description = "Dev VPC ID."
  value       = module.foundation.vpc_id
}

output "private_subnet_ids" {
  description = "Dev private subnet IDs."
  value       = module.foundation.private_subnet_ids
}

output "kms_key_arn" {
  description = "Dev foundation KMS key ARN."
  value       = module.foundation.kms_key_arn
}

output "artifact_bucket_name" {
  description = "Dev encrypted baseline S3 bucket name."
  value       = module.foundation.artifact_bucket_name
}

output "web_bucket_name" {
  description = "Dev static web origin bucket."
  value       = module.foundation.web_bucket_name
}

output "web_distribution_id" {
  description = "Dev CloudFront distribution ID."
  value       = module.foundation.web_distribution_id
}

output "web_url" {
  description = "Dev web application URL."
  value       = module.foundation.web_url
}
