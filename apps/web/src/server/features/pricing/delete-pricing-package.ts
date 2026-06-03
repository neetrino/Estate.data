import { invalidatePricingCache } from "@/server/features/pricing/get-pricing-page";
import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

/** Delete pricing package by id (admin). */
export async function deletePricingPackage(id: string): Promise<void> {
  const existing = await getPrisma().pricingPackage.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("Pricing package not found");
  }

  await getPrisma().pricingPackage.delete({ where: { id } });
  await invalidatePricingCache();
}
