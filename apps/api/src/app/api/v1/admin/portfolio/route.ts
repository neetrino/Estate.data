import {
  createPortfolioProjectSchema,
} from "@/features/portfolio/portfolio.schema";
import { createPortfolioProject } from "@/features/portfolio/mutate-portfolio-project";
import { requireAdminAuth } from "@/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

async function postAdminPortfolio(
  request: Request
): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, createPortfolioProjectSchema);
  const project = await createPortfolioProject(body);

  logger.info("admin.portfolio.created", { id: project.id, category: project.category });

  return jsonSuccess(project, { status: 201 });
}

export const POST = handleApiRoute(postAdminPortfolio);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
