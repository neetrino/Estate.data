import { ApiError } from "@/lib/api-error";
import { ADMIN_AUTH_SCHEME } from "@/lib/auth/constants";
import { verifyAdminToken } from "@/lib/auth/jwt";

function readBearerToken(request: Request): string | null {
  const header = request.headers.get("Authorization");
  if (!header?.startsWith(`${ADMIN_AUTH_SCHEME} `)) {
    return null;
  }

  const token = header.slice(ADMIN_AUTH_SCHEME.length + 1).trim();
  return token.length > 0 ? token : null;
}

/** Require `Authorization: Bearer <admin JWT>` — throws `401 UNAUTHORIZED`. */
export async function requireAdminAuth(request: Request): Promise<void> {
  const token = readBearerToken(request);
  if (!token) {
    throw ApiError.unauthorized();
  }

  try {
    await verifyAdminToken(token);
  } catch {
    throw ApiError.unauthorized();
  }
}
