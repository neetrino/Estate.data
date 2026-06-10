import { uploadHomeHeroImageToR2, uploadMediaToR2 } from "@/server/features/r2/upload-media";
import { ApiError } from "@/server/lib/api-error";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { isR2Configured } from "@/server/lib/r2/client";
import { enforceAdminRateLimit } from "@/server/lib/rate-limit/enforce-rate-limit";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";

const MAX_FORM_BYTES = 10 * 1024 * 1024;

const HOME_HERO_UPLOAD_CONTEXT = "homeHero";

async function postAdminUpload(request: Request): Promise<Response> {
  if (!isR2Configured()) {
    throw ApiError.internal("R2 storage is not configured");
  }

  const rateLimit = await enforceAdminRateLimit(request);
  if (!rateLimit.success) {
    throw ApiError.rateLimited(rateLimit.retryAfterSeconds);
  }

  await requireAdminAuth(request);

  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_FORM_BYTES) {
    throw ApiError.payloadTooLarge();
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const context = String(formData.get("context") ?? "").trim();

  if (!(file instanceof File)) {
    throw ApiError.badRequest("file is required", "VALIDATION_ERROR", [
      { path: "file", message: "Expected multipart file field" },
    ]);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "application/octet-stream";

  try {
    const uploaded =
      context === HOME_HERO_UPLOAD_CONTEXT
        ? await uploadHomeHeroImageToR2(buffer, mimeType)
        : await uploadMediaToR2(buffer, mimeType);

    logger.info("admin.upload.completed", {
      context: context || "default",
      objectKey: uploaded.objectKey,
    });

    return jsonSuccess(uploaded, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    if (message.includes("maximum") || message.includes("Unsupported")) {
      throw ApiError.badRequest(message, "VALIDATION_ERROR");
    }

    throw error;
  }
}

export const POST = handleApiRoute(postAdminUpload);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
