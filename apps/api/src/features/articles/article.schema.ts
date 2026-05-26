import { z } from "zod";

export const ARTICLE_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const articleSlugSchema = z
  .string()
  .min(1)
  .max(120)
  .regex(ARTICLE_SLUG_PATTERN, "Slug must be lowercase letters, numbers, and hyphens");

export const articleSummaryDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  readTimeLabel: z.string(),
  href: z.string(),
});

export type ArticleSummaryDto = z.infer<typeof articleSummaryDtoSchema>;

export const articleDetailDtoSchema = articleSummaryDtoSchema.extend({
  slug: articleSlugSchema,
  body: z.string(),
  updatedAt: z.string().datetime(),
});

export type ArticleDetailDto = z.infer<typeof articleDetailDtoSchema>;

export const createArticleSchema = z.object({
  slug: articleSlugSchema,
  title: z.string().min(1).max(300),
  readTimeLabel: z.string().min(1).max(40),
  body: z.string().min(1).max(100_000),
  sortOrder: z.number().int().min(0).max(9999).optional(),
  published: z.boolean().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = createArticleSchema.partial();

export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;

export const RESOURCES_ARTICLE_PATH_PREFIX = "/resources";

export function articleHref(slug: string): string {
  return `${RESOURCES_ARTICLE_PATH_PREFIX}/${slug}`;
}
