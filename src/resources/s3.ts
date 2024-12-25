import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { pulumiConfig } from "../config";

export interface S3BucketArgs {
    bucketName: string;
    acl?: string;
    website?: boolean;
    versioning?: boolean;
    tags?: { [key: string]: string };
}

export class S3Bucket extends pulumi.ComponentResource {
    public readonly bucket: aws.s3.Bucket;
    public readonly bucketName: string;

    constructor(name: string, args: S3BucketArgs, opts?: pulumi.ComponentResourceOptions) {
        super("custom:resource:S3Bucket", name, {}, opts);

        const defaultTags = {
            ...pulumiConfig.tags,
            Name: args.bucketName,
        };

        this.bucketName = args.bucketName;

        this.bucket = new aws.s3.Bucket(
            name,
            {
                bucket: args.bucketName,
                acl: args.acl || "private",
                website: args.website
                    ? {
                          indexDocument: "index.html",
                          errorDocument: "error.html",
                      }
                    : undefined,
                versioning: {
                    enabled: args.versioning || false,
                },
                tags: {
                    ...defaultTags,
                    ...args.tags,
                },
            },
            { parent: this }
        );

        this.registerOutputs({
            bucket: this.bucket,
            bucketName: this.bucketName,
        });
    }
}