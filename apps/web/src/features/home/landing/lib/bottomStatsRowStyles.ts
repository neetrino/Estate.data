import type { HeroDashboardBottomStatAccent } from "@/features/home/content/heroDashboardCopy";

export const BOTTOM_STATS_ROW_CARD_CLASS = [
  "min-w-0 rounded-[22px] border border-white/80 bg-white/90 p-4",
  "shadow-[0_8px_24px_rgba(30,41,59,0.06)] backdrop-blur-sm sm:rounded-[24px] sm:p-5",
].join(" ");

export const BOTTOM_STATS_ROW_GRID_CLASS = [
  "grid min-w-0 grid-cols-2 gap-x-4 gap-y-4",
  "md:grid-cols-4 md:gap-0",
].join(" ");

export const BOTTOM_STATS_ITEM_CLASS = [
  "flex min-w-0 items-center gap-2.5",
  "md:px-5 md:first:pl-0 md:last:pr-0",
  "md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-[#2e4873]/10",
].join(" ");

export const BOTTOM_STATS_LABEL_CLASS =
  "text-[10px] font-medium text-[#2e4873]/55 sm:text-[11px]";

export const BOTTOM_STATS_VALUE_CLASS = "text-sm font-bold text-[#2e4873] sm:text-base";

const BOTTOM_STATS_ICON_BUBBLE: Record<HeroDashboardBottomStatAccent, string> = {
  purple: "bg-[#8B5CF6]/12 text-[#8B5CF6]",
  cyan: "bg-[#3B82F6]/12 text-[#3B82F6]",
  pink: "bg-[#EC4899]/12 text-[#EC4899]",
  orange: "bg-[#F59E0B]/12 text-[#F59E0B]",
};

export function bottomStatsIconBubbleClass(accent: HeroDashboardBottomStatAccent): string {
  return [
    "flex size-9 shrink-0 items-center justify-center rounded-xl",
    BOTTOM_STATS_ICON_BUBBLE[accent],
  ].join(" ");
}
