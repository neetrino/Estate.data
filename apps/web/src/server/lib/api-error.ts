import type { ZodError } from "zod";

export type ValidationDetail = {
  path: string;
  message: string;
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: readonly ValidationDetail[] | undefined;
  readonly retryAfterSeconds: number | undefined;

  constructor(
    message: string,
    status: number,
    code: string,
    details?: readonly ValidationDetail[],
    retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
    this.retryAfterSeconds = retryAfterSeconds;
  }

  static badRequest(
    message: string,
    code = "BAD_REQUEST",
    details?: readonly ValidationDetail[],
  ): ApiError {
    return new ApiError(message, 400, code, details);
  }

  static fromZod(error: ZodError): ApiError {
    const details = error.issues.map((issue) => ({
      path: issue.path.join(".") || "body",
      message: issue.message,
    }));

    return ApiError.badRequest("Validation failed", "VALIDATION_ERROR", details);
  }

  static internal(message = "Internal server error"): ApiError {
    return new ApiError(message, 500, "INTERNAL");
  }

  static unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(message, 401, "UNAUTHORIZED");
  }

  static notFound(message = "Not found"): ApiError {
    return new ApiError(message, 404, "NOT_FOUND");
  }

  static payloadTooLarge(message = "Payload too large"): ApiError {
    return new ApiError(message, 413, "PAYLOAD_TOO_LARGE");
  }

  static rateLimited(retryAfterSeconds: number): ApiError {
    return new ApiError(
      "Too many requests",
      429,
      "RATE_LIMITED",
      undefined,
      retryAfterSeconds,
    );
  }
}
