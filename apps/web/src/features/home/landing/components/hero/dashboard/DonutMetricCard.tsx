import { HERO_DASHBOARD_COPY } from "@/features/home/content/heroDashboardCopy";
import {
  DONUT_METRIC_BASELINE_CLASS,
  DONUT_METRIC_BODY_CLASS,
  DONUT_METRIC_CARD_CLASS,
  DONUT_METRIC_CENTER_VALUE_CLASS,
  DONUT_METRIC_RING_WRAPPER_CLASS,
  DONUT_METRIC_SIDE_CLASS,
  DONUT_METRIC_TITLE_CLASS,
  DONUT_METRIC_TREND_CLASS,
} from "@/features/home/landing/lib/donutMetricCardStyles";

const DONUT_VIEWBOX_SIZE = 72;
const DONUT_CENTER = DONUT_VIEWBOX_SIZE / 2;
const DONUT_RADIUS = 30;
const DONUT_STROKE_WIDTH = 8;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;
const DONUT_GRADIENT_ID = "donut-metric-ring-gradient";

export function DonutMetricCard() {
  const { donut } = HERO_DASHBOARD_COPY;
  const strokeOffset = DONUT_CIRCUMFERENCE * (1 - donut.percent / 100);

  return (
    <article className={DONUT_METRIC_CARD_CLASS}>
      <h3 className={DONUT_METRIC_TITLE_CLASS}>{donut.title}</h3>

      <div className={DONUT_METRIC_BODY_CLASS}>
        <div className={DONUT_METRIC_RING_WRAPPER_CLASS}>
          <DonutRing strokeOffset={strokeOffset} />
          <span className={`absolute ${DONUT_METRIC_CENTER_VALUE_CLASS}`}>{donut.value}</span>
        </div>

        <div className={DONUT_METRIC_SIDE_CLASS}>
          <p className={DONUT_METRIC_BASELINE_CLASS}>{donut.baselineLabel}</p>
          <p className={DONUT_METRIC_TREND_CLASS}>
            <TrendUpIcon />
            <span>{donut.trend}</span>
          </p>
        </div>
      </div>
    </article>
  );
}

type DonutRingProps = {
  strokeOffset: number;
};

function DonutRing({ strokeOffset }: DonutRingProps) {
  return (
    <svg
      className="size-full -rotate-90"
      viewBox={`0 0 ${DONUT_VIEWBOX_SIZE} ${DONUT_VIEWBOX_SIZE}`}
      role="img"
      aria-label={`${HERO_DASHBOARD_COPY.donut.percent}% average faster days on market`}
    >
      <defs>
        <linearGradient id={DONUT_GRADIENT_ID} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <circle
        cx={DONUT_CENTER}
        cy={DONUT_CENTER}
        r={DONUT_RADIUS}
        fill="none"
        stroke="#eef1f6"
        strokeWidth={DONUT_STROKE_WIDTH}
      />
      <circle
        cx={DONUT_CENTER}
        cy={DONUT_CENTER}
        r={DONUT_RADIUS}
        fill="none"
        stroke={`url(#${DONUT_GRADIENT_ID})`}
        strokeWidth={DONUT_STROKE_WIDTH}
        strokeDasharray={DONUT_CIRCUMFERENCE}
        strokeDashoffset={strokeOffset}
        strokeLinecap="round"
      />
    </svg>
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
