import type { AdminAuthResponse, AdminLoginInput } from "@/features/auth/auth.schema";
import { signAdminToken } from "@/lib/auth/sign-admin-token";
import { verifyPassword } from "@/lib/auth/password";
import { ApiError } from "@/lib/api-error";
import { serverEnv } from "@/lib/env";
import { getPrisma } from "@/lib/db";

/** Authenticate admin user and return JWT. */
export async function adminLogin(input: AdminLoginInput): Promise<AdminAuthResponse> {
  const user = await getPrisma().user.findUnique({
    where: { email: input.email.toLowerCase() },
    select: { id: true, passwordHash: true, role: true },
  });

  if (!user || user.role !== "admin") {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = await signAdminToken(user.id);

  return {
    token,
    expiresIn: serverEnv.JWT_EXPIRES_IN,
  };
}
