import { HOME_RECENT_WORK_COPY } from "@/features/home/content/recentWorkCopy";
import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import {
  HOME_MOBILE_PILL_BUTTON_CLASS,
  LANDING_CONTAINER_CLASS,
  LANDING_EYEBROW_CLASS,
  LANDING_SECTION_MUTED_CLASS,
  LANDING_SECTION_TITLE_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import { HOME_STATS_GRID_GAP_CLASS } from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

export function HomeRecentWork() {
  const { eyebrow, title, viewAllLabel, viewAllHref, projects } = HOME_RECENT_WORK_COPY;

  return (
    <section className={LANDING_SECTION_MUTED_CLASS} aria-labelledby="recent-work-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <header className="lg:flex lg:items-end lg:justify-between">
          <div>
            <p className={LANDING_EYEBROW_CLASS}>{eyebrow}</p>
            <h2 id="recent-work-heading" className={`mt-3 ${LANDING_SECTION_TITLE_CLASS}`}>
              {title}
            </h2>
          </div>
          <div className="mt-6 hidden shrink-0 lg:mt-0 lg:block">
            <EstatePillButtonLink href={viewAllHref}>{viewAllLabel}</EstatePillButtonLink>
          </div>
        </header>

        <ul className={`mt-10 grid grid-cols-1 ${HOME_STATS_GRID_GAP_CLASS} sm:grid-cols-2`}>
          {projects.map((project) => (
            <li key={project.id}>
              <RecentWorkProjectTile project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center lg:hidden">
          <EstatePillButtonLink href={viewAllHref} fullWidth className={HOME_MOBILE_PILL_BUTTON_CLASS}>
            {viewAllLabel}
          </EstatePillButtonLink>
        </div>
      </div>
    </section>
  );
}
