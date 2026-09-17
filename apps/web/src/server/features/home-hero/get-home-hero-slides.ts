import { resolveHeroSlideCopy } from "@/server/features/home-hero/resolve-hero-slide-copy";
import { getHomeHero } from "@/server/features/home-hero/get-home-hero";
import type { StudioHeroSlide } from "@/features/home/sections/StudioHeroSection";
import { DEFAULT_HERO_SLIDES } from "@/features/home/content/studioPageCopy";
import { getDefaultHomeHeroContent } from "@/features/home/content/heroCopy";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";
import { getPrisma } from "@/server/lib/db";
import { logger } from "@/server/lib/logger";

function defaultSlides(): StudioHeroSlide[] {
  const hero = getDefaultHomeHeroContent();
  return DEFAULT_HERO_SLIDES.map((slide) => ({
    ...slide,
    title: hero.title,
    description: hero.description,
  }));
}

/** Published hero slides, falling back to static carousel images. */
export async function getHomeHeroSlides(): Promise<StudioHeroSlide[]> {
  try {
    const [hero, rows] = await Promise.all([
      getHomeHero(),
      getPrisma().homeHeroSlide.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          imageUrl: true,
          thumbUrl: true,
          mobileImageUrl: true,
          alt: true,
          title: true,
          description: true,
        },
      }),
    ]);

    if (rows.length === 0) {
      return defaultSlides().map((slide) => {
        const copy = resolveHeroSlideCopy(slide, hero);
        return { ...slide, ...copy };
      });
    }

    return rows.map((row) => {
      const copy = resolveHeroSlideCopy(row, hero);
      const imageUrl = normalizePublicAssetUrl(row.imageUrl);
      return {
        id: row.id,
        imageUrl,
        mobileImageUrl: normalizePublicAssetUrl(row.mobileImageUrl ?? row.imageUrl),
        thumbUrl: normalizePublicAssetUrl(row.thumbUrl),
        alt: row.alt,
        title: copy.title,
        description: copy.description,
      };
    });
  } catch (error) {
    logger.warn("home_hero_slides.read.fallback_default", {
      reason: error instanceof Error ? error.message : "unknown",
    });
    return defaultSlides();
  }
}
