import { updatePricingPackageSchema } from "@/features/pricing/pricing.schema";
import { updatePricingPackage } from "@/features/pricing/update-pricing-package";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

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

export const PATCH = handleApiRoute(patchAdminPricingPackage);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
