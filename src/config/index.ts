import * as pulumi from "@pulumi/pulumi";

interface PulumiConfig {
    projectName: string;
    environment: string;
    region: string;
    tags: {
        [key: string]: string;
    };
}

const config = new pulumi.Config();

export const pulumiConfig: PulumiConfig = {
    projectName: pulumi.getProject(),
    environment: config.require("environment"),
    region: config.get("region") || "ap-northeast-2",
    tags: {
        Project: pulumi.getProject(),
        Environment: config.require("environment"),
        ManagedBy: "pulumi",
    },
};