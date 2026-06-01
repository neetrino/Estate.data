import type { ReactNode } from "react";
import type { HeroDashboardMetric } from "@/features/home/content/heroDashboardCopy";
import type { HeroDashboardMetricIcon } from "@/features/home/content/heroDashboardCopy";

type HeroDashboardKpiIconProps = {
  icon: HeroDashboardMetricIcon;
  accent: HeroDashboardMetric["accent"];
  className?: string;
};

const KPI_ICON_STROKE_BY_ACCENT: Record<HeroDashboardMetric["accent"], string> = {
  purple: "#8B5CF6",
  cyan: "#3B82F6",
  orange: "#F59E0B",
};

export function HeroDashboardKpiIcon({ icon, accent, className = "size-6 sm:size-7" }: HeroDashboardKpiIconProps) {
  const stroke = KPI_ICON_STROKE_BY_ACCENT[accent];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {iconPaths[icon]}
    </svg>
  );
}

const iconPaths: Record<HeroDashboardMetricIcon, ReactNode> = {
  home: (
    <>
      <path d="M4 20V9.5L12 5l8 4.5V20" />
      <path d="M9 20v-5h6v5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8v4.5l3 2" />
    </>
  ),
  star: <polygon points="12 3 14.5 9 21 9.5 16.2 13.8 17.8 20.5 12 17 6.2 20.5 7.8 13.8 3 9.5 9.5 9" />,
};
