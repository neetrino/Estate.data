import { createPricingPackage } from "@/server/features/pricing/create-pricing-package";
import { createPricingPackageSchema } from "@/server/features/pricing/pricing.schema";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function postAdminPricingPackage(request: Request): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, createPricingPackageSchema);
  const pricingPackage = await createPricingPackage(body);

  logger.info("admin.pricing_package.created", { id: pricingPackage.id });

  return jsonSuccess(pricingPackage, { status: 201 });
}

export const POST = handleApiRoute(postAdminPricingPackage);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
