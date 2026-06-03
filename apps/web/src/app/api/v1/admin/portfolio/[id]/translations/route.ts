import { upsertPortfolioTranslation } from "@/server/features/i18n/upsert-portfolio-translation";
import { upsertPortfolioTranslationSchema } from "@/server/features/i18n/cms-translation.schema";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { enforceAdminRateLimit } from "@/server/lib/rate-limit/enforce-rate-limit";
import { ApiError } from "@/server/lib/api-error";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

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
