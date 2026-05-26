import { ApiError } from "@/lib/api-error";
import { jsonError } from "@/lib/http";
import { logger } from "@/lib/logger";
import { getOrCreateRequestId, REQUEST_ID_HEADER } from "@/lib/request-id";

export type ApiRouteContext = {
  params: Promise<Record<string, string>>;
};

type ApiRouteHandler = (
  request: Request,
  context: ApiRouteContext,
) => Promise<Response>;

function requestPath(request: Request): string {
  return new URL(request.url).pathname;
}

function attachRequestId(response: Response, requestId: string): Response {
  const headers = new Headers(response.headers);
  headers.set(REQUEST_ID_HEADER, requestId);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function toApiErrorResponse(error: ApiError): Response {
  const response = jsonError(
    error.message,
    error.status,
    error.code,
    error.details,
  );

  if (error.retryAfterSeconds !== undefined) {
    response.headers.set("Retry-After", String(error.retryAfterSeconds));
  }

  return response;
}

function logUnhandledError(
  error: unknown,
  requestId: string,
  request: Request,
): void {
  const payload: Record<string, unknown> = {
    requestId,
    method: request.method,
    path: requestPath(request),
    message: error instanceof Error ? error.message : "Unknown error",
  };

  if (process.env.NODE_ENV === "development" && error instanceof Error && error.stack) {
    payload.stack = error.stack;
  }

  logger.error("api.unhandled", payload);
}

function toErrorResponse(
  error: unknown,
  requestId: string,
  request: Request,
): Response {
  if (error instanceof ApiError) {
    logger.warn("api.error", {
      requestId,
      method: request.method,
      path: requestPath(request),
      code: error.code,
      status: error.status,
    });

    return attachRequestId(toApiErrorResponse(error), requestId);
  }

  logUnhandledError(error, requestId, request);

  return attachRequestId(
    jsonError("Internal server error", 500, "INTERNAL"),
    requestId,
  );
}

/**
 * Wraps a route handler with request-id propagation, access logs, and error envelopes.
 */
export function handleApiRoute(handler: ApiRouteHandler): ApiRouteHandler {
  return async (request, context) => {
    const requestId = getOrCreateRequestId(request);
    const startedAt = Date.now();
    const path = requestPath(request);

    logger.info("api.request.start", {
      requestId,
      method: request.method,
      path,
    });

    try {
      const response = await handler(request, context);

      logger.info("api.request.finish", {
        requestId,
        method: request.method,
        path,
        status: response.status,
        durationMs: Date.now() - startedAt,
      });

      return attachRequestId(response, requestId);
    } catch (error) {
      const errorResponse = toErrorResponse(error, requestId, request);

      logger.info("api.request.finish", {
        requestId,
        method: request.method,
        path,
        status: errorResponse.status,
        durationMs: Date.now() - startedAt,
      });

      return errorResponse;
    }
  };
}
