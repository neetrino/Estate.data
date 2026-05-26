import { SignJWT } from "jose";
import { serverEnv } from "@/lib/env";
import { ADMIN_JWT_ROLE } from "@/lib/auth/constants";

function jwtSecretKey(): Uint8Array {
  return new TextEncoder().encode(serverEnv.JWT_SECRET);
}

/** Issue HS256 admin access token for a user subject. */
export async function signAdminToken(subject: string): Promise<string> {
  return new SignJWT({ role: ADMIN_JWT_ROLE })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(subject)
    .setIssuedAt()
    .setExpirationTime(serverEnv.JWT_EXPIRES_IN)
    .sign(jwtSecretKey());
}
