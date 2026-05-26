import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";
import { ApiError } from "@/shared/api/errors";
import {
  RESOURCES_ARTICLES,
  RESOURCES_MOCK_ARTICLE_BODIES,
  type ArticleDetail,
} from "@/features/resources/content/resourcesContentCopy";
import type { SupportedLocale } from "@estate/db";

function slugFromHref(href: string): string {
  const prefix = "/resources/";
  return href.startsWith(prefix) ? href.slice(prefix.length) : href;
}

function withLocale(path: string, locale?: SupportedLocale): string {
  if (!locale || locale === "en") {
    return path;
  }

  return `${path}?locale=${encodeURIComponent(locale)}`;
}

/** Article detail by slug — mock or `GET /api/v1/articles/:slug`. */
export async function fetchArticleBySlug(
  slug: string,
  locale?: SupportedLocale,
): Promise<ArticleDetail | null> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    const article = RESOURCES_ARTICLES.find(
      (entry) => slugFromHref(entry.href) === slug,
    );
    const body = RESOURCES_MOCK_ARTICLE_BODIES[slug];

    if (!article || !body) {
      return null;
    }

    return {
      ...article,
      slug,
      body,
    };
  }

  try {
    return await apiClient.get<ArticleDetail>(
      withLocale(`${API_ROUTES.articles}/${encodeURIComponent(slug)}`, locale),
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}
