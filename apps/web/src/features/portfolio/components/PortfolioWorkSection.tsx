"use client";

import { useMemo, useState } from "react";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import { PortfolioFilter } from "@/features/portfolio/components/PortfolioFilter";
import {
  PORTFOLIO_PAGE_COPY,
  type PortfolioFilterId,
} from "@/features/portfolio/content/portfolioCopy";
import { HOME_STATS_GRID_GAP_CLASS } from "@/shared/lib/constants";

const PORTFOLIO_GRID_CLASS = `mt-10 grid grid-cols-1 lg:grid-cols-3 ${HOME_STATS_GRID_GAP_CLASS} sm:grid-cols-2`;

function filterPortfolioProjects(activeId: PortfolioFilterId) {
  const { projects } = PORTFOLIO_PAGE_COPY;

  if (activeId === "all") {
    return projects;
  }

  return projects.filter((project) => project.category === activeId);
}

export function PortfolioWorkSection() {
  const [activeFilterId, setActiveFilterId] = useState<PortfolioFilterId>("all");
  const visibleProjects = useMemo(
    () => filterPortfolioProjects(activeFilterId),
    [activeFilterId],
  );

  return (
    <>
      <PortfolioFilter activeId={activeFilterId} onFilterChange={setActiveFilterId} />
      <ul className={PORTFOLIO_GRID_CLASS}>
        {visibleProjects.map((project) => (
          <li key={project.id}>
            <RecentWorkProjectTile project={project} />
          </li>
        ))}
      </ul>
    </>
  );
}
