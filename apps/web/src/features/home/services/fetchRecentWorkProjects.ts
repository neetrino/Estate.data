import { clientEnv } from "@/config/env";
import {
  HOME_RECENT_WORK_COPY,
  type RecentWorkProject,
} from "@/features/home/content/recentWorkCopy";
import { resolvePortfolioImageUrl } from "@/features/portfolio/lib/resolve-portfolio-image-url";
import { listRecentWorkProjects } from "@/server/features/recent-work/list-recent-work-projects";
import { logger } from "@/server/lib/logger";
import { DEFAULT_RECENT_WORK_LIMIT } from "@estate/db";

function staticRecentWork(limit: number): RecentWorkProject[] {
  return HOME_RECENT_WORK_COPY.projects.slice(0, limit).map((project) => ({
    ...project,
  }));
}

/**
 * Home recent-work tiles from Prisma. Does not HTTP-fetch the public API
 * (that deadlocks / 401s on Vercel when APP_URL is localhost or protected).
 */
export async function fetchRecentWorkProjects(
  limit = DEFAULT_RECENT_WORK_LIMIT,
): Promise<RecentWorkProject[]> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return staticRecentWork(limit);
  }

  try {
    const projects = await listRecentWorkProjects(limit);
    if (projects.length === 0) {
      return staticRecentWork(limit);
    }

    return projects.map((project) => ({
      ...project,
      imageSrc: resolvePortfolioImageUrl(project.imageSrc),
    }));
  } catch (error) {
    logger.warn("home.recent_work.fallback_default", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return staticRecentWork(limit);
  }
}
