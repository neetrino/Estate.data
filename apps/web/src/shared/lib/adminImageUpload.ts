export const MAX_ADMIN_IMAGE_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ADMIN_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const ADMIN_IMAGE_ACCEPT = ADMIN_IMAGE_MIME_TYPES.join(",");

export const ADMIN_IMAGE_UPLOAD_HINT = "JPEG, PNG, WebP or GIF · max 10 MB";

export const ADMIN_IMAGE_TYPE_ERROR = "Use JPEG, PNG, WebP, or GIF.";

export const ADMIN_IMAGE_SIZE_ERROR = "File must be 10 MB or smaller.";

export const ADMIN_IMAGE_STORAGE_UNAVAILABLE =
  "Cloudflare R2 is not configured. Set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, and R2_PUBLIC_URL.";

const ADMIN_IMAGE_MIME_SET = new Set<string>(ADMIN_IMAGE_MIME_TYPES);

const EXTENSION_MIME: Record<string, (typeof ADMIN_IMAGE_MIME_TYPES)[number]> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  if (dot < 0) {
    return "";
  }
  return fileName.slice(dot + 1).toLowerCase();
}

/** Resolve a browser MIME, including empty `file.type` from the extension. */
export function resolveAdminImageMime(fileName: string, mimeType: string): string {
  if (ADMIN_IMAGE_MIME_SET.has(mimeType)) {
    return mimeType;
  }
  return EXTENSION_MIME[extensionOf(fileName)] ?? mimeType;
}

/** Client-side type/size check before calling the upload API. */
export function validateAdminImageFile(file: File): string | null {
  const mime = resolveAdminImageMime(file.name, file.type);
  if (!ADMIN_IMAGE_MIME_SET.has(mime)) {
    return ADMIN_IMAGE_TYPE_ERROR;
  }
  if (file.size > MAX_ADMIN_IMAGE_UPLOAD_BYTES) {
    return ADMIN_IMAGE_SIZE_ERROR;
  }
  return null;
}
