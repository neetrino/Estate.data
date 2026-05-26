import { HERO_DASHBOARD_COPY } from "@/features/home/content/heroDashboardCopy";
import {
  SPARKLINE_CARD_CLASS,
  SPARKLINE_CARD_TITLE_CLASS,
  SPARKLINE_CARD_TREND_CLASS,
  SPARKLINE_CARD_VALUE_CLASS,
  SPARKLINE_CHART_WRAPPER_CLASS,
} from "@/features/home/landing/lib/sparklineCardStyles";

const SPARKLINE_VIEWBOX_WIDTH = 200;
const SPARKLINE_VIEWBOX_HEIGHT = 48;
const SPARKLINE_GRADIENT_ID = "sparkline-card-area-gradient";

/** Sparkline points — upward trend (y grows downward in SVG). */
const SPARKLINE_POINTS = [
  { x: 0, y: 34 },
  { x: 40, y: 30 },
  { x: 80, y: 32 },
  { x: 120, y: 22 },
  { x: 160, y: 18 },
  { x: 200, y: 12 },
] as const;

const SPARKLINE_LINE_POINTS = SPARKLINE_POINTS.map((point) => `${point.x},${point.y}`).join(" ");

const SPARKLINE_AREA_PATH = [
  `M ${SPARKLINE_POINTS[0].x} ${SPARKLINE_POINTS[0].y}`,
  ...SPARKLINE_POINTS.slice(1).map((point) => `L ${point.x} ${point.y}`),
  `L ${SPARKLINE_VIEWBOX_WIDTH} ${SPARKLINE_VIEWBOX_HEIGHT}`,
  `L 0 ${SPARKLINE_VIEWBOX_HEIGHT}`,
  "Z",
].join(" ");

export function SparklineCard() {
  const { sparkline } = HERO_DASHBOARD_COPY;

  return (
    <article className={SPARKLINE_CARD_CLASS}>
      <h3 className={SPARKLINE_CARD_TITLE_CLASS}>{sparkline.title}</h3>
      <p className={SPARKLINE_CARD_VALUE_CLASS}>{sparkline.value}</p>
      <p className={SPARKLINE_CARD_TREND_CLASS}>
        <TrendUpIcon />
        <span>{sparkline.trend}</span>
      </p>

      <div className={SPARKLINE_CHART_WRAPPER_CLASS}>
        <svg
          className="h-7 w-full sm:h-8"
          viewBox={`0 0 ${SPARKLINE_VIEWBOX_WIDTH} ${SPARKLINE_VIEWBOX_HEIGHT}`}
          preserveAspectRatio="none"
          role="img"
          aria-label="Turnaround trend improving over time"
        >
          <defs>
            <linearGradient id={SPARKLINE_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={SPARKLINE_AREA_PATH} fill={`url(#${SPARKLINE_GRADIENT_ID})`} />
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={SPARKLINE_LINE_POINTS}
          />
          {SPARKLINE_POINTS.map((point) => (
            <circle
              key={`${point.x}-${point.y}`}
              cx={point.x}
              cy={point.y}
              r="2.5"
              fill="white"
              stroke="#3B82F6"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>
    </article>
  );
}

function TrendUpIcon() {
  return (
    <svg className="size-3 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M2 12 6 8l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 4h4v4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
