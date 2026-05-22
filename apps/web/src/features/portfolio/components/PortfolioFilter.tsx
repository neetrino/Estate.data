import {
  PORTFOLIO_PAGE_COPY,
  type PortfolioFilterId,
} from "@/features/portfolio/content/portfolioCopy";

const PORTFOLIO_FILTER_LIST_CLASS = "mt-8 flex flex-wrap gap-2 sm:gap-3";

const PORTFOLIO_FILTER_BUTTON_BASE_CLASS =
  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:px-5 sm:text-base";

const PORTFOLIO_FILTER_BUTTON_ACTIVE_CLASS =
  "border-what-we-do-title bg-what-we-do-title text-white";

const PORTFOLIO_FILTER_BUTTON_INACTIVE_CLASS =
  "border-foreground/15 bg-white text-what-we-do-title hover:border-what-we-do-subtitle/50";

type PortfolioFilterProps = {
  activeId: PortfolioFilterId;
  onFilterChange: (id: PortfolioFilterId) => void;
};

export function PortfolioFilter({ activeId, onFilterChange }: PortfolioFilterProps) {
  const { filters } = PORTFOLIO_PAGE_COPY;

  return (
    <div
      className={PORTFOLIO_FILTER_LIST_CLASS}
      role="tablist"
      aria-label="Filter portfolio by media type"
    >
      {filters.map((filter) => {
        const isActive = activeId === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`${PORTFOLIO_FILTER_BUTTON_BASE_CLASS} ${
              isActive
                ? PORTFOLIO_FILTER_BUTTON_ACTIVE_CLASS
                : PORTFOLIO_FILTER_BUTTON_INACTIVE_CLASS
            }`}
            onClick={() => onFilterChange(filter.id)}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
