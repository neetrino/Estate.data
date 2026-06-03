import { NextResponse } from "next/server";

const NO_STORE = { "Cache-Control": "no-store" } as const;

export type ApiSuccessBody<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorBody = {
  error: {
    message: string;
    code?: string;
    details?: readonly { path: string; message: string }[];
  };
};

/** Standard success envelope — `{ data, meta? }`. */
export function jsonSuccess<T>(
  data: T,
  options?: { meta?: Record<string, unknown>; status?: number },
): NextResponse {
  const body: ApiSuccessBody<T> = options?.meta
    ? { data, meta: options.meta }
    : { data };

  return NextResponse.json(body, {
    status: options?.status ?? 200,
    headers: NO_STORE,
  });
}

/** Standard error envelope — `{ error: { message, code?, details? } }`. */
export function jsonError(
  message: string,
  status: number,
  code?: string,
  details?: readonly { path: string; message: string }[],
): NextResponse {
  const error: ApiErrorBody["error"] = { message };
  if (code) {
    error.code = code;
  }
  if (details && details.length > 0) {
    error.details = details;
  }

  return NextResponse.json({ error }, { status, headers: NO_STORE });
}

export function emptyOptionsResponse(): NextResponse {
  return new NextResponse(null, { status: 204, headers: NO_STORE });
}

/** Binary response for GET /api/v1/assets/:key and similar routes. */
export function binaryResponse(
  data: Buffer | Uint8Array,
  contentType: string,
  cacheControl: string,
): NextResponse {
  const bytes = new Uint8Array(data);

  return new NextResponse(bytes, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
    },
  });
}
