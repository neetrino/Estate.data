import type {
  PricingCategoryDto,
  PricingPackageDto,
  PricingPageDto,
} from "@/features/pricing/pricing.schema";
import { isPricingCardAccent, type PricingCategoryKey, DEFAULT_LOCALE, type SupportedLocale } from "@estate/db";
import { cacheGet, cacheSet } from "@/lib/cache/redis-cache";
import { getPrisma } from "@/lib/db";

function cacheKey(locale: SupportedLocale): string {
  return `pricing:page:${locale}`;
}

function parseFeatures(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function toPricingPackageDto(row: {
  id: string;
  name: string;
  price: string;
  priceSuffixOverride: string | null;
  features: unknown;
  bookLabel: string;
  bookHref: string;
  cardAccent: string | null;
  highlighted: boolean;
  badgeLabel: string | null;
}): PricingPackageDto {
  const dto: PricingPackageDto = {
    id: row.id,
    name: row.name,
    price: row.price,
    features: parseFeatures(row.features),
    bookLabel: row.bookLabel,
    bookHref: row.bookHref,
  };

  if (row.cardAccent && isPricingCardAccent(row.cardAccent)) {
    dto.cardAccent = row.cardAccent;
  }

  if (row.highlighted) {
    dto.highlighted = true;
  }

  if (row.badgeLabel) {
    dto.badgeLabel = row.badgeLabel;
  }

  if (row.priceSuffixOverride !== null) {
    dto.priceSuffix = row.priceSuffixOverride;
  }

  return dto;
}

async function loadCategoryTranslation(
  categoryKey: PricingCategoryKey,
  locale: SupportedLocale,
) {
  if (locale === DEFAULT_LOCALE) {
    return null;
  }

  return getPrisma().pricingCategoryTranslation.findUnique({
    where: {
      categoryKey_locale: {
        categoryKey,
        locale,
      },
    },
    select: {
      sectionTitle: true,
      priceSuffix: true,
    },
  });
}

async function loadCategory(
  categoryKey: PricingCategoryKey,
  locale: SupportedLocale,
): Promise<PricingCategoryDto> {
  const category = await getPrisma().pricingCategory.findUnique({
    where: { key: categoryKey },
    select: {
      sectionTitle: true,
      priceSuffix: true,
      packages: {
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          name: true,
          price: true,
          priceSuffixOverride: true,
          features: true,
          bookLabel: true,
          bookHref: true,
          cardAccent: true,
          highlighted: true,
          badgeLabel: true,
        },
      },
    },
  });

  if (!category) {
    return { sectionTitle: "", priceSuffix: "", packages: [] };
  }

  const translation = await loadCategoryTranslation(categoryKey, locale);

  return {
    sectionTitle: translation?.sectionTitle ?? category.sectionTitle,
    priceSuffix: translation?.priceSuffix ?? category.priceSuffix,
    packages: category.packages.map(toPricingPackageDto),
  };
}

/** Public pricing page payload grouped by category. */
export async function getPricingPage(
  locale: SupportedLocale = DEFAULT_LOCALE,
): Promise<PricingPageDto> {
  const key = cacheKey(locale);
  const cached = await cacheGet<PricingPageDto>(key);
  if (cached) {
    return cached;
  }

  const [media, analytics] = await Promise.all([
    loadCategory("media", locale),
    loadCategory("analytics", locale),
  ]);

  const result = { media, analytics };
  await cacheSet(key, result);
  return result;
}

export async function invalidatePricingCache(): Promise<void> {
  const { cacheInvalidatePrefix } = await import("@/lib/cache/redis-cache");
  await cacheInvalidatePrefix("pricing:");
}
