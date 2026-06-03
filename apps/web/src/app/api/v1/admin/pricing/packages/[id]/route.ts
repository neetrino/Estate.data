import { deletePricingPackage } from "@/server/features/pricing/delete-pricing-package";
import { updatePricingPackageSchema } from "@/server/features/pricing/pricing.schema";
import { updatePricingPackage } from "@/server/features/pricing/update-pricing-package";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function patchAdminPricingPackage(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  const body = await parseJsonBody(request, updatePricingPackageSchema);
  const pricingPackage = await updatePricingPackage(id, body);

  logger.info("admin.pricing.updated", { id: pricingPackage.id, price: pricingPackage.price });

  return jsonSuccess(pricingPackage);
}

async function deleteAdminPricingPackage(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  await deletePricingPackage(id);

  logger.info("admin.pricing_package.deleted", { id });

  return jsonSuccess({ deleted: true });
}

export const PATCH = handleApiRoute(patchAdminPricingPackage);
export const DELETE = handleApiRoute(deleteAdminPricingPackage);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
