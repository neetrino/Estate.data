import { invalidatePortfolioCache } from "@/server/features/portfolio/list-portfolio-projects";
import type { ReorderPortfolioProjectsInput } from "@/server/features/portfolio/portfolio.schema";
import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

function assertCompleteIdList(ids: readonly string[], existingIds: readonly string[]): void {
  if (ids.length !== existingIds.length) {
    throw ApiError.badRequest("Reorder list must include every project exactly once");
  }

  const uniqueIds = new Set(ids);
  if (uniqueIds.size !== ids.length) {
    throw ApiError.badRequest("Reorder list contains duplicate project ids");
  }

  const existing = new Set(existingIds);
  const missing = ids.some((id) => !existing.has(id));
  if (missing) {
    throw ApiError.badRequest("Reorder list includes an unknown project");
  }
}

/** Persist admin drag-and-drop order as consecutive sortOrder values. */
export async function reorderPortfolioProjects(
  input: ReorderPortfolioProjectsInput,
): Promise<{ updated: number }> {
  const prisma = getPrisma();
  const existing = await prisma.portfolioProject.findMany({
    select: { id: true },
  });
  assertCompleteIdList(
    input.ids,
    existing.map((row) => row.id),
  );

  await prisma.$transaction(
    input.ids.map((id, index) =>
      prisma.portfolioProject.update({
        where: { id },
        data: { sortOrder: index },
      }),
    ),
  );
  await invalidatePortfolioCache();
  return { updated: input.ids.length };
}
