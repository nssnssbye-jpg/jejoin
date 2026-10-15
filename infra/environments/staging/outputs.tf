output "vpc_id" {
  description = "Staging VPC ID."
  value       = module.foundation.vpc_id
}

output "private_subnet_ids" {
  description = "Staging private subnet IDs."
  value       = module.foundation.private_subnet_ids
}

output "kms_key_arn" {
  description = "Staging foundation KMS key ARN."
  value       = module.foundation.kms_key_arn
}

output "artifact_bucket_name" {
  description = "Staging encrypted baseline S3 bucket name."
  value       = module.foundation.artifact_bucket_name
}

output "web_bucket_name" {
  description = "Staging static web origin bucket."
  value       = module.foundation.web_bucket_name
}

output "web_distribution_id" {
  description = "Staging CloudFront distribution ID."
  value       = module.foundation.web_distribution_id
}

output "web_url" {
  description = "Staging web application URL."
  value       = module.foundation.web_url
}
