import { z } from "zod";
import { PRICING_CARD_ACCENTS } from "@estate/db";

export const pricingPackageDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  bookLabel: z.string(),
  bookHref: z.string(),
  cardAccent: z.enum(PRICING_CARD_ACCENTS).optional(),
  highlighted: z.boolean().optional(),
  badgeLabel: z.string().optional(),
  priceSuffix: z.string().optional(),
});

export type PricingPackageDto = z.infer<typeof pricingPackageDtoSchema>;

export const pricingCategoryDtoSchema = z.object({
  sectionTitle: z.string(),
  priceSuffix: z.string(),
  packages: z.array(pricingPackageDtoSchema),
});

export type PricingCategoryDto = z.infer<typeof pricingCategoryDtoSchema>;

export const pricingPageDtoSchema = z.object({
  media: pricingCategoryDtoSchema,
  analytics: pricingCategoryDtoSchema,
});

export type PricingPageDto = z.infer<typeof pricingPageDtoSchema>;

export const updatePricingPackageSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  price: z.string().min(1).max(40).optional(),
  priceSuffixOverride: z.string().max(40).nullable().optional(),
  features: z.array(z.string().min(1).max(200)).min(1).max(20).optional(),
  bookLabel: z.string().min(1).max(80).optional(),
  bookHref: z.string().min(1).max(500).optional(),
  cardAccent: z.enum(PRICING_CARD_ACCENTS).nullable().optional(),
  highlighted: z.boolean().optional(),
  badgeLabel: z.string().max(80).nullable().optional(),
  sortOrder: z.number().int().min(0).max(9999).optional(),
  published: z.boolean().optional(),
});

export type UpdatePricingPackageInput = z.infer<typeof updatePricingPackageSchema>;
