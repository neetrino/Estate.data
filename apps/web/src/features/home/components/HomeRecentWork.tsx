import { HOME_RECENT_WORK_COPY } from "@/features/home/content/recentWorkCopy";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import {
  HOME_STATS_GRID_GAP_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  SECTION_VERTICAL_PADDING_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const RECENT_WORK_EYEBROW_CLASS =
  "text-xl font-semibold tracking-tight text-what-we-do-subtitle sm:text-2xl";

const RECENT_WORK_TITLE_CLASS =
  "mt-2 text-3xl font-bold tracking-tight text-what-we-do-title sm:text-4xl md:text-5xl lg:text-[3rem]";

export function HomeRecentWork() {
  const { eyebrow, title, viewAllLabel, viewAllHref, projects } =
    HOME_RECENT_WORK_COPY;

  return (
    <section
      className={`bg-what-we-do-surface ${SECTION_VERTICAL_PADDING_CLASS}`}
      aria-labelledby="recent-work-heading"
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <header className="lg:flex lg:items-end lg:justify-between">
          <div>
            <p className={RECENT_WORK_EYEBROW_CLASS}>{eyebrow}</p>
            <h2 id="recent-work-heading" className={RECENT_WORK_TITLE_CLASS}>
              {title}
            </h2>
          </div>
          <div className="hidden shrink-0 lg:block">
            <EstatePillButtonLink href={viewAllHref}>{viewAllLabel}</EstatePillButtonLink>
          </div>
        </header>

        <ul
          className={`mt-12 grid grid-cols-1 ${HOME_STATS_GRID_GAP_CLASS} sm:grid-cols-2`}
        >
          {projects.map((project) => (
            <li key={project.id}>
              <RecentWorkProjectTile project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center lg:hidden">
          <EstatePillButtonLink href={viewAllHref}>{viewAllLabel}</EstatePillButtonLink>
        </div>
      </div>
    </section>
  );
}
