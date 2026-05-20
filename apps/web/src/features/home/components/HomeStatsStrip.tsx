import { HOME_STATS_COPY } from "@/features/home/content/homeStatsCopy";
import {
  HOME_STATS_GRID_GAP_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";

export function HomeStatsStrip() {
  const { stats } = HOME_STATS_COPY;

  return (
    <section className="bg-white" aria-label="Key metrics">
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS} py-14`}>
        <ul
          className={`flex w-full flex-col ${HOME_STATS_GRID_GAP_CLASS} md:flex-row md:items-start`}
        >
          {stats.map((stat) => (
            <li key={stat.id} className="flex-1 text-center">
              <div className="text-3xl font-semibold tracking-tight text-what-we-do-title md:text-4xl">
                {stat.value}
              </div>
              <p className="mt-1 text-sm text-what-we-do-subtitle">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
