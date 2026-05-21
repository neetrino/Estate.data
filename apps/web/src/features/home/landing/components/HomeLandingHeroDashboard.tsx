import { HOME_STATS_COPY } from "@/features/home/content/homeStatsCopy";
import { formatStatCountValue } from "@/features/home/lib/formatStatCountValue";
import {
  homeLandingAccentAt,
  LANDING_GLASS_CARD_CLASS,
  landingMetricValueClass,
} from "@/features/home/landing/lib/landingStyles";

const STORAGE_CHART_PERCENT = 78;

export function HomeLandingHeroDashboard() {
  const topStats = HOME_STATS_COPY.stats.slice(0, 3);

  return (
    <div className={`${LANDING_GLASS_CARD_CLASS} overflow-hidden rounded-3xl p-4 sm:p-5`} aria-hidden>
      <ul className="flex flex-wrap gap-3 border-b border-brand-navy/8 pb-3">
        {topStats.map((stat, index) => (
          <li key={stat.id} className="min-w-[5.5rem] flex-1">
            <p className={`text-sm font-bold sm:text-base ${landingMetricValueClass(homeLandingAccentAt(index))}`}>
              {formatStatCountValue(1, stat.count)}
            </p>
            <p className="text-[10px] font-medium text-brand-navy/60 sm:text-xs">{stat.label}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1.35fr_0.85fr]">
        <PropertyMapPanel />
        <div className="flex flex-col gap-3">
          <StorageChartPanel />
          <MarketTrendsPanel />
        </div>
      </div>
    </div>
  );
}

function PropertyMapPanel() {
  return (
    <div className="rounded-2xl border border-brand-navy/8 bg-gradient-to-br from-brand-cyan/8 via-white to-brand-purple/5 p-3">
      <p className="text-xs font-semibold text-brand-navy">Media + data overview</p>
      <div className="relative mt-2 aspect-[4/3] overflow-hidden rounded-xl bg-brand-navy/[0.04]">
        <svg className="absolute inset-0 size-full" viewBox="0 0 320 240" aria-hidden>
          <defs>
            <linearGradient id="hero-map-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8f7fa" />
              <stop offset="100%" stopColor="#f5f0f8" />
            </linearGradient>
          </defs>
          <rect width="320" height="240" fill="url(#hero-map-sky)" />
          <path
            d="M0 180 Q80 150 160 165 T320 150 L320 240 L0 240 Z"
            fill="#dce8f4"
            opacity="0.9"
          />
          <g fill="#2e4873" opacity="0.35">
            <rect x="40" y="120" width="28" height="50" rx="2" />
            <rect x="78" y="108" width="34" height="62" rx="2" />
            <rect x="124" y="115" width="26" height="55" rx="2" />
            <rect x="162" y="100" width="38" height="70" rx="2" />
            <rect x="210" y="112" width="30" height="58" rx="2" />
          </g>
          <MapPin x={95} y={95} />
          <MapPin x={175} y={88} hot />
          <MapPin x={230} y={105} />
        </svg>
      </div>
    </div>
  );
}

function MapPin({ x, y, hot = false }: { x: number; y: number; hot?: boolean }) {
  const fill = hot ? "#e55100" : "#16c0da";
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path
        d="M12 0C7.03 0 3 4.03 3 9c0 6.75 9 15 9 15s9-8.25 9-15c0-4.97-4.03-9-9-9z"
        fill={fill}
      />
      <circle cx="12" cy="9" r="3" fill="white" />
    </g>
  );
}

function StorageChartPanel() {
  const circumference = 2 * Math.PI * 36;
  const offset = circumference * (1 - STORAGE_CHART_PERCENT / 100);
  const storageStat = HOME_STATS_COPY.stats[0];

  return (
    <div className="rounded-2xl border border-brand-navy/8 bg-white p-3">
      <p className="text-xs font-semibold text-brand-navy">{storageStat.label}</p>
      <div className="mt-2 flex items-center gap-3">
        <svg width="80" height="80" viewBox="0 0 88 88" aria-hidden>
          <circle cx="44" cy="44" r="36" fill="none" stroke="#f1f3f8" strokeWidth="10" />
          <circle
            cx="44"
            cy="44"
            r="36"
            fill="none"
            stroke="#16c0da"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 44 44)"
          />
        </svg>
        <div>
          <p className="text-lg font-bold text-brand-yellow">
            {formatStatCountValue(1, storageStat.count)}
          </p>
        </div>
      </div>
    </div>
  );
}

function MarketTrendsPanel() {
  const uptimeStat = HOME_STATS_COPY.stats[4];

  return (
    <div className="rounded-2xl border border-brand-navy/8 bg-white p-3">
      <p className="text-xs font-semibold text-brand-navy">{uptimeStat.label}</p>
      <p className="mt-1 text-2xl font-bold text-brand-cyan">
        {formatStatCountValue(1, uptimeStat.count)}
      </p>
      <svg className="mt-2 w-full" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden>
        <polyline
          fill="none"
          stroke="#16c0da"
          strokeWidth="2.5"
          points="0,36 40,30 80,34 120,18 160,22 200,10"
        />
        <polyline
          fill="none"
          stroke="#fdba2c"
          strokeWidth="2"
          strokeDasharray="4 3"
          points="0,40 40,34 80,28 120,26 160,20 200,16"
        />
      </svg>
    </div>
  );
}
