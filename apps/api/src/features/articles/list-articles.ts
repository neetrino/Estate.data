import {
  type ArticleDetailDto,
  type ArticleSummaryDto,
  articleHref,
} from "@/features/articles/article.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";
import { DEFAULT_LOCALE, type SupportedLocale } from "@estate/db";

function toArticleSummary(article: {
  id: string;
  slug: string;
  title: string;
  readTimeLabel: string;
}): ArticleSummaryDto {
  return {
    id: article.id,
    title: article.title,
    readTimeLabel: article.readTimeLabel,
    href: articleHref(article.slug),
  };
}

function applyArticleTranslation<
  T extends {
    id: string;
    title: string;
    readTimeLabel: string;
    body?: string;
  },
>(
  article: T,
  translation: {
    title: string;
    readTimeLabel: string | null;
    body?: string;
  } | undefined,
): T {
  if (!translation) {
    return article;
  }

  return {
    ...article,
    title: translation.title,
    readTimeLabel: translation.readTimeLabel ?? article.readTimeLabel,
    ...(translation.body !== undefined ? { body: translation.body } : {}),
  };
}

async function loadArticleTranslationMap(
  articleIds: readonly string[],
  locale: SupportedLocale,
) {
  if (locale === DEFAULT_LOCALE || articleIds.length === 0) {
    return new Map<string, { title: string; readTimeLabel: string | null; body: string }>();
  }

  const rows = await getPrisma().articleTranslation.findMany({
    where: {
      articleId: { in: [...articleIds] },
      locale,
    },
    select: {
      articleId: true,
      title: true,
      readTimeLabel: true,
      body: true,
    },
  });

  return new Map(rows.map((row) => [row.articleId, row]));
}

/** Published articles for the resources list. */
export async function listArticles(
  locale: SupportedLocale = DEFAULT_LOCALE,
): Promise<ArticleSummaryDto[]> {
  const articles = await getPrisma().article.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      readTimeLabel: true,
    },
  });

  const translations = await loadArticleTranslationMap(
    articles.map((article) => article.id),
    locale,
  );

  return articles.map((article) =>
    toArticleSummary(
      applyArticleTranslation(article, translations.get(article.id)),
    ),
  );
}

/** Single published article by slug — throws 404 when missing. */
export async function getArticleBySlug(
  slug: string,
  locale: SupportedLocale = DEFAULT_LOCALE,
): Promise<ArticleDetailDto> {
  const article = await getPrisma().article.findFirst({
    where: { slug, published: true },
    select: {
      id: true,
      slug: true,
      title: true,
      readTimeLabel: true,
      body: true,
      updatedAt: true,
    },
  });

  if (!article) {
    throw ApiError.notFound("Article not found");
  }

  const translations = await loadArticleTranslationMap([article.id], locale);
  const localized = applyArticleTranslation(article, translations.get(article.id));

  return {
    ...toArticleSummary(localized),
    slug: article.slug,
    body: localized.body,
    updatedAt: article.updatedAt.toISOString(),
  };
}
