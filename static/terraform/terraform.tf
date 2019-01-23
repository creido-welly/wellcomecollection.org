terraform {
  required_version = ">= 0.9"

  backend "s3" {
    key            = "build-state/static.tfstate"
    dynamodb_table = "terraform-locktable"
    region         = "eu-west-1"
    bucket         = "wellcomecollection-infra"
  }
}

provider "aws" {
  version = "~> 1.0"
  region  = "eu-west-1"
}

provider "aws" {
  version = "~> 1.0"
  region  = "us-east-1"
  alias   = "us-east-1"
}

data "aws_acm_certificate" "wellcomecollection_ssl_cert" {
  provider = "aws.us-east-1"
  domain   = "wellcomecollection.org"
}

module "static" {
  source = "../../terraform-modules/https_s3_website"
  website_uri = "static.wellcomecollection.org"
  acm_certificate_arn = "${data.aws_acm_certificate.wellcomecollection_ssl_cert.arn}"
}
