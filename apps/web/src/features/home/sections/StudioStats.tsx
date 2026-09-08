import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { StudioReveal } from "@/features/home/sections/StudioReveal";

const GRID_CLASS = "grid gap-px bg-studio-border sm:grid-cols-2 lg:grid-cols-5";

const CELL_CLASS =
  "bg-studio-bg px-6 py-10 text-center transition-colors hover:bg-studio-card";

/** Five KPI cells rendered as a hairline grid under the studio intro. */
export function StudioStats() {
  return (
    <StudioReveal className="mt-20">
      <div className={GRID_CLASS}>
        {STUDIO_PAGE_COPY.stats.map((stat) => (
          <div key={stat.label} className={CELL_CLASS}>
            <p className="studio-display-md text-studio-accent">{stat.value}</p>
            <p className="studio-label mt-3 text-studio-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </StudioReveal>
  );
}
