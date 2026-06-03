import { invalidatePortfolioCache } from "@/server/features/portfolio/list-portfolio-projects";
import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

/** Delete portfolio project; translations cascade via Prisma. */
export async function deletePortfolioProject(id: string): Promise<void> {
  const existing = await getPrisma().portfolioProject.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("Portfolio project not found");
  }

  await getPrisma().portfolioProject.delete({ where: { id } });
  await invalidatePortfolioCache();
}
