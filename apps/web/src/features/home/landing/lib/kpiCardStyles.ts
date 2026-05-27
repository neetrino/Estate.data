import type { HeroDashboardMetric } from "@/features/home/content/heroDashboardCopy";

export const KPI_CARD_SURFACE_CLASS = [
  "flex min-w-0 cursor-default flex-col gap-2 rounded-[24px]",
  "hover:cursor-default",
  "border border-white/90 bg-white/85 p-5",
  "shadow-[0_10px_30px_rgba(30,41,59,0.06)] backdrop-blur-md",
  "sm:rounded-[26px]",
].join(" ");

export const KPI_CARD_TOP_ROW_CLASS = "flex min-w-0 items-center gap-3.5";

export const KPI_CARD_VALUE_CLASS =
  "text-[1.375rem] font-bold leading-none tracking-tight text-[#2e4873] sm:text-2xl";

export const KPI_CARD_FOOTER_CLASS = "mt-auto flex w-full flex-col items-center gap-1";

export const KPI_CARD_LABEL_CLASS = [
  "w-full text-center text-[10px] font-medium leading-tight text-[#2e4873]/55",
  "whitespace-nowrap sm:text-[11px]",
].join(" ");

export const KPI_CARD_BADGE_BASE_CLASS = [
  "flex w-full cursor-default items-center justify-center gap-1 rounded-full px-3 py-1",
  "text-[10px] font-semibold sm:text-[11px]",
].join(" ");

const KPI_CARD_BADGE_SURFACE: Record<HeroDashboardMetric["accent"], string> = {
  purple: "bg-[#8B5CF6]/8 text-[#8B5CF6]",
  cyan: "bg-[#3B82F6]/8 text-[#3B82F6]",
  orange: "bg-[#F59E0B]/10 text-[#F59E0B]",
};

const KPI_CARD_ICON_GLOW: Record<HeroDashboardMetric["accent"], string> = {
  purple: "shadow-[0_0_22px_rgba(139,92,246,0.38)]",
  cyan: "shadow-[0_0_22px_rgba(59,130,246,0.36)]",
  orange: "shadow-[0_0_22px_rgba(245,158,11,0.38)]",
};

const KPI_CARD_ICON_DROP_SHADOW: Record<HeroDashboardMetric["accent"], string> = {
  purple: "drop-shadow-[0_0_10px_rgba(139,92,246,0.55)]",
  cyan: "drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]",
  orange: "drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]",
};

/** Transparent icon area — glow only, no solid glass fill. */
export function kpiCardIconGlowClass(accent: HeroDashboardMetric["accent"]): string {
  return [
    "relative flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-transparent",
    KPI_CARD_ICON_GLOW[accent],
  ].join(" ");
}

export function kpiCardIconImageClass(accent: HeroDashboardMetric["accent"]): string {
  return ["size-6 object-contain sm:size-7", KPI_CARD_ICON_DROP_SHADOW[accent]].join(" ");
}

export function kpiCardBadgeClass(accent: HeroDashboardMetric["accent"]): string {
  return `${KPI_CARD_BADGE_BASE_CLASS} ${KPI_CARD_BADGE_SURFACE[accent]}`;
}
