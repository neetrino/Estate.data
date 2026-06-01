import type { HeroDashboardMetricIcon } from "@/features/home/content/heroDashboardCopy";

export const HERO_KPI_ICON_PATHS: Record<HeroDashboardMetricIcon, string> = {
  home: "/icons/hero/kpi/home.svg",
  clock: "/icons/hero/kpi/clock.svg",
  star: "/icons/hero/kpi/star.svg",
};

/** Rendered inside glow frame (frame stays size-10 / sm:size-11). */
export const HERO_KPI_ICON_SIZE_PX = 28;
