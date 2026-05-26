import "@/features/home/styles/home-stats-kpi-card.css";

import type { HomeStat } from "@/features/home/content/homeStatsCopy";
import { HomeStatsKpiIcon } from "@/features/home/components/HomeStatsKpiIcons";

type HomeStatsKpiCardProps = {
  stat: HomeStat;
  displayValue: string;
  ariaValue: string;
};

export function HomeStatsKpiCard({ stat, displayValue, ariaValue }: HomeStatsKpiCardProps) {
  const accentClass = `home-stats-kpi-card--${stat.accent}`;

  return (
    <article className={["home-stats-kpi-card", accentClass].join(" ")}>
      <div className="home-stats-kpi-card__decor" aria-hidden>
        <span className="home-stats-kpi-card__blob home-stats-kpi-card__blob--primary" />
        <span className="home-stats-kpi-card__blob home-stats-kpi-card__blob--secondary" />
      </div>

      <div className="home-stats-kpi-card__body">
        <span className="home-stats-kpi-card__badge">
          <HomeStatsKpiIcon variant={stat.icon} className="home-stats-kpi-card__badge-icon" />
        </span>

        <p
          className="home-stats-kpi-card__metric tabular-nums"
          aria-label={`${ariaValue} ${stat.label}`}
        >
          {displayValue}
        </p>
        <p className="home-stats-kpi-card__label">{stat.label}</p>

        <div className="home-stats-kpi-card__footer-wrap">
          <hr className="home-stats-kpi-card__divider" />
          <p className="home-stats-kpi-card__footer">
            <HomeStatsKpiIcon
              variant={stat.footerIcon}
              className="home-stats-kpi-card__footer-icon"
            />
            <span>{stat.footerText}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
