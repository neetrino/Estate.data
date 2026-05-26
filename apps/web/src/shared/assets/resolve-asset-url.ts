import { type AssetKey, assetUrl } from "@estate/db";
import { clientEnv } from "@/config/env";

/**
 * Asset URL for `<Image src>` and links.
 * Mock mode: same-origin path (web route). Live API: absolute URL on `NEXT_PUBLIC_API_URL`.
 */
export function resolveAssetUrl(key: AssetKey): string {
  const path = assetUrl(key);
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return path;
  }

  const base = clientEnv.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  return `${base}${path}`;
}
