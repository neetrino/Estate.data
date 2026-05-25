import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";
import {
  PORTFOLIO_PAGE_COPY,
  type PortfolioProject,
} from "@/features/portfolio/content/portfolioCopy";
import { resolvePortfolioImageUrl } from "@/features/portfolio/lib/resolve-portfolio-image-url";

type PortfolioProjectApi = Omit<PortfolioProject, "imageSrc"> & {
  imageSrc: string;
};

/** Portfolio tiles — static mock or `GET /api/v1/portfolio`. */
export async function fetchPortfolioProjects(): Promise<PortfolioProject[]> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return PORTFOLIO_PAGE_COPY.projects.map((project) => ({ ...project }));
  }

  const projects = await apiClient.get<PortfolioProjectApi[]>(API_ROUTES.portfolio);

  return projects.map((project) => ({
    ...project,
    imageSrc: resolvePortfolioImageUrl(project.imageSrc),
  }));
}
