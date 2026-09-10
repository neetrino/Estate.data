"use client";

import type { PortfolioFilter } from "@/features/home/content/studioPortfolioFilters";

const FILTER_BASE_CLASS =
  "border px-4 py-2 text-[0.68rem] uppercase tracking-[0.18em] transition-colors";

const FILTER_ACTIVE_CLASS = "border-studio-accent bg-studio-accent text-studio-accent-fg";

const FILTER_IDLE_CLASS =
  "border-studio-border text-studio-muted hover:border-studio-fg/40 hover:text-studio-fg";

type StudioPortfolioFiltersProps = {
  readonly filters: readonly PortfolioFilter[];
  readonly active: PortfolioFilter;
  readonly ariaLabel: string;
  readonly onChange: (filter: PortfolioFilter) => void;
};

export function StudioPortfolioFilters({
  filters,
  active,
  ariaLabel,
  onChange,
}: StudioPortfolioFiltersProps) {
  return (
    <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label={ariaLabel}>
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={active === filter}
          onClick={() => onChange(filter)}
          className={`${FILTER_BASE_CLASS} ${active === filter ? FILTER_ACTIVE_CLASS : FILTER_IDLE_CLASS}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
