import { jwtVerify, type JWTPayload } from "jose";
import { serverEnv } from "@/lib/env";
import { ADMIN_JWT_ROLE } from "@/lib/auth/constants";

export type AdminTokenPayload = JWTPayload & {
  role: typeof ADMIN_JWT_ROLE;
};

function jwtSecretKey(): Uint8Array {
  return new TextEncoder().encode(serverEnv.JWT_SECRET);
}

/** Verify HS256 admin JWT — throws on invalid token or role. */
export async function verifyAdminToken(token: string): Promise<AdminTokenPayload> {
  const { payload } = await jwtVerify(token, jwtSecretKey(), {
    algorithms: ["HS256"],
  });

  if (payload.role !== ADMIN_JWT_ROLE) {
    throw new Error("Invalid admin role");
  }

  return payload as AdminTokenPayload;
}
