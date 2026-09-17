import { invalidatePortfolioCache } from "@/server/features/portfolio/list-portfolio-projects";
import type {
  CreatePortfolioProjectInput,
  PortfolioProjectDto,
} from "@/server/features/portfolio/portfolio.schema";
import { ApiError } from "@/server/lib/api-error";
import { getPrisma } from "@/server/lib/db";

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

async function nextPortfolioSortOrder(): Promise<number> {
  const aggregated = await getPrisma().portfolioProject.aggregate({
    _max: { sortOrder: true },
  });
  return (aggregated._max.sortOrder ?? -1) + 1;
}

/** Create a portfolio project (admin). */
export async function createPortfolioProject(
  input: CreatePortfolioProjectInput,
): Promise<PortfolioProjectDto> {
  const sortOrder = input.sortOrder ?? (await nextPortfolioSortOrder());
  const project = await getPrisma().portfolioProject.create({
    data: {
      imageUrl: input.imageUrl,
      imageAlt: input.imageAlt,
      category: input.category,
      sortOrder,
      featuredOnHome: input.featuredOnHome ?? false,
      published: input.published ?? true,
    },
    select: {
      id: true,
      imageUrl: true,
      imageAlt: true,
      category: true,
    },
  });

  await invalidatePortfolioCache();
  return toPortfolioProjectDto(project);
}

/** Update a portfolio project by id (admin). */
export async function updatePortfolioProject(
  id: string,
  input: Partial<CreatePortfolioProjectInput>,
): Promise<PortfolioProjectDto> {
  const existing = await getPrisma().portfolioProject.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("Portfolio project not found");
  }

  const project = await getPrisma().portfolioProject.update({
    where: { id },
    data: {
      ...(input.imageUrl !== undefined ? { imageUrl: input.imageUrl } : {}),
      ...(input.imageAlt !== undefined ? { imageAlt: input.imageAlt } : {}),
      ...(input.category !== undefined ? { category: input.category } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
      ...(input.featuredOnHome !== undefined
        ? { featuredOnHome: input.featuredOnHome }
        : {}),
      ...(input.published !== undefined ? { published: input.published } : {}),
    },
    select: {
      id: true,
      imageUrl: true,
      imageAlt: true,
      category: true,
    },
  });

  await invalidatePortfolioCache();
  return toPortfolioProjectDto(project);
}
