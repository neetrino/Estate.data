/** Grouped bar width in chart viewBox units. */
export const DASHBOARD_CHART_BAR_WIDTH = 9;

/** Gap between bars in a group. */
export const DASHBOARD_CHART_BAR_GAP = 2;

/** Bar corner radius. */
export const DASHBOARD_CHART_BAR_RADIUS = 2;

/** Bar fill opacity (series color shows through). */
export const DASHBOARD_CHART_BAR_FILL_OPACITY = 0.34;

export const DASHBOARD_CHART_BAR_RISE_CLASS = "dashboard-chart-bar-rise";

export const DASHBOARD_CHART_SERIES_REVEAL_CLASS = "dashboard-chart-series-reveal";

export const DASHBOARD_CHART_STAT_RISE_CLASS = "dashboard-chart-stat-rise";

/** Stagger bars left→right along the x-axis (columns 0–4). */
export function dashboardChartBarColumnClass(columnIndex: number): string {
  const index = Math.max(0, Math.min(columnIndex, 4));
  return `dashboard-chart-bar-col-${index}`;
}

export function dashboardChartBarEnterClass(columnIndex: number): string {
  return [
    DASHBOARD_CHART_BAR_RISE_CLASS,
    dashboardChartBarColumnClass(columnIndex),
  ].join(" ");
}

export function dashboardChartStatEnterClass(columnIndex: number): string {
  return [
    DASHBOARD_CHART_STAT_RISE_CLASS,
    dashboardChartBarColumnClass(columnIndex),
  ].join(" ");
}
