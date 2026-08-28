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
  return getPrisma().homeHeroSlide.create({
    data: {
      imageUrl: input.imageUrl,
      thumbUrl: input.thumbUrl,
      alt: input.alt,
      sortOrder: input.sortOrder ?? 0,
      published: input.published ?? true,
    },
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
