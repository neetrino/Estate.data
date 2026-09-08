"use client";

import { useState } from "react";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { MediaLightbox } from "@/shared/components/media/MediaLightbox";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const TILE_DELAY_STEP_MS = 60;

type StudioPortfolioProps = {
  readonly projects: readonly RecentWorkProject[];
};

export function StudioPortfolio({ projects }: StudioPortfolioProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images = projects.map((project) => project.imageSrc);
  const copy = STUDIO_PAGE_COPY.portfolio;

  return (
    <section
      id={HOME_SECTION_IDS.portfolio}
      className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}
    >
      <div className={STUDIO_CONTAINER_CLASS}>
        <StudioReveal className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
            <h2 className="studio-display-lg mt-6 max-w-[16ch] text-studio-fg">{copy.title}</h2>
          </div>
          <StudioCta href={`/#${HOME_SECTION_IDS.contact}`} variant="outline">
            {copy.cta}
          </StudioCta>
        </StudioReveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, projectIndex) => (
            <StudioReveal
              key={project.id}
              as="li"
              delay={projectIndex * TILE_DELAY_STEP_MS}
              className="group"
            >
              <button
                type="button"
                className="w-full cursor-pointer text-left"
                onClick={() => {
                  setIndex(projectIndex);
                  setOpen(true);
                }}
              >
                <RecentWorkProjectTile project={project} />
              </button>
            </StudioReveal>
          ))}
        </ul>
      </div>
      {open && images.length > 0 ? (
        <MediaLightbox
          images={images}
          alt="Selected work"
          activeIndex={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </section>
  );
}
