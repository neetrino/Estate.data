import { updatePortfolioProjectSchema } from "@/features/portfolio/portfolio.schema";
import { updatePortfolioProject } from "@/features/portfolio/mutate-portfolio-project";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

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

export const PATCH = handleApiRoute(patchAdminPortfolio);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
