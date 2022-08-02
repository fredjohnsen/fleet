provider "aws" {
  region = "us-east-2"
  default_tags {
    tags = {
      environment = "loadtest"
      terraform   = "https://github.com/fleetdm/fleet/tree/main/tools/terraform"
      state       = "local"
    }
  }
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.74.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.16.0"
    }
  }
  backend "s3" {
    bucket               = "fleet-terraform-state20220408141538466600000002"
    key                  = "loadtesting/loadtesting/terraform.tfstate" # This should be set to account_alias/unique_key/terraform.tfstate
    workspace_key_prefix = "loadtesting"                               # This should be set to the account alias
    region               = "us-east-2"
    encrypt              = true
    kms_key_id           = "9f98a443-ffd7-4dbe-a9c3-37df89b2e42a"
    dynamodb_table       = "tf-remote-state-lock"
    role_arn             = "arn:aws:iam::353365949058:role/terraform-loadtesting"
  }
}

data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

provider "docker" {
  # Configuration options
  registry_auth {
    address  = "${data.aws_caller_identity.current.account_id}.dkr.ecr.us-east-2.amazonaws.com"
    username = data.aws_ecr_authorization_token.token.user_name
    password = data.aws_ecr_authorization_token.token.password
  }
}

data "terraform_remote_state" "shared" {
  backend = "s3"
  config = {
    bucket               = "fleet-terraform-state20220408141538466600000002"
    key                  = "loadtesting/loadtesting/shared/terraform.tfstate" # This should be set to account_alias/unique_key/terraform.tfstate
    workspace_key_prefix = "loadtesting"                                      # This should be set to the account alias
    region               = "us-east-2"
    encrypt              = true
    kms_key_id           = "9f98a443-ffd7-4dbe-a9c3-37df89b2e42a"
    dynamodb_table       = "tf-remote-state-lock"
    role_arn             = "arn:aws:iam::353365949058:role/terraform-loadtesting"
  }
}
