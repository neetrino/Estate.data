import {
  HOME_HERO_KEY,
  type HomeHeroContent,
  type UpdateHomeHeroInput,
} from "@/server/features/home-hero/home-hero.schema";
import { getPrisma } from "@/server/lib/db";

/** Upsert singleton home hero (admin). */
export async function updateHomeHero(input: UpdateHomeHeroInput): Promise<HomeHeroContent> {
  const row = await getPrisma().homeHero.upsert({
    where: { key: HOME_HERO_KEY },
    create: {
      key: HOME_HERO_KEY,
      title: input.title,
      description: input.description,
      primaryButtonLabel: input.primaryButtonLabel,
      primaryButtonHref: input.primaryButtonHref,
      secondaryButtonLabel: input.secondaryButtonLabel,
      secondaryButtonHref: input.secondaryButtonHref,
      desktopImageUrl: input.desktopImageUrl ?? null,
      desktopImageKey: input.desktopImageKey ?? null,
      mobileImageUrl: input.mobileImageUrl ?? null,
      mobileImageKey: input.mobileImageKey ?? null,
    },
    update: {
      title: input.title,
      description: input.description,
      primaryButtonLabel: input.primaryButtonLabel,
      primaryButtonHref: input.primaryButtonHref,
      secondaryButtonLabel: input.secondaryButtonLabel,
      secondaryButtonHref: input.secondaryButtonHref,
      desktopImageUrl: input.desktopImageUrl ?? null,
      desktopImageKey: input.desktopImageKey ?? null,
      mobileImageUrl: input.mobileImageUrl ?? null,
      mobileImageKey: input.mobileImageKey ?? null,
    },
    select: {
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
    },
  });

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
