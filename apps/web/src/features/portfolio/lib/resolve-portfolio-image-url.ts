import { clientEnv } from "@/config/env";

/**
 * Resolve portfolio image path from API for `<Image src>`.
 * Absolute URLs pass through; `/api/v1/assets/...` gets API base in live mode.
 */
export function resolvePortfolioImageUrl(imageUrl: string): string {
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return imageUrl;
  }

  const base = clientEnv.NEXT_PUBLIC_API_URL.replace(/\/$/, "");
  return imageUrl.startsWith("/") ? `${base}${imageUrl}` : `${base}/${imageUrl}`;
}
