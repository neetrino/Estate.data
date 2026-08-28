import { clientEnv, resolveApiBaseUrl } from "@/config/env";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

/**
 * Resolve portfolio image path from API for `<Image src>`.
 * Absolute URLs pass through; `/api/v1/assets/...` stays same-origin when API URL unset.
 */
export function resolvePortfolioImageUrl(imageUrl: string): string {
  const resolved = normalizePublicAssetUrl(imageUrl);

  if (resolved.startsWith("http://") || resolved.startsWith("https://")) {
    return resolved;
  }

  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return resolved;
  }

  const base = resolveApiBaseUrl();
  if (!base) {
    return resolved;
  }

  return resolved.startsWith("/") ? `${base}${resolved}` : `${base}/${resolved}`;
}
