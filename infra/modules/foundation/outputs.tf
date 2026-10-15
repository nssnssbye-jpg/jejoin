output "vpc_id" {
  description = "Foundation VPC ID."
  value       = aws_vpc.this.id
}

output "private_subnet_ids" {
  description = "Private subnet IDs."
  value       = aws_subnet.private[*].id
}

output "kms_key_arn" {
  description = "Foundation KMS key ARN."
  value       = aws_kms_key.foundation.arn
}

output "artifact_bucket_name" {
  description = "Encrypted baseline S3 bucket name."
  value       = aws_s3_bucket.artifacts.id
}

output "vpc_flow_log_group_name" {
  description = "VPC flow log group name."
  value       = aws_cloudwatch_log_group.vpc_flow_logs.name
}

output "web_bucket_name" {
  description = "Private S3 bucket containing the static web export."
  value       = aws_s3_bucket.web.id
}

output "web_distribution_id" {
  description = "CloudFront distribution ID for web cache invalidations."
  value       = aws_cloudfront_distribution.web.id
}

output "web_url" {
  description = "CloudFront URL for the static web application."
  value       = "https://${aws_cloudfront_distribution.web.domain_name}"
}
