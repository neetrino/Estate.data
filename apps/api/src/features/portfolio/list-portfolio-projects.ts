import type { PortfolioProjectDto } from "@/features/portfolio/portfolio.schema";
import { cacheGet, cacheSet } from "@/lib/cache/redis-cache";
import { getPrisma } from "@/lib/db";
import { DEFAULT_LOCALE, type SupportedLocale } from "@estate/db";

function cacheKey(locale: SupportedLocale): string {
  return `portfolio:list:${locale}`;
}

function toPortfolioProjectDto(project: {
  id: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}): PortfolioProjectDto {
  return {
    id: project.id,
    imageSrc: project.imageUrl,
    imageAlt: project.imageAlt,
    category: project.category as PortfolioProjectDto["category"],
  };
}

async function loadPortfolioTranslations(
  projectIds: readonly string[],
  locale: SupportedLocale,
) {
  if (locale === DEFAULT_LOCALE || projectIds.length === 0) {
    return new Map<string, { imageAlt: string | null; category: string | null }>();
  }

  const rows = await getPrisma().portfolioProjectTranslation.findMany({
    where: {
      projectId: { in: [...projectIds] },
      locale,
    },
    select: {
      projectId: true,
      imageAlt: true,
      category: true,
    },
  });

  return new Map(rows.map((row) => [row.projectId, row]));
}

/** Public published portfolio projects ordered by sortOrder. */
export async function listPortfolioProjects(
  locale: SupportedLocale = DEFAULT_LOCALE,
): Promise<PortfolioProjectDto[]> {
  const key = cacheKey(locale);
  const cached = await cacheGet<PortfolioProjectDto[]>(key);
  if (cached) {
    return cached;
  }

  const projects = await getPrisma().portfolioProject.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      imageUrl: true,
      imageAlt: true,
      category: true,
    },
  });

  const translations = await loadPortfolioTranslations(
    projects.map((project) => project.id),
    locale,
  );

  const result = projects.map((project) => {
    const translation = translations.get(project.id);
    return toPortfolioProjectDto({
      ...project,
      imageAlt: translation?.imageAlt ?? project.imageAlt,
      category: translation?.category ?? project.category,
    });
  });

  await cacheSet(key, result);
  return result;
}

export async function invalidatePortfolioCache(): Promise<void> {
  const { cacheInvalidatePrefix } = await import("@/lib/cache/redis-cache");
  await cacheInvalidatePrefix("portfolio:");
}
