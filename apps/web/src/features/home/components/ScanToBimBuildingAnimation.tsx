import type { CSSProperties } from "react";
import { PROPERTY_INTELLIGENCE_SCENE_ALT } from "@/features/home/content/propertyIntelligenceCopy";

const SCAN_CYCLE_S = 5.5;
const ORBIT_CYCLE_S = 26;
const POINT_COUNT = 36;

export function ScanToBimBuildingAnimation() {
  const timingStyle = {
    "--scan-cycle": `${SCAN_CYCLE_S}s`,
    "--orbit-cycle": `${ORBIT_CYCLE_S}s`,
  } as CSSProperties;

  return (
    <div
      className="scan-to-bim-scene relative size-full min-h-[16rem] sm:min-h-[18rem]"
      style={timingStyle}
      role="img"
      aria-label={PROPERTY_INTELLIGENCE_SCENE_ALT}
    >
      <div className="scan-to-bim-scene__grid" aria-hidden />
      <div className="scan-to-bim-scene__orbit" aria-hidden>
        <div className="scan-to-bim-scene__stack">
          <div className="scan-to-bim-scene__volume scan-to-bim-scene__volume--rear">
            <BuildingSvg variant="wireframe" />
          </div>
          <div className="scan-to-bim-scene__volume scan-to-bim-scene__volume--main">
            <div className="scan-to-bim-scene__shadow" aria-hidden />
            <div className="scan-to-bim-scene__mass">
              <BuildingVolumePrism />
              <div className="scan-to-bim-scene__facade">
                <BuildingSvg variant="wireframe" />
                <div className="scan-to-bim-scene__reveal">
                  <BuildingSvg variant="solid" />
                </div>
                <div className="scan-to-bim-scene__laser-trail" />
                <div className="scan-to-bim-scene__laser" />
                <ScanPointField />
              </div>
            </div>
          </div>
          <div className="scan-to-bim-scene__volume scan-to-bim-scene__volume--front">
            <BuildingSvg variant="wireframe" />
          </div>
        </div>
      </div>
      <p className="sr-only">{PROPERTY_INTELLIGENCE_SCENE_ALT}</p>
    </div>
  );
}

type BuildingVariant = "wireframe" | "solid";

function BuildingVolumePrism() {
  return (
    <div className="scan-to-bim-scene__prism" aria-hidden>
      <div className="scan-to-bim-scene__prism-wing">
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--wing-front" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--wing-side" />
        <div className="scan-to-bim-scene__face scan-to-bim-scene__face--wing-top" />
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

function BuildingSvg({ variant }: { variant: BuildingVariant }) {
  const isWireframe = variant === "wireframe";

  return (
    <svg
      className="scan-to-bim-scene__building-svg"
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="bim-scan-front" x1="120" y1="50" x2="120" y2="248" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16c0da" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#2e4873" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#873c83" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="bim-scan-side" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16c0da" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#2e4873" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="bim-scan-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16c0da" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#2e4873" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <ellipse cx="120" cy="258" rx="90" ry="14" fill="#2e4873" fillOpacity={isWireframe ? 0.08 : 0.14} />

      <g className={isWireframe ? "scan-to-bim-scene__wire" : undefined}>
        <path
          d="M44 248V104l28-20 48-10 48 10 28 20v124H44z"
          fill={isWireframe ? "none" : "url(#bim-scan-side)"}
          stroke="#2e4873"
          strokeWidth={isWireframe ? 1.2 : 1.5}
          strokeLinejoin="round"
        />
        <path
          d="M72 84 120 74l48 10v164H72V84z"
          fill={isWireframe ? "none" : "url(#bim-scan-front)"}
          stroke="#16c0da"
          strokeWidth={isWireframe ? 1.2 : 2}
          strokeLinejoin="round"
        />
        <path
          d="M72 84 120 74l48 10-28 20-48 10-48-10L72 84z"
          fill={isWireframe ? "none" : "url(#bim-scan-roof)"}
          stroke="#16c0da"
          strokeWidth={isWireframe ? 1 : 1.5}
          strokeLinejoin="round"
        />
        <path
          d="M168 118 200 132v96l-32-16V118z"
          fill={isWireframe ? "none" : "url(#bim-scan-side)"}
          stroke="#2e4873"
          strokeWidth={isWireframe ? 1 : 1.2}
          strokeLinejoin="round"
        />

        {[88, 104, 120, 136, 152].map((x) => (
          <path
            key={x}
            d={`M${x} 248V${x === 120 ? 98 : 108}`}
            stroke="#16c0da"
            strokeOpacity={isWireframe ? 0.55 : 0.35}
            strokeWidth="1"
          />
        ))}

        <path
          d="M120 74v20M72 104l48-10 48 10M72 104l48 10 48 10"
          stroke="#c364be"
          strokeOpacity={isWireframe ? 0.5 : 0.25}
          strokeWidth="1"
          strokeDasharray={isWireframe ? "5 4" : "0"}
        />

        {!isWireframe ? (
          <>
            <rect x="84" y="162" width="20" height="24" rx="1" fill="#16c0da" fillOpacity="0.22" stroke="#2e4873" strokeWidth="1" />
            <rect x="110" y="146" width="20" height="24" rx="1" fill="#16c0da" fillOpacity="0.3" stroke="#2e4873" strokeWidth="1" />
            <rect x="136" y="162" width="20" height="24" rx="1" fill="#16c0da" fillOpacity="0.22" stroke="#2e4873" strokeWidth="1" />
          </>
        ) : null}
      </g>
    </svg>
  );
}

function ScanPointField() {
  const points = Array.from({ length: POINT_COUNT }, (_, index) => {
    const left = 18 + (index * 17) % 64;
    const top = 14 + (index * 23) % 72;
    const delay = (index % 9) * 0.45;

    return { id: index, left, top, delay };
  });

  return (
    <div className="scan-to-bim-scene__points" aria-hidden>
      {points.map((point) => (
        <span
          key={point.id}
          className="scan-to-bim-scene__point"
          style={
            {
              left: `${point.left}%`,
              top: `${point.top}%`,
              animationDelay: `${point.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
