import { randomUUID } from "node:crypto";
import { isR2Configured, uploadR2Object } from "@/server/lib/r2/client";
import {
  ADMIN_IMAGE_MIME_TYPES,
  ADMIN_IMAGE_SIZE_ERROR,
  ADMIN_IMAGE_TYPE_ERROR,
  MAX_ADMIN_IMAGE_UPLOAD_BYTES,
} from "@/shared/lib/adminImageUpload";

export const MAX_R2_UPLOAD_BYTES = MAX_ADMIN_IMAGE_UPLOAD_BYTES;

export const ALLOWED_IMAGE_MIME_TYPES = new Set<string>(ADMIN_IMAGE_MIME_TYPES);

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

export function isMediaStorageConfigured(): boolean {
  return isR2Configured();
}

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
    throw new Error(ADMIN_IMAGE_SIZE_ERROR);
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
    throw new Error(ADMIN_IMAGE_TYPE_ERROR);
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
    throw new Error(ADMIN_IMAGE_TYPE_ERROR);
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
