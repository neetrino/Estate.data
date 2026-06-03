import { parseFeatures } from "@/server/features/pricing/pricing-admin-utils";
import type { AdminPricingPackageRow } from "@/server/features/pricing/get-admin-pricing";
import { invalidatePricingCache } from "@/server/features/pricing/get-pricing-page";
import type { CreatePricingPackageInput } from "@/server/features/pricing/pricing.schema";
import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

function toRow(row: {
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
  return {
    id: row.id,
    categoryKey: row.categoryKey,
    name: row.name,
    price: row.price,
    priceSuffixOverride: row.priceSuffixOverride,
    features: parseFeatures(row.features),
    bookLabel: row.bookLabel,
    bookHref: row.bookHref,
    cardAccent: row.cardAccent,
    highlighted: row.highlighted,
    badgeLabel: row.badgeLabel,
    sortOrder: row.sortOrder,
    published: row.published,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/** Create a pricing package (admin). */
export async function createPricingPackage(
  input: CreatePricingPackageInput,
): Promise<AdminPricingPackageRow> {
  const category = await getPrisma().pricingCategory.findUnique({
    where: { key: input.categoryKey },
    select: { key: true },
  });

  if (!category) {
    throw ApiError.badRequest("Pricing category not found", "VALIDATION_ERROR", [
      { path: "categoryKey", message: "Unknown category" },
    ]);
  }

  const existing = await getPrisma().pricingPackage.findUnique({
    where: { id: input.id },
    select: { id: true },
  });

  if (existing) {
    throw ApiError.badRequest("Package id already exists", "VALIDATION_ERROR", [
      { path: "id", message: "Must be unique" },
    ]);
  }

  const created = await getPrisma().pricingPackage.create({
    data: {
      id: input.id,
      categoryKey: input.categoryKey,
      name: input.name,
      price: input.price,
      priceSuffixOverride: input.priceSuffixOverride ?? null,
      features: input.features,
      bookLabel: input.bookLabel,
      bookHref: input.bookHref,
      cardAccent: input.cardAccent ?? null,
      highlighted: input.highlighted ?? false,
      badgeLabel: input.badgeLabel ?? null,
      sortOrder: input.sortOrder ?? 0,
      published: input.published ?? true,
    },
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
  });

  await invalidatePricingCache();
  return toRow(created);
}
