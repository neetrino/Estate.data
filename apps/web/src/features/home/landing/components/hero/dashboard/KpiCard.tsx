import Image from "next/image";
import type { HeroDashboardMetric } from "@/features/home/content/heroDashboardCopy";
import {
  HERO_KPI_ICON_PATHS,
  HERO_KPI_ICON_SIZE_PX,
} from "@/features/home/landing/lib/heroKpiIcons";
import {
  KPI_CARD_FOOTER_CLASS,
  KPI_CARD_LABEL_CLASS,
  KPI_CARD_SURFACE_CLASS,
  KPI_CARD_TOP_ROW_CLASS,
  KPI_CARD_VALUE_CLASS,
  kpiCardBadgeClass,
  kpiCardIconGlowClass,
  kpiCardIconImageClass,
} from "@/features/home/landing/lib/kpiCardStyles";

type KpiCardProps = {
  metric: HeroDashboardMetric;
};

export function KpiCard({ metric }: KpiCardProps) {
  return (
    <article className={KPI_CARD_SURFACE_CLASS}>
      <div className={KPI_CARD_TOP_ROW_CLASS}>
        <span className={kpiCardIconGlowClass(metric.accent)} aria-hidden>
          <Image
            src={HERO_KPI_ICON_PATHS[metric.icon]}
            alt=""
            width={HERO_KPI_ICON_SIZE_PX}
            height={HERO_KPI_ICON_SIZE_PX}
            className={kpiCardIconImageClass(metric.accent)}
          />
        </span>
        <p className={`min-w-0 flex-1 ${KPI_CARD_VALUE_CLASS}`}>{metric.value}</p>
      </div>
      <div className={KPI_CARD_FOOTER_CLASS}>
        <p className={KPI_CARD_LABEL_CLASS}>{metric.label}</p>
        <button
          type="button"
          className={kpiCardBadgeClass(metric.accent)}
          aria-label={metric.trend}
        >
          <TrendUpIcon />
          {metric.trend}
        </button>
      </div>
    </article>
  );
}

function TrendUpIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M2 12 6 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4h4v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
