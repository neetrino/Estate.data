"use client";

import { useId } from "react";

type BuildingVariant = "wireframe" | "solid";

const FLOOR_LINE_COUNT = 14;
const FLOOR_TOP_Y = 102;
const FLOOR_BOTTOM_Y = 212;
const FLOOR_STEP = (FLOOR_BOTTOM_Y - FLOOR_TOP_Y) / FLOOR_LINE_COUNT;

export function ScanToBimBuildingModel({ variant }: { variant: BuildingVariant }) {
  const isWireframe = variant === "wireframe";
  const uid = useId().replace(/:/g, "");
  const frontGrad = `bim-glass-front-${uid}`;
  const sideGrad = `bim-glass-side-${uid}`;
  const podiumGrad = `bim-podium-${uid}`;
  const crownGrad = `bim-crown-${uid}`;
  const shineGrad = `bim-shine-${uid}`;

  const floorLines = Array.from({ length: FLOOR_LINE_COUNT }, (_, index) => {
    const y = FLOOR_TOP_Y + index * FLOOR_STEP;
    return y;
  });

  return (
    <svg
      className="scan-to-bim-scene__building-svg"
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id={frontGrad} x1="140" y1="62" x2="140" y2="268" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="18%" stopColor="#16c0da" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#2e4873" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#873c83" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={sideGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2e4873" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#16c0da" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={podiumGrad} x1="140" y1="218" x2="140" y2="272" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16c0da" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#2e4873" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={crownGrad} x1="140" y1="68" x2="140" y2="98" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16c0da" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c364be" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={shineGrad} x1="78" y1="90" x2="200" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="40%" stopColor="#16c0da" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <ellipse cx="140" cy="294" rx="108" ry="15" fill="#2e4873" fillOpacity={isWireframe ? 0.05 : 0.11} />

      <g className={isWireframe ? "scan-to-bim-scene__wire-group" : undefined}>
        <path
          d="M54 268 26 252V216l28-16v68l28 16z"
          fill={isWireframe ? "none" : `url(#${sideGrad})`}
          stroke="#2e4873"
          strokeWidth={isWireframe ? 0.9 : 1.1}
          strokeLinejoin="round"
        />
        <path
          d="M226 268 254 252V216l-28-16v68l-28 16z"
          fill={isWireframe ? "none" : `url(#${sideGrad})`}
          stroke="#2e4873"
          strokeWidth={isWireframe ? 0.9 : 1.1}
          strokeLinejoin="round"
        />
        <path
          d="M54 268h172v-52H54v52z"
          fill={isWireframe ? "none" : `url(#${podiumGrad})`}
          stroke="#2e4873"
          strokeWidth={isWireframe ? 1 : 1.25}
          strokeLinejoin="round"
        />

        <path
          d="M76 216 48 200V94l28-16 64-10 0 132H76z"
          fill={isWireframe ? "none" : `url(#${sideGrad})`}
          stroke="#2e4873"
          strokeWidth={isWireframe ? 0.9 : 1.1}
          strokeLinejoin="round"
        />
        <path
          d="M204 216l28-16V94l-28-16-64-10v132h64z"
          fill={isWireframe ? "none" : `url(#${sideGrad})`}
          stroke="#2e4873"
          strokeWidth={isWireframe ? 0.9 : 1.1}
          strokeLinejoin="round"
        />

        <path
          d="M76 216h128V94L140 68 76 94v122z"
          fill={isWireframe ? "none" : `url(#${frontGrad})`}
          stroke="#16c0da"
          strokeWidth={isWireframe ? 1 : 1.5}
          strokeLinejoin="round"
        />
        <path
          d="M76 94 140 68l64 26-28 16H104L76 94z"
          fill={isWireframe ? "none" : `url(#${crownGrad})`}
          stroke="#16c0da"
          strokeWidth={isWireframe ? 1 : 1.2}
          strokeLinejoin="round"
        />
        <path
          d="M108 94h64l8-12-36-12-36 12 8 12z"
          fill={isWireframe ? "none" : "#2e4873"}
          fillOpacity={isWireframe ? 0 : 0.32}
          stroke="#16c0da"
          strokeWidth={isWireframe ? 0.9 : 1}
          strokeLinejoin="round"
        />

        {floorLines.map((y) => (
          <line
            key={y}
            x1="80"
            y1={y}
            x2="200"
            y2={y}
            stroke="#16c0da"
            strokeOpacity={isWireframe ? 0.55 : 0.2}
            strokeWidth="0.75"
          />
        ))}

        {[88, 112, 140, 168, 192].map((x) => (
          <line
            key={x}
            x1={x}
            y1="216"
            x2={x}
            y2="96"
            stroke={isWireframe ? "#c364be" : "#2e4873"}
            strokeOpacity={isWireframe ? 0.5 : 0.16}
            strokeWidth="0.75"
          />
        ))}

        <path
          d="M140 68v28M76 118l64-24 64 24M76 118l64 20 64 20"
          stroke="#c364be"
          strokeOpacity={isWireframe ? 0.6 : 0.18}
          strokeWidth="1"
          strokeDasharray={isWireframe ? "4 3" : "0"}
        />

        {!isWireframe ? (
          <>
            <path d="M76 216h128V94H76v122z" fill={`url(#${shineGrad})`} fillOpacity="0.55" />
            <rect x="120" y="136" width="40" height="6" rx="1" fill="#16c0da" fillOpacity="0.32" />
            <rect x="126" y="166" width="28" height="34" rx="1" fill="#16c0da" fillOpacity="0.16" stroke="#2e4873" strokeWidth="0.75" />
            <circle cx="184" cy="150" r="2.5" fill="#fdba2c" fillOpacity="0.9" />
            <circle cx="96" cy="184" r="2" fill="#16c0da" fillOpacity="0.85" />
          </>
        ) : null}
      </g>
    </svg>
  );
}

export function ScanToBimVolumePrism() {
  return (
    <div className="scan-to-bim-scene__prism" aria-hidden>
      <div className="scan-to-bim-scene__prism-podium">
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--podium-front" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--podium-side" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--podium-top" />
      </div>
      <div className="scan-to-bim-scene__prism-tower">
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--tower-front" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--tower-back" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--tower-left" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--tower-right" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--tower-top" />
      </div>
    </div>
  );
}
