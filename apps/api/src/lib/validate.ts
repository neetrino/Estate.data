import type { z } from "zod";
import { ApiError } from "@/lib/api-error";

/** Parse JSON body and validate with Zod — throws `ApiError` on failure. */
export async function parseJsonBody<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<T> {
  let json: unknown;

  try {
    json = await request.json();
  } catch {
    throw ApiError.badRequest("Invalid JSON body", "INVALID_JSON");
  }

  const result = schema.safeParse(json);
  if (!result.success) {
    throw ApiError.fromZod(result.error);
  }

  return result.data;
}
