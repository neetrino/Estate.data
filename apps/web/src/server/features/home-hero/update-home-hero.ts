import {
  HOME_HERO_KEY,
  parseHomeHeroCopyMode,
  type HomeHeroContent,
  type UpdateHomeHeroInput,
} from "@/server/features/home-hero/home-hero.schema";
import { getPrisma } from "@/server/lib/db";

/** Upsert singleton home hero (admin). */
export async function updateHomeHero(input: UpdateHomeHeroInput): Promise<HomeHeroContent> {
  const copyMode = input.copyMode ?? "shared";
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
      eyebrow: input.eyebrow,
      copyMode,
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
      eyebrow: input.eyebrow,
      copyMode,
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
      eyebrow: true,
      copyMode: true,
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
    eyebrow: row.eyebrow,
    copyMode: parseHomeHeroCopyMode(row.copyMode),
    desktopImageUrl: row.desktopImageUrl,
    desktopImageKey: row.desktopImageKey,
    mobileImageUrl: row.mobileImageUrl,
    mobileImageKey: row.mobileImageKey,
  };
}
