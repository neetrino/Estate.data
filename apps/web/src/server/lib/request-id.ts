import { randomUUID } from "node:crypto";

export const REQUEST_ID_HEADER = "x-request-id";

/** Reads incoming request id or generates a new UUID. */
export function getOrCreateRequestId(request: Request): string {
  const existing = request.headers.get(REQUEST_ID_HEADER)?.trim();
  if (existing) {
    return existing;
  }

  return randomUUID();
}
