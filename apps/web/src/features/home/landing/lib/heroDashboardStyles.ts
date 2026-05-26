/** Root — fills right hero column edge-to-edge. */
export const HERO_DASHBOARD_ROOT_CLASS = "relative w-full min-w-0 max-w-none";

/** Ambient glow behind the panel. */
export const HERO_DASHBOARD_GLOW_CLASS = [
  "pointer-events-none absolute -inset-3 rounded-[2rem] opacity-90",
  "bg-gradient-to-br from-[#8B5CF6]/22 via-[#3B82F6]/12 to-[#EC4899]/18",
  "blur-2xl sm:-inset-5 sm:rounded-[2.25rem]",
].join(" ");

/** Outer glass panel. */
export const HERO_DASHBOARD_PANEL_CLASS = [
  "relative overflow-hidden rounded-[28px] border border-white/75",
  "bg-white/72 shadow-[0_30px_80px_rgba(30,41,59,0.12)] backdrop-blur-xl",
  "sm:rounded-[32px] lg:rounded-[36px]",
].join(" ");

/** Inner padding. */
export const HERO_DASHBOARD_INNER_CLASS = "p-4 sm:p-5 lg:p-6";

/** Top KPI row — 3 cards. */
export const HERO_DASHBOARD_KPI_GRID_CLASS = [
  "grid min-w-0 grid-cols-1 items-start gap-3",
  "min-[480px]:grid-cols-3 min-[480px]:gap-3.5",
].join(" ");

/** Middle — chart + mini cards (equal height on md+). */
export const HERO_DASHBOARD_MIDDLE_CLASS = [
  "mt-4 grid min-w-0 gap-3.5 sm:mt-5 sm:gap-4",
  "md:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)] md:items-stretch",
].join(" ");

export const HERO_DASHBOARD_CHART_COLUMN_CLASS = "min-w-0 md:flex md:h-full";

/** Right column — compact donut + sparkline, matches chart height. */
export const HERO_DASHBOARD_MINI_COLUMN_CLASS = [
  "flex min-h-0 min-w-0 flex-col gap-2.5",
  "md:h-full md:gap-2.5",
].join(" ");

/** Bottom stats — 4 items. */
export const HERO_DASHBOARD_BOTTOM_CLASS = "mt-4 min-w-0 sm:mt-5";
