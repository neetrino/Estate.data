import { randomUUID } from "node:crypto";
import { uploadR2Object } from "@/server/lib/r2/client";

export const MAX_R2_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ALLOWED_IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const ALLOWED_MEDIA_MIME_TYPES = new Set([
  ...ALLOWED_IMAGE_MIME_TYPES,
  "video/mp4",
]);

export type R2UploadResult = {
  objectKey: string;
  publicUrl: string;
  byteSize: number;
  mimeType: string;
};

export function extensionForMime(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "video/mp4": "mp4",
  };

  return map[mimeType] ?? "bin";
}

function assertUploadSize(data: Buffer): void {
  if (data.length > MAX_R2_UPLOAD_BYTES) {
    throw new Error("File exceeds maximum upload size");
  }
}

function buildHomeHeroObjectKey(mimeType: string): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0");
  const timestamp = now.getTime();
  const uuid = randomUUID();

  return `home-hero/${year}/${month}/${timestamp}-${uuid}.${extensionForMime(mimeType)}`;
}

/** Upload hero image bytes to R2 under `home-hero/YYYY/MM/...`. */
export async function uploadHomeHeroImageToR2(
  data: Buffer,
  mimeType: string,
): Promise<R2UploadResult> {
  assertUploadSize(data);

  if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
    throw new Error("Unsupported media type");
  }

  const objectKey = buildHomeHeroObjectKey(mimeType);
  const publicUrl = await uploadR2Object(objectKey, data, mimeType);

  return {
    objectKey,
    publicUrl,
    byteSize: data.length,
    mimeType,
  };
}

/** Upload media bytes to R2 under `media/{uuid}.{ext}`. */
export async function uploadMediaToR2(
  data: Buffer,
  mimeType: string,
): Promise<R2UploadResult> {
  assertUploadSize(data);

  if (!ALLOWED_MEDIA_MIME_TYPES.has(mimeType)) {
    throw new Error("Unsupported media type");
  }

  const objectKey = `media/${randomUUID()}.${extensionForMime(mimeType)}`;
  const publicUrl = await uploadR2Object(objectKey, data, mimeType);

  return {
    objectKey,
    publicUrl,
    byteSize: data.length,
    mimeType,
  };
}
