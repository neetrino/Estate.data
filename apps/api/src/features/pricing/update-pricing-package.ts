import type {
  PricingPackageDto,
  UpdatePricingPackageInput,
} from "@/features/pricing/pricing.schema";
import { invalidatePricingCache } from "@/features/pricing/get-pricing-page";
import { isPricingCardAccent } from "@estate/db";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";

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
    features: Array.isArray(row.features)
      ? row.features.filter((item): item is string => typeof item === "string")
      : [],
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

/** Update a pricing package by stable id (admin). */
export async function updatePricingPackage(
  id: string,
  input: UpdatePricingPackageInput,
): Promise<PricingPackageDto> {
  const existing = await getPrisma().pricingPackage.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("Pricing package not found");
  }

  const packageRow = await getPrisma().pricingPackage.update({
    where: { id },
    data: {
      ...(input.name !== undefined ? { name: input.name } : {}),
      ...(input.price !== undefined ? { price: input.price } : {}),
      ...(input.priceSuffixOverride !== undefined
        ? { priceSuffixOverride: input.priceSuffixOverride }
        : {}),
      ...(input.features !== undefined ? { features: input.features } : {}),
      ...(input.bookLabel !== undefined ? { bookLabel: input.bookLabel } : {}),
      ...(input.bookHref !== undefined ? { bookHref: input.bookHref } : {}),
      ...(input.cardAccent !== undefined ? { cardAccent: input.cardAccent } : {}),
      ...(input.highlighted !== undefined ? { highlighted: input.highlighted } : {}),
      ...(input.badgeLabel !== undefined ? { badgeLabel: input.badgeLabel } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
      ...(input.published !== undefined ? { published: input.published } : {}),
    },
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
  });

  await invalidatePricingCache();
  return toPricingPackageDto(packageRow);
}
