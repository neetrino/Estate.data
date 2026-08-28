import type { StudioHeroSlide } from "@/features/home/sections/StudioHeroSection";
import { DEFAULT_HERO_SLIDES } from "@/features/home/content/studioPageCopy";
import { getPrisma } from "@/server/lib/db";
import { logger } from "@/server/lib/logger";

/** Published hero slides, falling back to static carousel images. */
export async function getHomeHeroSlides(): Promise<StudioHeroSlide[]> {
  try {
    const rows = await getPrisma().homeHeroSlide.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: {
        id: true,
        imageUrl: true,
        thumbUrl: true,
        alt: true,
      },
    });
    if (rows.length === 0) {
      return [...DEFAULT_HERO_SLIDES];
    }
    return rows;
  } catch (error) {
    logger.warn("home_hero_slides.read.fallback_default", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return [...DEFAULT_HERO_SLIDES];
  }
}
