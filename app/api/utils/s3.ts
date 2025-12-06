import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  endpoint: process.env.S3_ENDPOINT!,
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESSKEY!,
    secretAccessKey: process.env.S3_SECRETKEY!,
  },
});

interface FileData {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
}

export async function uploadToS3(keyPrefix: string, file: FileData) {
  try {
    if (!process.env.S3_BUCKET || !process.env.S3_PUBLIC_URL) {
      throw new Error("S3_BUCKET or S3_PUBLIC_URL is not defined in environment variables");
    }

    const fileKey = `${keyPrefix}/${Date.now()}-${file.originalname}`;

    const params = {
      Bucket: process.env.S3_BUCKET!,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.send(new PutObjectCommand(params));

    const fileUrl = `${process.env.S3_PUBLIC_URL}/${fileKey.replace(/ /g, "+")}`;
    return fileUrl;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload image");
  }
}
