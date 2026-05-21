import type { CSSProperties } from "react";
import { PROPERTY_INTELLIGENCE_SCENE_ALT } from "@/features/home/content/propertyIntelligenceCopy";
import {
  SCAN_TO_BIM_SCENE_LABELS,
  SCAN_TO_BIM_SCENE_TIMING,
} from "@/features/home/content/scanToBimSceneCopy";
import {
  ScanToBimBuildingModel,
  ScanToBimVolumePrism,
} from "@/features/home/components/ScanToBimBuildingModel";
import "@/features/home/styles/scan-to-bim-scene.css";

const LABEL_POSITION_CLASS: Record<
  (typeof SCAN_TO_BIM_SCENE_LABELS)[number]["position"],
  string
> = {
  "top-left": "scan-to-bim-scene__label--top-left",
  "top-right": "scan-to-bim-scene__label--top-right",
  "mid-left": "scan-to-bim-scene__label--mid-left",
  "mid-right": "scan-to-bim-scene__label--mid-right",
  "bottom-left": "scan-to-bim-scene__label--bottom-left",
  "bottom-right": "scan-to-bim-scene__label--bottom-right",
};

const LABEL_DOT_CLASS: Record<
  (typeof SCAN_TO_BIM_SCENE_LABELS)[number]["accent"],
  string
> = {
  cyan: "scan-to-bim-scene__label-dot--cyan",
  purple: "scan-to-bim-scene__label-dot--purple",
  yellow: "scan-to-bim-scene__label-dot--yellow",
};

const POINT_VARIANTS = ["cyan", "purple", "warm"] as const;

export function ScanToBimBuildingAnimation() {
  const timingStyle = {
    "--rotation-cycle": `${SCAN_TO_BIM_SCENE_TIMING.rotationCycleS}s`,
    "--scan-cycle": `${SCAN_TO_BIM_SCENE_TIMING.scanCycleS}s`,
  } as CSSProperties;

  return (
    <div
      className="scan-to-bim-scene relative h-full min-h-[17rem] w-full sm:min-h-[19rem] lg:min-h-0"
      style={timingStyle}
      role="img"
      aria-label={PROPERTY_INTELLIGENCE_SCENE_ALT}
    >
      <div className="scan-to-bim-scene__ambient" aria-hidden />
      <div className="scan-to-bim-scene__holo-field" aria-hidden />

      <div className="scan-to-bim-scene__stage" aria-hidden>
        <div className="scan-to-bim-scene__pedestal" />
        <div className="scan-to-bim-scene__turntable">
          <div className="scan-to-bim-scene__shadow" />
          <div className="scan-to-bim-scene__mass">
            <ScanToBimVolumePrism />
            <div className="scan-to-bim-scene__facade">
              <div className="scan-to-bim-scene__holo-grid" />
              <ScanToBimBuildingModel variant="wireframe" />
              <div className="scan-to-bim-scene__bim-layer">
                <ScanToBimBuildingModel variant="solid" />
              </div>
              <div className="scan-to-bim-scene__wire-overlay">
                <ScanToBimBuildingModel variant="wireframe" />
              </div>
              <div className="scan-to-bim-scene__beam-trail scan-to-bim-scene__beam-trail--v" />
              <div className="scan-to-bim-scene__beam scan-to-bim-scene__beam--v" />
              <div className="scan-to-bim-scene__beam-trail scan-to-bim-scene__beam-trail--h" />
              <div className="scan-to-bim-scene__beam scan-to-bim-scene__beam--h" />
              <ScanPointField />
            </div>
          </div>
        </div>
      </div>

      <div className="scan-to-bim-scene__labels" aria-hidden>
        {SCAN_TO_BIM_SCENE_LABELS.map((label) => (
          <div
            key={label.id}
            className={`scan-to-bim-scene__label ${LABEL_POSITION_CLASS[label.position]}`}
          >
            <span className={`scan-to-bim-scene__label-dot ${LABEL_DOT_CLASS[label.accent]}`} />
            <span>{label.text}</span>
          </div>
        ))}
      </div>

      <p className="sr-only">{PROPERTY_INTELLIGENCE_SCENE_ALT}</p>
    </div>
  );
}

function ScanPointField() {
  const points = Array.from({ length: SCAN_TO_BIM_SCENE_TIMING.pointCount }, (_, index) => {
    const left = 16 + (index * 19) % 68;
    const top = 12 + (index * 21) % 74;
    const delay = (index % 11) * 0.38;
    const variant = POINT_VARIANTS[index % POINT_VARIANTS.length];

    return { id: index, left, top, delay, variant };
  });

  return (
    <div className="scan-to-bim-scene__points">
      {points.map((point) => (
        <span
          key={point.id}
          className={`scan-to-bim-scene__point scan-to-bim-scene__point--${point.variant}`}
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
