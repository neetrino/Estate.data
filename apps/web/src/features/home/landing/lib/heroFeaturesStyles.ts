import type { FeatureHighlight } from "@/features/home/content/featureHighlightsCopy";

/** Feature list — stack on mobile, row with dividers on desktop. */
export const HERO_FEATURES_ROOT_CLASS = [
  "mt-8 grid min-w-0 max-w-full gap-6",
  "sm:mt-10 lg:grid-cols-3 lg:gap-0",
].join(" ");

export const HERO_FEATURES_ITEM_CLASS = [
  "flex min-w-0 items-start gap-3.5",
  "lg:px-8 lg:first:pl-0",
  "lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-[#2e4873]/10",
].join(" ");

export const HERO_FEATURES_TITLE_CLASS = "text-sm font-bold text-[#2e4873] sm:text-base";

export const HERO_FEATURES_SUBTITLE_CLASS = "mt-0.5 text-sm font-medium text-[#2e4873]/55 sm:text-[0.9375rem]";

const HERO_FEATURES_ICON_BUBBLE_BASE_CLASS = [
  "flex size-12 shrink-0 items-center justify-center rounded-full",
  "border border-white/80 bg-white/70 shadow-[0_4px_14px_rgba(46,72,115,0.08)]",
  "backdrop-blur-md",
].join(" ");

const ACCENT_ICON_BUBBLE: Record<FeatureHighlight["accent"], string> = {
  purple: "text-[#8B5CF6]",
  cyan: "text-[#3B82F6]",
  pink: "text-[#EC4899]",
};

export function heroFeaturesIconBubbleClass(accent: FeatureHighlight["accent"]): string {
  return `${HERO_FEATURES_ICON_BUBBLE_BASE_CLASS} ${ACCENT_ICON_BUBBLE[accent]}`;
}
