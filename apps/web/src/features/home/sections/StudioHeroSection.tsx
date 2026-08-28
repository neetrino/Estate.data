"use client";

import Image from "next/image";
import type { HomeHeroContentFields } from "@/features/home/content/heroCopy";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import {
  HOME_SECTION_IDS,
  HOME_SECTION_SCROLL_MARGIN_CLASS,
} from "@/shared/lib/homeSectionIds";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_PRIMARY_BUTTON_CLASS,
  STUDIO_SECONDARY_BUTTON_CLASS,
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
      className={`la-hero relative isolate min-h-svh overflow-hidden ${HOME_SECTION_SCROLL_MARGIN_CLASS}`}
    >
      <Image
        src={activeSlide.imageUrl}
        alt={activeSlide.alt}
        fill
        priority
        className="studio-kenburns object-cover"
        sizes="100vw"
      />
      <div className="studio-veil absolute inset-0" />

      <div
        className={`${STUDIO_CONTAINER_CLASS} relative z-10 flex min-h-svh flex-col justify-end pb-16 pt-32`}
      >
        <p className="studio-label text-studio-fg/80">{copy.eyebrow}</p>
        <h1 className="studio-display-hero mt-6 max-w-[16ch] text-studio-fg">
          {copy.titleLines[0]}
          <br />
          {copy.titleLines[1]}
        </h1>
        <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-studio-fg/80 md:text-lg">
          {hero.description}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <HomeSectionLink href={hero.primaryButtonHref} className={STUDIO_PRIMARY_BUTTON_CLASS}>
            {hero.primaryButtonLabel}
            <span aria-hidden>→</span>
          </HomeSectionLink>
          <HomeSectionLink href={hero.secondaryButtonHref} className={STUDIO_SECONDARY_BUTTON_CLASS}>
            {hero.secondaryButtonLabel}
          </HomeSectionLink>
        </div>
        <p className="studio-label mt-14 text-studio-fg/50">{copy.scrollLabel}</p>
      </div>
    </section>
  );
}
