"use client";

import { RecentWorkProjectTile } from "@/features/home/components/RecentWorkProjectTile";
import { HOME_RECENT_WORK_COPY } from "@/features/home/content/recentWorkCopy";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import {
  HOME_MOBILE_PILL_BUTTON_CLASS,
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_MUTED_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import {
  HOME_STATS_GRID_GAP_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const RECENT_WORK_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.18em] text-what-we-do-title";

const RECENT_WORK_TITLE_CLASS =
  "hero-headline-gradient mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.5rem] md:leading-tight";

const RECENT_WORK_GRID_CLASS = [
  "home-recent-work-grid--ipad-two mt-10 grid grid-cols-1",
  HOME_STATS_GRID_GAP_CLASS,
  "sm:grid-cols-2 lg:grid-cols-3",
].join(" ");

const VIEW_ALL_BUTTON_CLASS = [
  LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS,
  LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS,
].join(" ");

type HomeRecentWorkProps = {
  projects: readonly RecentWorkProject[];
};

export function HomeRecentWork({ projects }: HomeRecentWorkProps) {
  const { eyebrow, title, viewAllLabel, viewAllHref } = HOME_RECENT_WORK_COPY;

  return (
    <section className={LANDING_SECTION_MUTED_CLASS} aria-labelledby="recent-work-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <header className="lg:flex lg:items-end lg:justify-between">
          <div>
            <p className={RECENT_WORK_EYEBROW_CLASS}>{eyebrow}</p>
            <h2 id="recent-work-heading" className={RECENT_WORK_TITLE_CLASS}>
              {title}
            </h2>
          </div>
          <div className="mt-6 hidden shrink-0 lg:mt-0 lg:block">
            <EstatePillButtonLink href={viewAllHref} className={VIEW_ALL_BUTTON_CLASS}>
              {viewAllLabel}
            </EstatePillButtonLink>
          </div>
        </header>

        <ul className={RECENT_WORK_GRID_CLASS}>
          {projects.map((project) => (
            <li key={project.id}>
              <RecentWorkProjectTile project={project} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center lg:hidden">
          <EstatePillButtonLink
            href={viewAllHref}
            fullWidth
            className={[HOME_MOBILE_PILL_BUTTON_CLASS, VIEW_ALL_BUTTON_CLASS].join(" ")}
          >
            {viewAllLabel}
          </EstatePillButtonLink>
        </div>
      </div>
    </section>
  );
}
