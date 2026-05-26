import { uploadMediaToR2 } from "@/features/r2/upload-media";
import { ApiError } from "@/lib/api-error";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { isR2Configured } from "@/lib/r2/client";
import { enforceAdminRateLimit } from "@/lib/rate-limit/enforce-rate-limit";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";

const MAX_FORM_BYTES = 10 * 1024 * 1024;

async function postMedia(
  request: Request
): Promise<Response> {
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

  if (!(file instanceof File)) {
    throw ApiError.badRequest("file is required", "VALIDATION_ERROR", [
      { path: "file", message: "Expected multipart file field" },
    ]);
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "application/octet-stream";

  try {
    const uploaded = await uploadMediaToR2(buffer, mimeType);
    return jsonSuccess(uploaded, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed";
    if (message.includes("maximum") || message.includes("Unsupported")) {
      throw ApiError.badRequest(message, "VALIDATION_ERROR");
    }
    throw error;
  }
}

export const POST = handleApiRoute(postMedia);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
