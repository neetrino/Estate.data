"use client";

import { useState } from "react";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { StudioReelDialog } from "@/features/home/sections/StudioReelDialog";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioStats } from "@/features/home/sections/StudioStats";
import { StudioWhatWeDoReel } from "@/features/home/sections/StudioWhatWeDoReel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_HERO_PRIMARY_BUTTON_CLASS,
  STUDIO_HERO_SECONDARY_BUTTON_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";

const REEL_DELAY_MS = 120;

export function StudioWhatWeDo() {
  const copy = STUDIO_PAGE_COPY.whatWeDo;
  const [reelOpen, setReelOpen] = useState(false);

  return (
    <section
      id={HOME_SECTION_IDS.whatWeDo}
      className={`${STUDIO_MUTED_SECTION_CLASS} overflow-hidden`}
      aria-labelledby="what-we-do-heading"
    >
      <div className={STUDIO_CONTAINER_CLASS}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <StudioReveal className="flex flex-col justify-center lg:col-span-5">
            <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
            <h2 id="what-we-do-heading" className="studio-display-lg mt-6 text-studio-fg">
              {copy.titleLines[0]}
              <br />
              {copy.titleLines[1]}
              <br />
              <span className="text-studio-accent">{copy.titleLines[2]}</span>
            </h2>
            <p className="studio-body-lg mt-6 max-w-[48ch]">{copy.body}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <HomeSectionLink
                href={`/#${HOME_SECTION_IDS.quote}`}
                className={STUDIO_HERO_PRIMARY_BUTTON_CLASS}
              >
                {copy.primaryCta}
              </HomeSectionLink>
              <HomeSectionLink
                href={`/#${HOME_SECTION_IDS.photography}`}
                className={STUDIO_HERO_SECONDARY_BUTTON_CLASS}
              >
                {copy.secondaryCta}
              </HomeSectionLink>
            </div>
          </StudioReveal>
          <StudioReveal className="lg:col-span-7" delay={REEL_DELAY_MS}>
            <StudioWhatWeDoReel label={copy.reelLabel} onOpen={() => setReelOpen(true)} />
          </StudioReveal>
        </div>
        <StudioStats />
      </div>
      {reelOpen ? <StudioReelDialog onClose={() => setReelOpen(false)} /> : null}
    </section>
  );
}
