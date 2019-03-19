resource "aws_cloudfront_distribution" "https_s3_website" {
  origin {
    domain_name = "${var.website_uri}.s3.amazonaws.com"
    origin_id   = "S3-${var.website_uri}"
  }

  enabled             = true
  default_root_object = "index.html"
  is_ipv6_enabled     = true

  aliases = ["${var.website_uri}"]

  default_cache_behavior {
    allowed_methods        = ["HEAD", "GET", "OPTIONS"]
    cached_methods         = ["HEAD", "GET", "OPTIONS"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = "S3-${var.website_uri}"
    compress               = true

    forwarded_values {
      query_string = false

      # this is to respect CORS
      # see: https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/header-caching.html#header-caching-web-cors
      headers = [
        "Origin",
        "Access-Control-Request-Headers",
        "Access-Control-Request-Method",
      ]

      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn      = "${var.acm_certificate_arn}"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  retain_on_delete = true
}
