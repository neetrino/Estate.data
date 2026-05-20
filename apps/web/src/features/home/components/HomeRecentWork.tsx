import { HOME_RECENT_WORK_COPY } from "@/features/home/content/recentWorkCopy";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import {
  HOME_STATS_GRID_GAP_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const RECENT_WORK_EYEBROW_CLASS =
  "text-xl font-semibold tracking-tight text-what-we-do-subtitle sm:text-2xl";

const RECENT_WORK_TITLE_CLASS =
  "mt-2 text-4xl font-bold tracking-tight text-what-we-do-title sm:text-5xl lg:text-[3rem]";

export function HomeRecentWork() {
  const { eyebrow, title, viewAllLabel, viewAllHref, projects } =
    HOME_RECENT_WORK_COPY;

  return (
    <section
      className="bg-what-we-do-surface py-14 sm:py-16 lg:py-20"
      aria-labelledby="recent-work-heading"
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className={RECENT_WORK_EYEBROW_CLASS}>{eyebrow}</p>
            <h2 id="recent-work-heading" className={RECENT_WORK_TITLE_CLASS}>
              {title}
            </h2>
          </div>
          <EstatePillButtonLink
            href={viewAllHref}
            className="shrink-0 self-start sm:self-auto"
          >
            {viewAllLabel}
          </EstatePillButtonLink>
        </div>

        <ul
          className={`mt-12 grid grid-cols-1 ${HOME_STATS_GRID_GAP_CLASS} sm:grid-cols-2`}
        >
          {projects.map((project) => (
            <li key={project.id}>
              <RecentWorkProjectTile project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
