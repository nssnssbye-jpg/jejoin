provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      ManagedBy   = "Terraform"
      Project     = var.project_name
      Environment = "dev"
    }
  }
}

module "foundation" {
  source = "../../modules/foundation"

  project_name         = var.project_name
  environment          = "dev"
  vpc_cidr             = var.vpc_cidr
  log_retention_days   = 14
  force_destroy_bucket = true
  common_tags = {
    Stack = "foundation"
  }
}
