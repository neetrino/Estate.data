import { getR2Object, isR2Configured } from "@/lib/r2/client";
import { ApiError } from "@/lib/api-error";
import { jsonError } from "@/lib/http";
import { logger } from "@/lib/logger";
import { getOrCreateRequestId, REQUEST_ID_HEADER } from "@/lib/request-id";

const R2_CACHE_CONTROL = "public, max-age=31536000, immutable";

export async function GET(
  _request: Request,
  context: { params: Promise<{ path: string[] }> },
): Promise<Response> {
  const requestId = getOrCreateRequestId(_request);

  try {
    if (!isR2Configured()) {
      throw ApiError.notFound("Media storage not configured");
    }

    const { path } = await context.params;
    const objectKey = path.map(decodeURIComponent).join("/");

    if (!objectKey.startsWith("media/")) {
      throw ApiError.notFound("Invalid media key");
    }

    const { body, contentType } = await getR2Object(objectKey);

    return new Response(Buffer.from(body), {
      status: 200,
      headers: {
        "Content-Type": contentType ?? "application/octet-stream",
        "Cache-Control": R2_CACHE_CONTROL,
        [REQUEST_ID_HEADER]: requestId,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      logger.warn("api.error", {
        requestId,
        path: "/api/v1/media",
        code: error.code,
        status: error.status,
      });
      const response = jsonError(error.message, error.status, error.code);
      response.headers.set(REQUEST_ID_HEADER, requestId);
      return response;
    }

    logger.error("api.unhandled", {
      requestId,
      path: "/api/v1/media",
      message: error instanceof Error ? error.message : "Unknown error",
    });

    const response = jsonError("Internal server error", 500, "INTERNAL");
    response.headers.set(REQUEST_ID_HEADER, requestId);
    return response;
  }
}
