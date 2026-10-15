provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      ManagedBy   = "Terraform"
      Project     = var.project_name
      Environment = "staging"
    }
  }
}

module "foundation" {
  source = "../../modules/foundation"

  project_name         = var.project_name
  environment          = "staging"
  vpc_cidr             = var.vpc_cidr
  log_retention_days   = 30
  force_destroy_bucket = false
  common_tags = {
    Stack = "foundation"
  }
}
