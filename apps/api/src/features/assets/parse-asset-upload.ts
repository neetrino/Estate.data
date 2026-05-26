import { isAssetKey, type AssetKey } from "@estate/db";
import {
  ASSET_UPLOAD_MAX_BYTES,
  ASSET_UPLOAD_MIME_PREFIX,
} from "@/features/assets/asset-upload.constants";
import { ApiError } from "@/lib/api-error";

export type AssetUploadInput = {
  key: AssetKey;
  mimeType: string;
  fileName: string;
  data: Buffer;
};

function extensionFromMime(mimeType: string): string {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/svg+xml":
      return ".svg";
    case "image/webp":
      return ".webp";
    default:
      return "";
  }
}

/** Parse multipart `key` + `file` fields — throws `ApiError` on validation failure. */
export async function parseAssetUploadForm(
  request: Request,
): Promise<AssetUploadInput> {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    throw ApiError.badRequest("Invalid multipart form", "INVALID_FORM");
  }

  const keyField = formData.get("key");
  const fileField = formData.get("file");

  if (typeof keyField !== "string" || !isAssetKey(keyField)) {
    throw ApiError.badRequest("Unknown or missing asset key", "VALIDATION_ERROR", [
      { path: "key", message: "Must be a known asset key" },
    ]);
  }

  if (!(fileField instanceof File)) {
    throw ApiError.badRequest("Missing file upload", "VALIDATION_ERROR", [
      { path: "file", message: "File is required" },
    ]);
  }

  if (!fileField.type.startsWith(ASSET_UPLOAD_MIME_PREFIX)) {
    throw ApiError.badRequest("Only image files are allowed", "VALIDATION_ERROR", [
      { path: "file", message: "Mime type must start with image/" },
    ]);
  }

  if (fileField.size === 0) {
    throw ApiError.badRequest("Empty file", "VALIDATION_ERROR", [
      { path: "file", message: "File must not be empty" },
    ]);
  }

  if (fileField.size > ASSET_UPLOAD_MAX_BYTES) {
    throw ApiError.payloadTooLarge(
      `File exceeds ${ASSET_UPLOAD_MAX_BYTES} byte limit`,
    );
  }

  const data = Buffer.from(await fileField.arrayBuffer());
  const fileName =
    fileField.name.trim() || `${keyField}${extensionFromMime(fileField.type)}`;

  return {
    key: keyField,
    mimeType: fileField.type,
    fileName,
    data,
  };
}
