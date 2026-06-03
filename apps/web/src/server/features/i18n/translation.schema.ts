import { z } from "zod";
import { SUPPORTED_LOCALES } from "@estate/db";

export const localeSchema = z.enum(SUPPORTED_LOCALES);

export const upsertArticleTranslationSchema = z.object({
  locale: localeSchema,
  title: z.string().min(1).max(300),
  readTimeLabel: z.string().min(1).max(40).optional(),
  body: z.string().min(1).max(100_000),
});

export type UpsertArticleTranslationInput = z.infer<
  typeof upsertArticleTranslationSchema
>;

export const upsertFaqTranslationSchema = z.object({
  locale: localeSchema,
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
});

export type UpsertFaqTranslationInput = z.infer<typeof upsertFaqTranslationSchema>;
