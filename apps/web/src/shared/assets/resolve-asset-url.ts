import { ASSET_FALLBACK_BY_KEY, type AssetKey, assetUrl } from "@estate/db";
import { clientEnv } from "@/config/env";

/**
 * Asset URL for `<Image src>` and links.
 * Mock mode: static file under `public/` (fast path for Next image optimizer).
 * Live API: absolute URL on `NEXT_PUBLIC_API_URL`.
 */
export function resolveAssetUrl(key: AssetKey): string {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return `/${ASSET_FALLBACK_BY_KEY[key].publicPath}`;
  }

  const path = assetUrl(key);
  const base = clientEnv.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  return `${base}${path}`;
}
