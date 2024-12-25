export const endpoints = {
  s3: {
      websiteEndpoint: (bucketName: string) => `http://${bucketName}.s3-website.ap-northeast-2.amazonaws.com`,
      bucketEndpoint: (bucketName: string) => `https://${bucketName}.s3.ap-northeast-2.amazonaws.com`,
  },
};