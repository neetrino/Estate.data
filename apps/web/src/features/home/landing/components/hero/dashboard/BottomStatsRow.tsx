import { HERO_DASHBOARD_COPY } from "@/features/home/content/heroDashboardCopy";
import type { HeroDashboardBottomStat } from "@/features/home/content/heroDashboardCopy";
import { dashboardChartStatEnterClass } from "@/features/home/landing/lib/dashboardChartBarStyles";
import "@/features/home/landing/styles/dashboard-chart-enter.css";
import {
  BOTTOM_STATS_ITEM_CLASS,
  BOTTOM_STATS_LABEL_CLASS,
  BOTTOM_STATS_ROW_CARD_CLASS,
  BOTTOM_STATS_ROW_GRID_CLASS,
  BOTTOM_STATS_VALUE_CLASS,
  bottomStatsIconBubbleClass,
} from "@/features/home/landing/lib/bottomStatsRowStyles";

export function BottomStatsRow() {
  return (
    <div className={BOTTOM_STATS_ROW_CARD_CLASS}>
      <ul className={BOTTOM_STATS_ROW_GRID_CLASS} aria-label="Summary statistics">
        {HERO_DASHBOARD_COPY.bottomStats.map((stat, index) => (
          <li
            key={stat.id}
            className={`${BOTTOM_STATS_ITEM_CLASS} ${dashboardChartStatEnterClass(index)}`}
          >
            <BottomStatItem stat={stat} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function BottomStatItem({ stat }: { stat: HeroDashboardBottomStat }) {
  return (
    <>
      <span className={bottomStatsIconBubbleClass(stat.accent)} aria-hidden>
        <BottomStatIcon type={stat.icon} />
      </span>
      <div className="min-w-0">
        <p className={BOTTOM_STATS_LABEL_CLASS}>{stat.label}</p>
        <p className={BOTTOM_STATS_VALUE_CLASS}>{stat.value}</p>
      </div>
    </>
  );
}

function BottomStatIcon({ type }: { type: HeroDashboardBottomStat["icon"] }) {
  const className = "size-4";

  if (type === "eye") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (type === "users") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === "message") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 21h18M6 21V8l6-4 6 4v13M10 11h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
