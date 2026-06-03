import { listPortfolioProjects } from "@/server/features/portfolio/list-portfolio-projects";
import { parseLocaleFromRequest } from "@/server/lib/i18n/parse-locale";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { handleApiRoute } from "@/server/lib/route-handler";

async function getPortfolio(
  request: Request
): Promise<Response> {
  const locale = parseLocaleFromRequest(request);
  const projects = await listPortfolioProjects(locale);
  return jsonSuccess(projects);
}
export const GET = handleApiRoute(getPortfolio);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
