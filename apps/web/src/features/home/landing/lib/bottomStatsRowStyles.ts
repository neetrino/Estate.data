import type { HeroDashboardBottomStatAccent } from "@/features/home/content/heroDashboardCopy";

const BOTTOM_STATS_ICON_BUBBLE: Record<HeroDashboardBottomStatAccent, string> = {
  purple: "bg-[#8B5CF6]/12 text-[#8B5CF6]",
  cyan: "bg-[#3B82F6]/12 text-[#3B82F6]",
  pink: "bg-[#EC4899]/12 text-[#EC4899]",
  orange: "bg-[#F59E0B]/12 text-[#F59E0B]",
};

export function bottomStatsIconBubbleClass(accent: HeroDashboardBottomStatAccent): string {
  return BOTTOM_STATS_ICON_BUBBLE[accent];
}
