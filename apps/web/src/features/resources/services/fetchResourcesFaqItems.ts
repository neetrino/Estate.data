import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";
import {
  RESOURCES_FAQ_ITEMS,
  type ResourceFaqItem,
} from "@/features/resources/content/resourcesContentCopy";
import type { SupportedLocale } from "@estate/db";

function withLocale(path: string, locale?: SupportedLocale): string {
  if (!locale || locale === "en") {
    return path;
  }

  return `${path}?locale=${encodeURIComponent(locale)}`;
}

/** FAQ list — static mock or `GET /api/v1/faq`. */
export async function fetchResourcesFaqItems(
  locale?: SupportedLocale,
): Promise<ResourceFaqItem[]> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return RESOURCES_FAQ_ITEMS.map((item) => ({ ...item }));
  }

  return apiClient.get<ResourceFaqItem[]>(withLocale(API_ROUTES.faq, locale));
}
