import { ASSET_FALLBACK_BY_KEY, type AssetKey, assetUrl } from "@estate/db";
import { clientEnv, resolveApiBaseUrl } from "@/config/env";

/**
 * Asset URL for `<Image src>` and links.
 * Mock mode: static file under `public/` (fast path for Next image optimizer).
 * Live API: same-origin `/api/v1/assets/...` or absolute URL when NEXT_PUBLIC_API_URL is set.
 */
export function resolveAssetUrl(key: AssetKey): string {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return `/${ASSET_FALLBACK_BY_KEY[key].publicPath}`;
  }

  const path = assetUrl(key);
  const base = resolveApiBaseUrl();
  if (!base) {
    return path;
  }
  return `${base}${path}`;
}
