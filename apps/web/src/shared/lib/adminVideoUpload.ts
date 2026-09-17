import {
  ADMIN_IMAGE_MIME_TYPES,
  ADMIN_IMAGE_SIZE_ERROR,
  MAX_ADMIN_IMAGE_UPLOAD_BYTES,
  resolveAdminImageMime,
} from "@/shared/lib/adminImageUpload";

export const MAX_ADMIN_VIDEO_UPLOAD_BYTES = MAX_ADMIN_IMAGE_UPLOAD_BYTES;

export const ADMIN_VIDEO_MIME = "video/mp4";

export const ADMIN_VIDEO_ACCEPT = ADMIN_VIDEO_MIME;

export const ADMIN_VIDEO_UPLOAD_HINT = "MP4 · max 10 MB";

export const ADMIN_VIDEO_TYPE_ERROR = "Use an MP4 video.";

const ADMIN_IMAGE_MIME_SET = new Set<string>(ADMIN_IMAGE_MIME_TYPES);

function extensionOf(fileName: string): string {
  const dot = fileName.lastIndexOf(".");
  if (dot < 0) {
    return "";
  }
  return fileName.slice(dot + 1).toLowerCase();
}

/** Resolve a browser MIME for MP4, including empty `file.type`. */
export function resolveAdminVideoMime(fileName: string, mimeType: string): string {
  if (mimeType === ADMIN_VIDEO_MIME) {
    return mimeType;
  }
  if (extensionOf(fileName) === "mp4") {
    return ADMIN_VIDEO_MIME;
  }
  return mimeType;
}

/** Client-side type/size check before calling the upload API. */
export function validateAdminVideoFile(file: File): string | null {
  const mime = resolveAdminVideoMime(file.name, file.type);
  if (mime !== ADMIN_VIDEO_MIME) {
    return ADMIN_VIDEO_TYPE_ERROR;
  }
  if (file.size > MAX_ADMIN_VIDEO_UPLOAD_BYTES) {
    return ADMIN_IMAGE_SIZE_ERROR;
  }
  return null;
}

/** Resolve image or MP4 MIME for the shared admin upload route. */
export function resolveAdminUploadMime(fileName: string, mimeType: string): string {
  const imageMime = resolveAdminImageMime(fileName, mimeType);
  if (ADMIN_IMAGE_MIME_SET.has(imageMime)) {
    return imageMime;
  }
  return resolveAdminVideoMime(fileName, mimeType);
}
