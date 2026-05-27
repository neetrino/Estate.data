import {
  PORTFOLIO_PAGE_COPY,
  type PortfolioFilterId,
} from "@/features/portfolio/content/portfolioCopy";
import "@/features/portfolio/styles/portfolio-filter.css";

type PortfolioFilterProps = {
  activeId: PortfolioFilterId;
  onFilterChange: (id: PortfolioFilterId) => void;
};

export function PortfolioFilter({ activeId, onFilterChange }: PortfolioFilterProps) {
  const { filters } = PORTFOLIO_PAGE_COPY;

  return (
    <div className="portfolio-filter-list" aria-label="Filter portfolio by media type">
      {filters.map((filter) => {
        const isActive = activeId === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isActive}
            className={[
              "portfolio-filter-button",
              isActive ? "portfolio-filter-button--active" : "portfolio-filter-button--inactive",
            ].join(" ")}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
