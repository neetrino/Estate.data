"use client";

import { useState } from "react";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { MediaLightbox } from "@/shared/components/media/MediaLightbox";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

type StudioPortfolioProps = {
  readonly projects: readonly RecentWorkProject[];
};

export function StudioPortfolio({ projects }: StudioPortfolioProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const images = projects.map((project) => project.imageSrc);
  const copy = STUDIO_PAGE_COPY.portfolio;

  return (
    <section id={HOME_SECTION_IDS.portfolio} className={STUDIO_LIGHT_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h2 className={STUDIO_TITLE_CLASS}>{copy.title}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, projectIndex) => (
            <li key={project.id}>
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
            </li>
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
