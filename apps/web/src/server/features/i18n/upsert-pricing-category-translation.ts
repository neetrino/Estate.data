import type { UpsertPricingCategoryTranslationInput } from "@/server/features/i18n/cms-translation.schema";
import { invalidatePricingCache } from "@/server/features/pricing/get-pricing-page";
import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";
import { DEFAULT_LOCALE } from "@estate/db";

/** Upsert localized pricing category titles (admin). */
export async function upsertPricingCategoryTranslation(
  categoryKey: string,
  input: UpsertPricingCategoryTranslationInput,
) {
  if (input.locale === DEFAULT_LOCALE) {
    throw ApiError.badRequest(
      "Use pricing admin PATCH for default locale content",
      "VALIDATION_ERROR",
      [{ path: "locale", message: "Cannot upsert default locale translation" }],
    );
  }

  const category = await getPrisma().pricingCategory.findUnique({
    where: { key: categoryKey },
    select: { key: true },
  });

  if (!category) {
    throw ApiError.notFound("Pricing category not found");
  }

  const result = await getPrisma().pricingCategoryTranslation.upsert({
    where: {
      categoryKey_locale: {
        categoryKey,
        locale: input.locale,
      },
    },
    create: {
      categoryKey,
      locale: input.locale,
      sectionTitle: input.sectionTitle,
      priceSuffix: input.priceSuffix ?? null,
    },
    update: {
      sectionTitle: input.sectionTitle,
      priceSuffix: input.priceSuffix ?? null,
    },
    select: {
      id: true,
      categoryKey: true,
      locale: true,
      sectionTitle: true,
      priceSuffix: true,
      updatedAt: true,
    },
  });

  await invalidatePricingCache();
  return result;
}
