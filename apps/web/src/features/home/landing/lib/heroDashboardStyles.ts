/** Root — fills right hero column edge-to-edge. */
export const HERO_DASHBOARD_ROOT_CLASS = [
  "relative flex min-h-0 w-full min-w-0 max-w-none flex-col",
  "lg:h-full lg:flex-1",
].join(" ");

/** Ambient glow behind the panel. */
export const HERO_DASHBOARD_GLOW_CLASS = [
  "pointer-events-none absolute -inset-3 rounded-[2rem] opacity-90",
  "bg-gradient-to-br from-[#8B5CF6]/22 via-[#3B82F6]/12 to-[#EC4899]/18",
  "blur-2xl sm:-inset-5 sm:rounded-[2.25rem]",
].join(" ");

/** Outer glass panel. */
export const HERO_DASHBOARD_PANEL_CLASS = [
  "relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px]",
  "border border-white/75 bg-white/72",
  "shadow-[0_30px_80px_rgba(30,41,59,0.12)] backdrop-blur-xl",
  "sm:rounded-[32px] lg:rounded-[36px]",
].join(" ");

/** Inner padding. */
export const HERO_DASHBOARD_INNER_CLASS = "p-4 sm:p-5 lg:p-6";

/** Shared gap between dashboard card columns (KPI row + middle chart/mini). */
export const HERO_DASHBOARD_CARD_GRID_GAP_CLASS = "gap-3 min-[480px]:gap-4.5";

/** Shared 3-column grid — KPI row and middle row align at min-[480px]. */
export const HERO_DASHBOARD_THREE_COLUMN_GRID_CLASS = [
  "grid min-w-0 grid-cols-1",
  HERO_DASHBOARD_CARD_GRID_GAP_CLASS,
  "min-[480px]:grid-cols-3",
].join(" ");

/** Top KPI row — 3 cards. */
export const HERO_DASHBOARD_KPI_GRID_CLASS = [
  HERO_DASHBOARD_THREE_COLUMN_GRID_CLASS,
  "items-start",
].join(" ");

/** Middle — chart spans 2 cols, mini stack spans 1 col (matches KPI widths). */
export const HERO_DASHBOARD_MIDDLE_CLASS = [
  "mt-4 sm:mt-5",
  HERO_DASHBOARD_THREE_COLUMN_GRID_CLASS,
  "min-[480px]:items-stretch",
].join(" ");

export const HERO_DASHBOARD_CHART_COLUMN_CLASS = [
  "min-w-0 w-full",
  "min-[480px]:col-span-2 min-[480px]:flex min-[480px]:h-full min-[480px]:flex-col",
].join(" ");

/** Right column — compact donut + sparkline, matches chart height. */
export const HERO_DASHBOARD_MINI_COLUMN_CLASS = [
  "flex min-h-0 min-w-0 flex-col gap-2.5",
  "min-[480px]:col-span-1 min-[480px]:h-full",
].join(" ");

/** Bottom stats — 4 items. */
export const HERO_DASHBOARD_BOTTOM_CLASS = "mt-4 min-w-0 sm:mt-5";
