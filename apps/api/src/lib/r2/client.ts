import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getR2Config } from "@/lib/integrations-env";

let client: S3Client | null = null;

function getR2Client(): S3Client {
  const config = getR2Config();
  if (!config) {
    throw new Error("R2 is not configured");
  }

  if (!client) {
    client = new S3Client({
      region: "auto",
      endpoint: `https://${config.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.R2_ACCESS_KEY_ID,
        secretAccessKey: config.R2_SECRET_ACCESS_KEY,
      },
    });
  }

  return client;
}

export function isR2Configured(): boolean {
  return getR2Config() !== null;
}

export function r2PublicUrl(objectKey: string): string {
  const config = getR2Config();
  if (!config) {
    throw new Error("R2 is not configured");
  }

  const base = config.R2_PUBLIC_URL.replace(/\/$/, "");
  return `${base}/${objectKey}`;
}

export async function uploadR2Object(
  objectKey: string,
  body: Buffer,
  contentType: string,
): Promise<string> {
  const config = getR2Config();
  if (!config) {
    throw new Error("R2 is not configured");
  }

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: objectKey,
      Body: body,
      ContentType: contentType,
    }),
  );

  return r2PublicUrl(objectKey);
}

export async function getR2Object(
  objectKey: string,
): Promise<{ body: Uint8Array; contentType: string | undefined }> {
  const config = getR2Config();
  if (!config) {
    throw new Error("R2 is not configured");
  }

  const response = await getR2Client().send(
    new GetObjectCommand({
      Bucket: config.R2_BUCKET_NAME,
      Key: objectKey,
    }),
  );

  if (!response.Body) {
    throw new Error("Empty R2 object body");
  }

  const bytes = await response.Body.transformToByteArray();

  return {
    body: bytes,
    contentType: response.ContentType,
  };
}
