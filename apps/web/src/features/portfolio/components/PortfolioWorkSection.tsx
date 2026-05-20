"use client";

import { useMemo, useRef, useState } from "react";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import { PortfolioFilter } from "@/features/portfolio/components/PortfolioFilter";
import { PortfolioPagination } from "@/features/portfolio/components/PortfolioPagination";
import {
  PORTFOLIO_PAGE_COPY,
  type PortfolioFilterId,
} from "@/features/portfolio/content/portfolioCopy";
import {
  clampPortfolioPage,
  getPortfolioPageCount,
  shouldShowPortfolioPagination,
  slicePortfolioPage,
} from "@/features/portfolio/lib/portfolioPagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLUListElement>(null);

  const filteredProjects = useMemo(
    () => filterPortfolioProjects(activeFilterId),
    [activeFilterId],
  );

  const totalPages = getPortfolioPageCount(filteredProjects.length);
  const safePage = clampPortfolioPage(currentPage, totalPages);

  const paginatedProjects = useMemo(
    () => slicePortfolioPage(filteredProjects, safePage),
    [filteredProjects, safePage],
  );

  const handleFilterChange = (id: PortfolioFilterId) => {
    setActiveFilterId(id);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PortfolioFilter activeId={activeFilterId} onFilterChange={handleFilterChange} />
      <ul ref={gridRef} className={PORTFOLIO_GRID_CLASS}>
        {paginatedProjects.map((project) => (
          <li key={project.id}>
            <RecentWorkProjectTile project={project} />
          </li>
        ))}
      </ul>
      {shouldShowPortfolioPagination(filteredProjects.length) ? (
        <PortfolioPagination
          currentPage={safePage}
          totalItems={filteredProjects.length}
          onPageChange={handlePageChange}
        />
      ) : null}
    </>
  );
}
