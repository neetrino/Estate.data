import { HERO_DASHBOARD_COPY } from "@/features/home/content/heroDashboardCopy";
import { DashboardChart } from "@/features/home/landing/components/hero/dashboard/DashboardChart";
import { BottomStatsRow } from "@/features/home/landing/components/hero/dashboard/BottomStatsRow";
import { DonutMetricCard } from "@/features/home/landing/components/hero/dashboard/DonutMetricCard";
import { KpiCard } from "@/features/home/landing/components/hero/dashboard/KpiCard";
import { SparklineCard } from "@/features/home/landing/components/hero/dashboard/SparklineCard";
import {
  HERO_DASHBOARD_BOTTOM_CLASS,
  HERO_DASHBOARD_GLOW_CLASS,
  HERO_DASHBOARD_INNER_CLASS,
  HERO_DASHBOARD_KPI_GRID_CLASS,
  HERO_DASHBOARD_CHART_COLUMN_CLASS,
  HERO_DASHBOARD_MIDDLE_CLASS,
  HERO_DASHBOARD_MINI_COLUMN_CLASS,
  HERO_DASHBOARD_PANEL_CLASS,
  HERO_DASHBOARD_ROOT_CLASS,
} from "@/features/home/landing/lib/heroDashboardStyles";

export function HeroDashboard() {
  return (
    <div className={HERO_DASHBOARD_ROOT_CLASS}>
      <div className={HERO_DASHBOARD_GLOW_CLASS} aria-hidden />

      <div
        className={HERO_DASHBOARD_PANEL_CLASS}
        role="region"
        aria-label="Property media and data analytics preview"
      >
        <div className={HERO_DASHBOARD_INNER_CLASS}>
          <section aria-label="Key performance indicators">
            <ul className={HERO_DASHBOARD_KPI_GRID_CLASS}>
              {HERO_DASHBOARD_COPY.topMetrics.map((metric) => (
                <li key={metric.id} className="min-w-0">
                  <KpiCard metric={metric} />
                </li>
              ))}
            </ul>
          </section>

          <section className={HERO_DASHBOARD_MIDDLE_CLASS} aria-label="Analytics overview">
            <div className={HERO_DASHBOARD_CHART_COLUMN_CLASS}>
              <DashboardChart />
            </div>
            <div className={HERO_DASHBOARD_MINI_COLUMN_CLASS}>
              <DonutMetricCard />
              <SparklineCard />
            </div>
          </section>

          <section className={HERO_DASHBOARD_BOTTOM_CLASS} aria-label="Summary statistics">
            <BottomStatsRow />
          </section>
        </div>
      </div>
    </div>
  );
}
