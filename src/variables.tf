variable "region" {
  type        = string
  description = "AWS region for all resources."

  default = "us-east-1"
}

variable "mongodb_atlas_api_pri_key" {
  type        = string
  default = "fccd0b2c-9a6b-4fec-80c1-fb3f375d0b82"
}

variable "mongodb_atlas_api_pub_key" {
  type        = string
  default = "epmzdriv"
}

variable "mongodb_atlas_database_username" {
  type        = string
  default = "blssuser"
}

variable "mongodb_atlas_database_user_password" {
  type        = string
  default = "GyQCNKbv8KJjiCS1"
}

variable "mongodb_atlas_org_id" {
  type        = string
  default = "64e76c1e491f2547043188a2"
}

variable "mongodb_atlas_accesslistip" {
  type        = string
  default = "108.29.160.215"
}