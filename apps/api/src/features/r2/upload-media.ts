import { randomUUID } from "node:crypto";
import { uploadR2Object } from "@/lib/r2/client";

const MAX_R2_UPLOAD_BYTES = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
]);

export type R2UploadResult = {
  objectKey: string;
  publicUrl: string;
  byteSize: number;
  mimeType: string;
};

function extensionForMime(mimeType: string): string {
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "video/mp4": "mp4",
  };

  return map[mimeType] ?? "bin";
}

/** Upload media bytes to R2 under `media/{uuid}.{ext}`. */
export async function uploadMediaToR2(
  data: Buffer,
  mimeType: string,
): Promise<R2UploadResult> {
  if (data.length > MAX_R2_UPLOAD_BYTES) {
    throw new Error("File exceeds maximum upload size");
  }

  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
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
