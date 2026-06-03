import { parseFeatures } from "@/server/features/pricing/pricing-admin-utils";
import { getPrisma } from "@/server/lib/db";
import { isPricingCardAccent } from "@estate/db";

export type AdminPricingPackageRow = {
  id: string;
  categoryKey: string;
  name: string;
  price: string;
  priceSuffixOverride: string | null;
  features: string[];
  bookLabel: string;
  bookHref: string;
  cardAccent: string | null;
  highlighted: boolean;
  badgeLabel: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminPricingCategoryTranslation = {
  locale: string;
  sectionTitle: string;
  priceSuffix: string | null;
};

export type AdminPricingCategoryRow = {
  key: string;
  sectionTitle: string;
  priceSuffix: string;
  translations: AdminPricingCategoryTranslation[];
  packages: AdminPricingPackageRow[];
};

export type AdminPricingPayload = {
  categories: AdminPricingCategoryRow[];
};

function toPackageRow(row: {
  id: string;
  categoryKey: string;
  name: string;
  price: string;
  priceSuffixOverride: string | null;
  features: unknown;
  bookLabel: string;
  bookHref: string;
  cardAccent: string | null;
  highlighted: boolean;
  badgeLabel: string | null;
  sortOrder: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}): AdminPricingPackageRow {
  const cardAccent =
    row.cardAccent && isPricingCardAccent(row.cardAccent) ? row.cardAccent : row.cardAccent;

  return {
    id: row.id,
    categoryKey: row.categoryKey,
    name: row.name,
    price: row.price,
    priceSuffixOverride: row.priceSuffixOverride,
    features: parseFeatures(row.features),
    bookLabel: row.bookLabel,
    bookHref: row.bookHref,
    cardAccent,
    highlighted: row.highlighted,
    badgeLabel: row.badgeLabel,
    sortOrder: row.sortOrder,
    published: row.published,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** Full pricing tree for admin (all packages, including unpublished). */
export async function getAdminPricing(): Promise<AdminPricingPayload> {
  const categories = await getPrisma().pricingCategory.findMany({
    orderBy: { key: "asc" },
    select: {
      key: true,
      sectionTitle: true,
      priceSuffix: true,
      translations: {
        select: {
          locale: true,
          sectionTitle: true,
          priceSuffix: true,
        },
      },
      packages: {
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          categoryKey: true,
          name: true,
          price: true,
          priceSuffixOverride: true,
          features: true,
          bookLabel: true,
          bookHref: true,
          cardAccent: true,
          highlighted: true,
          badgeLabel: true,
          sortOrder: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return {
    categories: categories.map((category) => ({
      key: category.key,
      sectionTitle: category.sectionTitle,
      priceSuffix: category.priceSuffix,
      translations: category.translations,
      packages: category.packages.map(toPackageRow),
    })),
  };
}
