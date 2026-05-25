import { z } from "zod";
import { SUPPORTED_LOCALES } from "@estate/db";

const localeSchema = z.enum(SUPPORTED_LOCALES);

export const upsertPortfolioTranslationSchema = z.object({
  locale: localeSchema,
  imageAlt: z.string().min(1).max(500).optional(),
  category: z.string().min(1).max(100).optional(),
});

export type UpsertPortfolioTranslationInput = z.infer<
  typeof upsertPortfolioTranslationSchema
>;

export const upsertPricingCategoryTranslationSchema = z.object({
  locale: localeSchema,
  sectionTitle: z.string().min(1).max(200),
  priceSuffix: z.string().min(1).max(100).optional(),
});

export type UpsertPricingCategoryTranslationInput = z.infer<
  typeof upsertPricingCategoryTranslationSchema
>;
