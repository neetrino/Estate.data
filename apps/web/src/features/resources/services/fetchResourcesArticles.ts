import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";
import {
  RESOURCES_ARTICLES,
  type ResourceArticle,
} from "@/features/resources/content/resourcesContentCopy";
import type { SupportedLocale } from "@estate/db";

function withLocale(path: string, locale?: SupportedLocale): string {
  if (!locale || locale === "en") {
    return path;
  }

  return `${path}?locale=${encodeURIComponent(locale)}`;
}

/** Resource article list — static mock or `GET /api/v1/articles`. */
export async function fetchResourcesArticles(
  locale?: SupportedLocale,
): Promise<ResourceArticle[]> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return RESOURCES_ARTICLES.map((article) => ({ ...article }));
  }

  return apiClient.get<ResourceArticle[]>(withLocale(API_ROUTES.articles, locale));
}
