import { upsertPricingCategoryTranslation } from "@/features/i18n/upsert-pricing-category-translation";
import { upsertPricingCategoryTranslationSchema } from "@/features/i18n/cms-translation.schema";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { enforceAdminRateLimit } from "@/lib/rate-limit/enforce-rate-limit";
import { ApiError } from "@/lib/api-error";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

async function putTranslation(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  const rateLimit = await enforceAdminRateLimit(request);
  if (!rateLimit.success) {
    throw ApiError.rateLimited(rateLimit.retryAfterSeconds);
  }

  await requireAdminAuth(request);

  const { key } = await context.params;
  const body = await parseJsonBody(request, upsertPricingCategoryTranslationSchema);
  const data = await upsertPricingCategoryTranslation(key, body);

  return jsonSuccess(data);
}

export const PUT = handleApiRoute(putTranslation);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
