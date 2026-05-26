import type { AdminAuthResponse, AdminRefreshInput } from "@/features/auth/auth.schema";
import { signAdminToken } from "@/lib/auth/sign-admin-token";
import { verifyAdminToken } from "@/lib/auth/jwt";
import { ApiError } from "@/lib/api-error";
import { serverEnv } from "@/lib/env";

/** Issue a new token when the current one is still valid. */
export async function adminRefresh(input: AdminRefreshInput): Promise<AdminAuthResponse> {
  let payload;
  try {
    payload = await verifyAdminToken(input.token);
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }
  const subject = payload.sub;

  if (!subject || typeof subject !== "string") {
    throw new Error("Invalid token subject");
  }

  const token = await signAdminToken(subject);

  return {
    token,
    expiresIn: serverEnv.JWT_EXPIRES_IN,
  };
}
