import type { AssetKey } from "./asset-keys";
import { API_VERSION_PREFIX } from "./constants";

/** Public URL for a stored asset (served by web app API route). */
export function assetUrl(key: AssetKey): string {
  return `${API_VERSION_PREFIX}/assets/${encodeURIComponent(key)}`;
}
