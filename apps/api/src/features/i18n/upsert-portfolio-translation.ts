import type { UpsertPortfolioTranslationInput } from "@/features/i18n/cms-translation.schema";
import { invalidatePortfolioCache } from "@/features/portfolio/list-portfolio-projects";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";
import { DEFAULT_LOCALE } from "@estate/db";

/** Upsert localized portfolio fields (admin). */
export async function upsertPortfolioTranslation(
  projectId: string,
  input: UpsertPortfolioTranslationInput,
) {
  if (input.locale === DEFAULT_LOCALE) {
    throw ApiError.badRequest(
      "Use portfolio PATCH for default locale content",
      "VALIDATION_ERROR",
      [{ path: "locale", message: "Cannot upsert default locale translation" }],
    );
  }

  const project = await getPrisma().portfolioProject.findUnique({
    where: { id: projectId },
    select: { id: true },
  });

  if (!project) {
    throw ApiError.notFound("Portfolio project not found");
  }

  const result = await getPrisma().portfolioProjectTranslation.upsert({
    where: {
      projectId_locale: {
        projectId,
        locale: input.locale,
      },
    },
    create: {
      projectId,
      locale: input.locale,
      imageAlt: input.imageAlt ?? null,
      category: input.category ?? null,
    },
    update: {
      imageAlt: input.imageAlt ?? null,
      category: input.category ?? null,
    },
    select: {
      id: true,
      projectId: true,
      locale: true,
      imageAlt: true,
      category: true,
      updatedAt: true,
    },
  });

  await invalidatePortfolioCache();
  return result;
}
