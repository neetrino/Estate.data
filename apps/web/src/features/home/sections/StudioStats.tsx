import { StudioReveal } from "@/features/home/sections/StudioReveal";
import type { StatsCopy } from "@/server/features/site-copy/site-copy.schema";

const GRID_CLASS = "grid gap-px bg-studio-border sm:grid-cols-2 lg:grid-cols-5";

const CELL_CLASS =
  "bg-studio-bg px-6 py-10 text-center transition-colors hover:bg-studio-card";

type StudioStatsProps = {
  readonly items: StatsCopy["items"];
};

/** KPI cells under the studio intro. */
export function StudioStats({ items }: StudioStatsProps) {
  return (
    <StudioReveal className="mt-20">
      <div className={GRID_CLASS}>
        {items.map((stat) => (
          <div key={stat.label} className={CELL_CLASS}>
            <p className="studio-display-md text-studio-accent">{stat.value}</p>
            <p className="studio-label mt-3 text-studio-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </StudioReveal>
  );
}
