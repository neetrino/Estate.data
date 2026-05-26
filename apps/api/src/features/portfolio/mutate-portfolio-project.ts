import { invalidatePortfolioCache } from "@/features/portfolio/list-portfolio-projects";
import type {
  CreatePortfolioProjectInput,
  PortfolioProjectDto,
} from "@/features/portfolio/portfolio.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";

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

/** Create a portfolio project (admin). */
export async function createPortfolioProject(
  input: CreatePortfolioProjectInput,
): Promise<PortfolioProjectDto> {
  const project = await getPrisma().portfolioProject.create({
    data: {
      imageUrl: input.imageUrl,
      imageAlt: input.imageAlt,
      category: input.category,
      sortOrder: input.sortOrder ?? 0,
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
