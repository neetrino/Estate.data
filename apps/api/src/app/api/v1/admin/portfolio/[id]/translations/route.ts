import { upsertPortfolioTranslation } from "@/features/i18n/upsert-portfolio-translation";
import { upsertPortfolioTranslationSchema } from "@/features/i18n/cms-translation.schema";
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

  const { id } = await context.params;
  const body = await parseJsonBody(request, upsertPortfolioTranslationSchema);
  const data = await upsertPortfolioTranslation(id, body);

  return jsonSuccess(data);
}

export const PUT = handleApiRoute(putTranslation);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
