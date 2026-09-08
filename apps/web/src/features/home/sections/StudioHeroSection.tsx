"use client";

import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import type { HomeHeroContentFields } from "@/features/home/content/heroCopy";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import {
  HOME_SECTION_IDS,
  HOME_SECTION_SCROLL_MARGIN_CLASS,
} from "@/shared/lib/homeSectionIds";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_HERO_PRIMARY_BUTTON_CLASS,
  STUDIO_HERO_SECONDARY_BUTTON_CLASS,
} from "@/features/home/sections/studioSectionStyles";

export type StudioHeroSlide = {
  readonly id: string;
  readonly imageUrl: string;
  readonly thumbUrl: string;
  readonly alt: string;
};

type StudioHeroSectionProps = {
  readonly hero: HomeHeroContentFields;
  readonly slides: readonly StudioHeroSlide[];
};

export function StudioHeroSection({ hero, slides }: StudioHeroSectionProps) {
  const activeSlide = slides[0];
  const copy = STUDIO_PAGE_COPY.hero;

  if (!activeSlide) {
    return null;
  }

  return (
    <section
      id={HOME_SECTION_IDS.hero}
      className={`la-hero relative flex min-h-svh items-end overflow-hidden ${HOME_SECTION_SCROLL_MARGIN_CLASS}`}
    >
      <div className="absolute inset-0">
        <PublicAssetImage
          src={activeSlide.imageUrl}
          alt={activeSlide.alt}
          fill
          priority
          className="studio-kenburns object-cover"
          sizes="100vw"
        />
        <div className="studio-veil absolute inset-0" />
        <div className="absolute inset-0 bg-studio-bg/25" />
      </div>

      <div className={`${STUDIO_CONTAINER_CLASS} relative z-10 pt-32 pb-24 md:pb-28`}>
        <p className="studio-label mb-8 text-studio-accent">{copy.eyebrow}</p>
        <h1 className="studio-display-hero max-w-[16ch] text-studio-fg">
          {copy.titleLines[0]}
          <br />
          <span className="text-studio-accent">{copy.titleAccentWord}</span>{" "}
          {copy.titleTrailing}
        </h1>
        <p className="studio-body-lg mt-8 max-w-[60ch] text-studio-fg/75">{hero.description}</p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <HomeSectionLink
            href={hero.primaryButtonHref}
            className={STUDIO_HERO_PRIMARY_BUTTON_CLASS}
          >
            {hero.primaryButtonLabel}
          </HomeSectionLink>
          <HomeSectionLink
            href={hero.secondaryButtonHref}
            className={`${STUDIO_HERO_SECONDARY_BUTTON_CLASS} backdrop-blur-sm`}
          >
            {hero.secondaryButtonLabel}
          </HomeSectionLink>
        </div>
        <div className="mt-16 flex items-center gap-4 text-studio-muted">
          <span aria-hidden className="studio-scrollcue block h-8 w-px bg-studio-accent" />
          <span className="studio-label">{copy.scrollLabel}</span>
        </div>
      </div>
    </section>
  );
}
