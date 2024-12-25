import * as pulumi from "@pulumi/pulumi";
import { S3Bucket } from "./resources/s3";
import { pulumiConfig } from "./config";
import { endpoints } from "./config/endpoints";