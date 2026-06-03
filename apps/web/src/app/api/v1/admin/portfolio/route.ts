import { listAdminPortfolioProjects } from "@/server/features/portfolio/list-admin-portfolio-projects";
import {
  createPortfolioProjectSchema,
} from "@/server/features/portfolio/portfolio.schema";
import { createPortfolioProject } from "@/server/features/portfolio/mutate-portfolio-project";
import { requireAdminAuth } from "@/server/lib/auth/require-admin";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

async function getAdminPortfolio(request: Request): Promise<Response> {
  await requireAdminAuth(request);
  const projects = await listAdminPortfolioProjects();
  return jsonSuccess(projects);
}

async function postAdminPortfolio(
  request: Request
): Promise<Response> {
  await requireAdminAuth(request);

  const body = await parseJsonBody(request, createPortfolioProjectSchema);
  const project = await createPortfolioProject(body);

  logger.info("admin.portfolio.created", { id: project.id, category: project.category });

  return jsonSuccess(project, { status: 201 });
}

export const GET = handleApiRoute(getAdminPortfolio);
export const POST = handleApiRoute(postAdminPortfolio);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
