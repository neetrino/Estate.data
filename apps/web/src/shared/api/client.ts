import { clientEnv } from "@/config/env";
import { DEFAULT_REQUEST_TIMEOUT_MS } from "@/shared/lib/constants";
import { ApiError } from "@/shared/api/errors";
import type { ApiEnvelope, ApiErrorBody } from "@/shared/api/types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiRequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
  timeoutMs?: number;
};

function buildUrl(path: string): string {
  const base = clientEnv.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

async function parseErrorResponse(response: Response): Promise<ApiError> {
  let message = response.statusText || "Request failed";
  let code: string | undefined;

  try {
    const body = (await response.json()) as ApiErrorBody;
    if (body.error?.message) {
      message = body.error.message;
      code = body.error.code;
    }
  } catch {
    // Non-JSON error body — keep statusText
  }

  return new ApiError(message, response.status, code);
}

/**
 * Typed HTTP client for the separate Next.js API app.
 * When NEXT_PUBLIC_USE_MOCK_API=true, prefer feature-level mocks instead of calling this.
 */
export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers = {},
    signal,
    timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const onAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      controller.abort();
    } else {
      signal.addEventListener("abort", onAbort, { once: true });
    }
  }

  try {
    const response = await fetch(buildUrl(path), {
      method,
      headers: {
        Accept: "application/json",
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      throw await parseErrorResponse(response);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const json = (await response.json()) as ApiEnvelope<T> | T;
    if (json !== null && typeof json === "object" && "data" in json) {
      return (json as ApiEnvelope<T>).data;
    }

    return json as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ApiError("Request timed out", 408, "TIMEOUT");
    }
    throw new ApiError(
      error instanceof Error ? error.message : "Network error",
      0,
      "NETWORK",
    );
  } finally {
    clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onAbort);
    }
  }
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "GET" }),
  post: <T>(
    path: string,
    body: unknown,
    options?: Omit<ApiRequestOptions, "method" | "body">,
  ) => apiRequest<T>(path, { ...options, method: "POST", body }),
  put: <T>(
    path: string,
    body: unknown,
    options?: Omit<ApiRequestOptions, "method" | "body">,
  ) => apiRequest<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(
    path: string,
    body: unknown,
    options?: Omit<ApiRequestOptions, "method" | "body">,
  ) => apiRequest<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Omit<ApiRequestOptions, "method" | "body">) =>
    apiRequest<T>(path, { ...options, method: "DELETE" }),
};
