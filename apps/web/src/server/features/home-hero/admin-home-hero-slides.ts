import { getPrisma } from "@/server/lib/db";
import type {
  CreateHomeHeroSlideInput,
  UpdateHomeHeroSlideInput,
} from "@/server/features/home-hero/home-hero-slide.schema";
import { ApiError } from "@/server/lib/api-error";

export async function listAdminHomeHeroSlides() {
  return getPrisma().homeHeroSlide.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function createHomeHeroSlide(input: CreateHomeHeroSlideInput) {
  const prisma = getPrisma();
  const slideData = {
    imageUrl: input.imageUrl,
    thumbUrl: input.thumbUrl,
    imageKey: input.imageKey ?? null,
    mobileImageUrl: input.mobileImageUrl ?? null,
    mobileImageKey: input.mobileImageKey ?? null,
    alt: input.alt,
    title: input.title?.trim() ? input.title : null,
    description: input.description?.trim() ? input.description : null,
    published: input.published ?? true,
  };

  if (input.sortOrder !== undefined) {
    return prisma.homeHeroSlide.create({
      data: { ...slideData, sortOrder: input.sortOrder },
    });
  }

  return prisma.$transaction(async (tx) => {
    await tx.homeHeroSlide.updateMany({ data: { sortOrder: { increment: 1 } } });
    return tx.homeHeroSlide.create({ data: { ...slideData, sortOrder: 0 } });
  });
}

export async function updateHomeHeroSlide(id: string, input: UpdateHomeHeroSlideInput) {
  try {
    return await getPrisma().homeHeroSlide.update({
      where: { id },
      data: input,
    });
  } catch {
    throw ApiError.notFound("Hero slide not found");
  }
}

export async function deleteHomeHeroSlide(id: string) {
  try {
    await getPrisma().homeHeroSlide.delete({ where: { id } });
    return { deleted: true };
  } catch {
    throw ApiError.notFound("Hero slide not found");
  }
}
