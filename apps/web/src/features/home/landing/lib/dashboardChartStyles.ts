export const DASHBOARD_CHART_CARD_CLASS = [
  "flex h-full w-full min-w-0 flex-col rounded-[22px] border border-white/80",
  "bg-white/90 p-5 shadow-[0_8px_28px_rgba(30,41,59,0.07)] backdrop-blur-sm",
  "sm:rounded-[24px] sm:p-6",
].join(" ");

export const DASHBOARD_CHART_TITLE_CLASS = "text-sm font-semibold text-[#2e4873] sm:text-[0.9375rem]";

export const DASHBOARD_CHART_FILTER_CLASS = [
  "shrink-0 rounded-lg border border-[#2e4873]/10 bg-[#f8f9fc] px-2.5 py-1",
  "text-[10px] font-medium text-[#2e4873]/70 sm:text-[11px]",
].join(" ");

export const DASHBOARD_CHART_LEGEND_CLASS =
  "text-[10px] font-medium text-[#2e4873]/65 sm:text-[11px]";

/** Plot height on lg+ — keeps the outer dashboard panel from growing when the chart widens. */
export const DASHBOARD_CHART_PLOT_HEIGHT_XL_CLASS =
  "min-[480px]:h-[10.5rem] xl:h-[11rem]";

export const DASHBOARD_CHART_PLOT_WRAPPER_CLASS = [
  "group relative mt-4 w-full min-w-0 overflow-hidden rounded-xl",
  DASHBOARD_CHART_PLOT_HEIGHT_XL_CLASS,
  "bg-gradient-to-b from-[#2e4873]/[0.02] to-[#8B5CF6]/[0.04]",
  "outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/35",
].join(" ");

export const DASHBOARD_CHART_SVG_CLASS =
  "h-auto w-full min-[480px]:h-full min-[480px]:min-h-0";

export const DASHBOARD_CHART_TOOLTIP_CLASS = [
  "pointer-events-none absolute z-10 max-w-[10.5rem] rounded-lg",
  "border border-[#2e4873]/10 bg-white/95 px-2.5 py-2 shadow-[0_8px_24px_rgba(30,41,59,0.12)]",
  "backdrop-blur-sm sm:px-3 sm:py-2.5",
  "invisible opacity-0 transition-opacity duration-200 motion-reduce:transition-none",
  "group-hover:visible group-hover:opacity-100",
  "group-focus-visible:visible group-focus-visible:opacity-100",
].join(" ");

export const DASHBOARD_CHART_GUIDE_LINE_CLASS = [
  "opacity-0 transition-opacity duration-200 motion-reduce:transition-none",
  "group-hover:opacity-100 group-focus-visible:opacity-100",
].join(" ");
