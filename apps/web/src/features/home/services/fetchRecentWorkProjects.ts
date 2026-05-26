import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";
import {
  HOME_RECENT_WORK_COPY,
  type RecentWorkProject,
} from "@/features/home/content/recentWorkCopy";
import { resolvePortfolioImageUrl } from "@/features/portfolio/lib/resolve-portfolio-image-url";
import { DEFAULT_RECENT_WORK_LIMIT } from "@estate/db";

type RecentWorkProjectApi = RecentWorkProject;

/** Home recent work tiles — static mock or `GET /api/v1/projects/recent`. */
export async function fetchRecentWorkProjects(
  limit = DEFAULT_RECENT_WORK_LIMIT,
): Promise<RecentWorkProject[]> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return HOME_RECENT_WORK_COPY.projects.slice(0, limit).map((project) => ({
      ...project,
    }));
  }

  const path = `${API_ROUTES.projectsRecent}?limit=${limit}`;
  const projects = await apiClient.get<RecentWorkProjectApi[]>(path);

  return projects.map((project) => ({
    ...project,
    imageSrc: resolvePortfolioImageUrl(project.imageSrc),
  }));
}
