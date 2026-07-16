import {
  HOME_HERO_KEY,
  type HomeHeroContent,
} from "@/server/features/home-hero/home-hero.schema";
import {
  getDefaultHomeHeroContent,
  resolveHomeHeroImageUrls,
  type HomeHeroContentFields,
} from "@/features/home/content/heroCopy";
import { getPrisma } from "@/server/lib/db";
import { logger } from "@/server/lib/logger";

type HomeHeroRow = {
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
  desktopImageUrl: string | null;
  desktopImageKey: string | null;
  mobileImageUrl: string | null;
  mobileImageKey: string | null;
};

const HOME_HERO_SELECT = {
  title: true,
  description: true,
  primaryButtonLabel: true,
  primaryButtonHref: true,
  secondaryButtonLabel: true,
  secondaryButtonHref: true,
  desktopImageUrl: true,
  desktopImageKey: true,
  mobileImageUrl: true,
  mobileImageKey: true,
} as const;

function mapRowToContent(row: HomeHeroRow): HomeHeroContent {
  return {
    title: row.title,
    description: row.description,
    primaryButtonLabel: row.primaryButtonLabel,
    primaryButtonHref: row.primaryButtonHref,
    secondaryButtonLabel: row.secondaryButtonLabel,
    secondaryButtonHref: row.secondaryButtonHref,
    desktopImageUrl: row.desktopImageUrl,
    desktopImageKey: row.desktopImageKey,
    mobileImageUrl: row.mobileImageUrl,
    mobileImageKey: row.mobileImageKey,
  };
}

/** Read singleton home hero — falls back to static defaults when missing. */
export async function getHomeHero(): Promise<HomeHeroContent> {
  try {
    const row = await getPrisma().homeHero.findUnique({
      where: { key: HOME_HERO_KEY },
      select: HOME_HERO_SELECT,
    });

    if (!row) {
      return getDefaultHomeHeroContent();
    }

    return mapRowToContent(row);
  } catch (error) {
    logger.warn("home_hero.read.fallback_default", {
      reason: error instanceof Error ? error.message : "Unknown home hero read failure",
    });
    return getDefaultHomeHeroContent();
  }
}

/** Home hero with resolved image URLs for the storefront. */
export async function getHomeHeroForPage(): Promise<HomeHeroContentFields> {
  const hero = await getHomeHero();
  const images = resolveHomeHeroImageUrls({
    desktopImageUrl: hero.desktopImageUrl,
    mobileImageUrl: hero.mobileImageUrl,
  });

  return {
    title: hero.title,
    description: hero.description,
    primaryButtonLabel: hero.primaryButtonLabel,
    primaryButtonHref: hero.primaryButtonHref,
    secondaryButtonLabel: hero.secondaryButtonLabel,
    secondaryButtonHref: hero.secondaryButtonHref,
    desktopImageUrl: images.desktopImageUrl,
    mobileImageUrl: images.mobileImageUrl,
  };
}
