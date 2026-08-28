"use client";

import { useState } from "react";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { StudioReelDialog } from "@/features/home/sections/StudioReelDialog";
import { StudioWhatWeDoReel } from "@/features/home/sections/StudioWhatWeDoReel";
import {
  STUDIO_BODY_CLASS,
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
  STUDIO_PRIMARY_BUTTON_CLASS,
  STUDIO_SECONDARY_BUTTON_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";

export function StudioWhatWeDo() {
  const copy = STUDIO_PAGE_COPY.whatWeDo;
  const [reelOpen, setReelOpen] = useState(false);

  return (
    <section
      id={HOME_SECTION_IDS.whatWeDo}
      className={STUDIO_LIGHT_SECTION_CLASS}
      aria-labelledby="what-we-do-heading"
    >
      <div className={`${STUDIO_CONTAINER_CLASS} grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)] lg:gap-12`}>
        <div>
          <p className="studio-label text-studio-accent">{copy.eyebrow}</p>
          <h2 id="what-we-do-heading" className={`${STUDIO_TITLE_CLASS} max-w-[14ch]`}>
            {copy.title}
          </h2>
          <p className={STUDIO_BODY_CLASS}>{copy.body}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <HomeSectionLink
              href={`/#${HOME_SECTION_IDS.contact}`}
              className={STUDIO_PRIMARY_BUTTON_CLASS}
            >
              {copy.primaryCta}
              <span aria-hidden>→</span>
            </HomeSectionLink>
            <HomeSectionLink
              href={`/#${HOME_SECTION_IDS.photography}`}
              className={STUDIO_SECONDARY_BUTTON_CLASS}
            >
              {copy.secondaryCta}
            </HomeSectionLink>
          </div>
        </div>
        <StudioWhatWeDoReel label={copy.reelLabel} onOpen={() => setReelOpen(true)} />
      </div>
      {reelOpen ? <StudioReelDialog onClose={() => setReelOpen(false)} /> : null}
    </section>
  );
}
