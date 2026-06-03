import { clientEnv, resolveApiBaseUrl } from "@/config/env";

/**
 * Resolve portfolio image path from API for `<Image src>`.
 * Absolute URLs pass through; `/api/v1/assets/...` stays same-origin when API URL unset.
 */
export function resolvePortfolioImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return imageUrl;
  }

  const base = resolveApiBaseUrl();
  if (!base) {
    return imageUrl;
  }

  return imageUrl.startsWith("/") ? `${base}${imageUrl}` : `${base}/${imageUrl}`;
}
