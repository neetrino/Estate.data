import {
  DEFAULT_RECENT_WORK_LIMIT,
  MAX_RECENT_WORK_LIMIT,
  MIN_RECENT_WORK_LIMIT,
} from "@/features/recent-work/recent-work.constants";
import type { RecentWorkProjectDto } from "@/features/recent-work/recent-work.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";

/** Parse `?limit=` for GET /api/v1/projects/recent. */
export function parseRecentWorkLimit(raw: string | null): number {
  if (raw === null || raw.trim() === "") {
    return DEFAULT_RECENT_WORK_LIMIT;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed)) {
    throw ApiError.badRequest("limit must be an integer", "VALIDATION_ERROR", [
      { path: "limit", message: "Must be an integer" },
    ]);
  }

  if (parsed < MIN_RECENT_WORK_LIMIT || parsed > MAX_RECENT_WORK_LIMIT) {
    throw ApiError.badRequest(
      `limit must be between ${MIN_RECENT_WORK_LIMIT} and ${MAX_RECENT_WORK_LIMIT}`,
      "VALIDATION_ERROR",
      [{ path: "limit", message: "Out of allowed range" }],
    );
  }

  return parsed;
}

function toRecentWorkProjectDto(project: {
  id: string;
  imageUrl: string;
  imageAlt: string;
}): RecentWorkProjectDto {
  return {
    id: project.id,
    imageSrc: project.imageUrl,
    imageAlt: project.imageAlt,
  };
}

/** Published portfolio subset for the home page, ordered by sortOrder. */
export async function listRecentWorkProjects(
  limit: number,
): Promise<RecentWorkProjectDto[]> {
  const projects = await getPrisma().portfolioProject.findMany({
    where: { published: true, featuredOnHome: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    take: limit,
    select: {
      id: true,
      imageUrl: true,
      imageAlt: true,
    },
  });

  return projects.map(toRecentWorkProjectDto);
}
