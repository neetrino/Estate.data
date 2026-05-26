import type { AssetKey } from "./asset-keys";
import { API_VERSION_PREFIX } from "./constants";

/** Public URL path for a stored asset (`/api/v1/assets/{key}`). */
export function assetUrl(key: AssetKey): string {
  return `${API_VERSION_PREFIX}/assets/${encodeURIComponent(key)}`;
}
