"use client";

import { useState } from "react";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import {
  filterPortfolioCards,
  PORTFOLIO_FILTER_ALL,
  PORTFOLIO_FILTERS,
  type PortfolioFilter,
} from "@/features/home/content/studioPortfolioFilters";
import { mergeStudioPortfolioProjects } from "@/features/home/lib/mergeStudioPortfolioProjects";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioPortfolioFilters } from "@/features/home/sections/StudioPortfolioFilters";
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
  const [filter, setFilter] = useState<PortfolioFilter>(PORTFOLIO_FILTER_ALL);
  const cards = mergeStudioPortfolioProjects(projects);
  const visible = filterPortfolioCards(cards, filter);
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
          <StudioCta href={`/#${HOME_SECTION_IDS.quote}`} variant="outline">
            {copy.cta}
          </StudioCta>
        </StudioReveal>
        <StudioPortfolioFilters
          filters={PORTFOLIO_FILTERS}
          active={filter}
          ariaLabel={copy.filtersAriaLabel}
          onChange={setFilter}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, projectIndex) => (
            <StudioReveal
              key={project.id}
              as="article"
              delay={projectIndex * TILE_DELAY_STEP_MS}
              className="group"
            >
              <RecentWorkProjectTile project={project} />
            </StudioReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
