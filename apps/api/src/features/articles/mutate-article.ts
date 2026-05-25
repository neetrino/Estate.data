import type {
  ArticleDetailDto,
  CreateArticleInput,
} from "@/features/articles/article.schema";
import {
  articleHref,
  type ArticleSummaryDto,
} from "@/features/articles/article.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: string }).code === "P2002"
  );
}

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

function toArticleDetail(article: {
  id: string;
  slug: string;
  title: string;
  readTimeLabel: string;
  body: string;
  updatedAt: Date;
}): ArticleDetailDto {
  return {
    ...toArticleSummary(article),
    slug: article.slug,
    body: article.body,
    updatedAt: article.updatedAt.toISOString(),
  };
}

/** Create an article (admin). */
export async function createArticle(
  input: CreateArticleInput,
): Promise<ArticleDetailDto> {
  try {
    const article = await getPrisma().article.create({
      data: {
        slug: input.slug,
        title: input.title,
        readTimeLabel: input.readTimeLabel,
        body: input.body,
        sortOrder: input.sortOrder ?? 0,
        published: input.published ?? true,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        readTimeLabel: true,
        body: true,
        updatedAt: true,
      },
    });

    return toArticleDetail(article);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw ApiError.badRequest("Article slug already exists", "VALIDATION_ERROR", [
        { path: "slug", message: "Must be unique" },
      ]);
    }

    throw error;
  }
}

/** Update an article by id (admin). */
export async function updateArticle(
  id: string,
  input: Partial<CreateArticleInput>,
): Promise<ArticleDetailDto> {
  const existing = await getPrisma().article.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("Article not found");
  }

  try {
    const article = await getPrisma().article.update({
      where: { id },
      data: {
        ...(input.slug !== undefined ? { slug: input.slug } : {}),
        ...(input.title !== undefined ? { title: input.title } : {}),
        ...(input.readTimeLabel !== undefined
          ? { readTimeLabel: input.readTimeLabel }
          : {}),
        ...(input.body !== undefined ? { body: input.body } : {}),
        ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
        ...(input.published !== undefined ? { published: input.published } : {}),
      },
      select: {
        id: true,
        slug: true,
        title: true,
        readTimeLabel: true,
        body: true,
        updatedAt: true,
      },
    });

    return toArticleDetail(article);
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw ApiError.badRequest("Article slug already exists", "VALIDATION_ERROR", [
        { path: "slug", message: "Must be unique" },
      ]);
    }

    throw error;
  }
}
