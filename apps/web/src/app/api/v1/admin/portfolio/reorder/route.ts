import { reorderPortfolioProjects } from "@/server/features/portfolio/reorder-portfolio-projects";
import { reorderPortfolioProjectsSchema } from "@/server/features/portfolio/portfolio.schema";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function patchAdminPortfolioReorder(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const body = await parseJsonBody(request, reorderPortfolioProjectsSchema);
  const result = await reorderPortfolioProjects(body);
  logger.info("admin.portfolio.reordered", { count: result.updated });
  return jsonSuccess(result);
}

export const PATCH = handleApiRoute(patchAdminPortfolioReorder);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
