import { deletePortfolioProject } from "@/server/features/portfolio/delete-portfolio-project";
import { updatePortfolioProjectSchema } from "@/server/features/portfolio/portfolio.schema";
import { updatePortfolioProject } from "@/server/features/portfolio/mutate-portfolio-project";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function patchAdminPortfolio(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  const body = await parseJsonBody(request, updatePortfolioProjectSchema);
  const project = await updatePortfolioProject(id, body);

  logger.info("admin.portfolio.updated", { id: project.id });

  return jsonSuccess(project);
}

async function deleteAdminPortfolio(
  request: Request,
  context: { params: Promise<Record<string, string>> },
): Promise<Response> {
  await requireAdminAuth(request);

  const { id } = await context.params;
  await deletePortfolioProject(id);

  logger.info("admin.portfolio.deleted", { id });

  return jsonSuccess({ deleted: true });
}

export const PATCH = handleApiRoute(patchAdminPortfolio);
export const DELETE = handleApiRoute(deleteAdminPortfolio);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
