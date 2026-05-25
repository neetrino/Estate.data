import type { UpsertArticleTranslationInput } from "@/features/i18n/translation.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";
import { DEFAULT_LOCALE } from "@estate/db";

/** Upsert localized article fields (admin). */
export async function upsertArticleTranslation(
  articleId: string,
  input: UpsertArticleTranslationInput,
) {
  if (input.locale === DEFAULT_LOCALE) {
    throw ApiError.badRequest(
      "Use article PATCH for default locale content",
      "VALIDATION_ERROR",
      [{ path: "locale", message: "Cannot upsert default locale translation" }],
    );
  }

  const article = await getPrisma().article.findUnique({
    where: { id: articleId },
    select: { id: true },
  });

  if (!article) {
    throw ApiError.notFound("Article not found");
  }

  return getPrisma().articleTranslation.upsert({
    where: {
      articleId_locale: {
        articleId,
        locale: input.locale,
      },
    },
    create: {
      articleId,
      locale: input.locale,
      title: input.title,
      readTimeLabel: input.readTimeLabel ?? null,
      body: input.body,
    },
    update: {
      title: input.title,
      readTimeLabel: input.readTimeLabel ?? null,
      body: input.body,
    },
    select: {
      id: true,
      articleId: true,
      locale: true,
      title: true,
      readTimeLabel: true,
      updatedAt: true,
    },
  });
}
