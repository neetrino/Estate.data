import "@/features/home/landing/styles/dashboard-chart-enter.css";

import { HERO_DASHBOARD_COPY } from "@/features/home/content/heroDashboardCopy";
import {
  DASHBOARD_CHART_BAR_FILL_OPACITY,
  DASHBOARD_CHART_BAR_GAP,
  DASHBOARD_CHART_BAR_RADIUS,
  DASHBOARD_CHART_BAR_WIDTH,
  DASHBOARD_CHART_SERIES_REVEAL_CLASS,
  dashboardChartBarEnterClass,
} from "@/features/home/landing/lib/dashboardChartBarStyles";
import {
  DASHBOARD_CHART_CARD_CLASS,
  DASHBOARD_CHART_FILTER_CLASS,
  DASHBOARD_CHART_GUIDE_LINE_CLASS,
  DASHBOARD_CHART_LEGEND_CLASS,
  DASHBOARD_CHART_PLOT_WRAPPER_CLASS,
  DASHBOARD_CHART_TITLE_CLASS,
  DASHBOARD_CHART_TOOLTIP_CLASS,
} from "@/features/home/landing/lib/dashboardChartStyles";

const VIEWBOX_WIDTH = 400;
const VIEWBOX_HEIGHT = 210;
const PLOT_LEFT = 44;
const PLOT_RIGHT = 392;
const PLOT_TOP = 18;
const PLOT_BOTTOM = 170;
const PLOT_HEIGHT = PLOT_BOTTOM - PLOT_TOP;
const Y_MAX = 40_000;
const POINT_COUNT = 5;

type ChartPoint = { readonly x: number; readonly y: number };

export function DashboardChart() {
  const { chart } = HERO_DASHBOARD_COPY;
  const xPositions = getXPositions();
  const tooltipX = xPositions[chart.tooltipIndex] ?? xPositions[3];

  const seriesPaths = chart.series.map((series) => {
    const points = series.values.map((value, index) => ({
      x: xPositions[index] ?? PLOT_LEFT,
      y: valueToY(value),
    }));
    return {
      id: series.id,
      color: series.color,
      points,
      linePath: pointsToSmoothPath(points),
      areaPath: pointsToAreaPath(points, PLOT_BOTTOM),
    };
  });

  const yTicks = chart.yAxisLabels.map((label, index) => ({
    label,
    y: valueToY(index * 10_000),
  }));

  const ariaLabel = `Line chart showing ${chart.legend.map((item) => item.label).join(", ")} over the last 30 days`;

  return (
    <article className={DASHBOARD_CHART_CARD_CLASS}>
      <div className="flex items-start justify-between gap-3">
        <h3 className={DASHBOARD_CHART_TITLE_CLASS}>{chart.title}</h3>
        <span className={DASHBOARD_CHART_FILTER_CLASS}>{chart.periodLabel}</span>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5" aria-label="Chart legend">
        {chart.legend.map((item) => (
          <li key={item.id} className={`flex items-center gap-1.5 ${DASHBOARD_CHART_LEGEND_CLASS}`}>
            <span className="size-2 rounded-full" style={{ backgroundColor: item.color }} aria-hidden />
            {item.label}
          </li>
        ))}
      </ul>

      <div className={DASHBOARD_CHART_PLOT_WRAPPER_CLASS} tabIndex={0} aria-label="Chart details on hover">
        <svg
          className="h-auto w-full"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={ariaLabel}
        >
          <defs>
            {seriesPaths.map((series) => (
              <linearGradient
                key={`${series.id}-area`}
                id={`dashboard-chart-area-${series.id}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={series.color} stopOpacity="0.2" />
                <stop offset="100%" stopColor={series.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {yTicks.map((tick) => (
            <g key={tick.label}>
              <line
                x1={PLOT_LEFT}
                y1={tick.y}
                x2={PLOT_RIGHT}
                y2={tick.y}
                stroke="rgba(46,72,115,0.08)"
                strokeWidth="1"
              />
              <text
                x={PLOT_LEFT - 8}
                y={tick.y + 4}
                textAnchor="end"
                className="fill-[#2e4873]/45 text-[9px] sm:text-[10px]"
              >
                {tick.label}
              </text>
            </g>
          ))}

          {chart.xAxisLabels.map((label, index) => (
            <text
              key={label}
              x={xPositions[index]}
              y={VIEWBOX_HEIGHT - 6}
              textAnchor="middle"
              className="fill-[#2e4873]/50 text-[8px] sm:text-[9px]"
            >
              {label}
            </text>
          ))}

          <g aria-hidden>
            {renderChartBars(chart.series, xPositions)}
          </g>

          <g className={DASHBOARD_CHART_SERIES_REVEAL_CLASS}>
            {seriesPaths.map((series) => (
              <path
                key={`${series.id}-area`}
                d={series.areaPath}
                fill={`url(#dashboard-chart-area-${series.id})`}
              />
            ))}

            {seriesPaths.map((series) => (
              <path
                key={`${series.id}-line`}
                d={series.linePath}
                fill="none"
                stroke={series.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}

            {seriesPaths.map((series) =>
              series.points.map((point, pointIndex) => (
                <circle
                  key={`${series.id}-point-${pointIndex}`}
                  cx={point.x}
                  cy={point.y}
                  r={pointIndex === chart.tooltipIndex ? 4.5 : 3.5}
                  fill="white"
                  stroke={series.color}
                  strokeWidth="2"
                />
              )),
            )}
          </g>

          <line
            className={DASHBOARD_CHART_GUIDE_LINE_CLASS}
            x1={tooltipX}
            y1={PLOT_TOP}
            x2={tooltipX}
            y2={PLOT_BOTTOM}
            stroke="rgba(139,92,246,0.35)"
            strokeWidth="1"
            strokeDasharray="4 3"
          />
        </svg>

        <ChartTooltip tooltipX={tooltipX} />
      </div>
    </article>
  );
}

function ChartTooltip({ tooltipX }: { tooltipX: number }) {
  const { chart } = HERO_DASHBOARD_COPY;
  const leftPercent = ((tooltipX - PLOT_LEFT) / (PLOT_RIGHT - PLOT_LEFT)) * 100;

  return (
    <div
      className={DASHBOARD_CHART_TOOLTIP_CLASS}
      style={{ left: `clamp(0.5rem, ${leftPercent}%, calc(100% - 11rem))`, top: "0.5rem" }}
      aria-hidden
    >
      <p className="text-[10px] font-semibold text-[#2e4873] sm:text-[11px]">{chart.tooltipDate}</p>
      <dl className="mt-1 space-y-0.5 text-[10px] sm:text-[11px]">
        <div className="flex justify-between gap-3">
          <dt className="text-[#2e4873]/60">Views</dt>
          <dd className="font-semibold text-[#8B5CF6]">{chart.tooltipValues.views}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-[#2e4873]/60">Engagement</dt>
          <dd className="font-semibold text-[#3B82F6]">{chart.tooltipValues.engagement}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-[#2e4873]/60">Inquiries</dt>
          <dd className="font-semibold text-[#EC4899]">{chart.tooltipValues.inquiries}</dd>
        </div>
      </dl>
    </div>
  );
}

function getXPositions(): number[] {
  const span = PLOT_RIGHT - PLOT_LEFT;
  return Array.from({ length: POINT_COUNT }, (_, index) => PLOT_LEFT + (span * index) / (POINT_COUNT - 1));
}

type ChartSeries = (typeof HERO_DASHBOARD_COPY.chart.series)[number];

function renderChartBars(seriesList: readonly ChartSeries[], xPositions: readonly number[]) {
  const seriesCount = seriesList.length;
  const step = DASHBOARD_CHART_BAR_WIDTH + DASHBOARD_CHART_BAR_GAP;
  const centerOffset = ((seriesCount - 1) * step) / 2;

  return seriesList.flatMap((series, seriesIndex) =>
    series.values.map((value, pointIndex) => {
      const x = xPositions[pointIndex] ?? PLOT_LEFT;
      const y = valueToY(value);
      const height = PLOT_BOTTOM - y;
      const barX =
        x + seriesIndex * step - centerOffset - DASHBOARD_CHART_BAR_WIDTH / 2;

      return (
        <rect
          key={`bar-${series.id}-${pointIndex}`}
          x={barX}
          y={y}
          width={DASHBOARD_CHART_BAR_WIDTH}
          height={height}
          rx={DASHBOARD_CHART_BAR_RADIUS}
          fill={series.color}
          fillOpacity={DASHBOARD_CHART_BAR_FILL_OPACITY}
          className={dashboardChartBarEnterClass(pointIndex)}
        />
      );
    }),
  );
}

function valueToY(value: number): number {
  const clamped = Math.max(0, Math.min(value, Y_MAX));
  return PLOT_BOTTOM - (clamped / Y_MAX) * PLOT_HEIGHT;
}

function pointsToSmoothPath(points: readonly ChartPoint[]): string {
  if (points.length === 0) {
    return "";
  }
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const controlX = (current.x + next.x) / 2;
    path += ` C ${controlX} ${current.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }
  return path;
}

function pointsToAreaPath(points: readonly ChartPoint[], bottomY: number): string {
  if (points.length === 0) {
    return "";
  }
  const linePath = pointsToSmoothPath(points);
  const first = points[0];
  const last = points[points.length - 1];
  return `${linePath} L ${last.x} ${bottomY} L ${first.x} ${bottomY} Z`;
}
