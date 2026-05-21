import type { ReactNode } from "react";
import type { HowItWorksAccent, HowItWorksIconId } from "@/features/home/content/howItWorksCopy";

type HowItWorksStepIconProps = {
  icon: HowItWorksIconId;
  accent: HowItWorksAccent;
};

const ACCENT_STROKE: Record<HowItWorksAccent, string> = {
  purple: "#873c83",
  cyan: "#16c0da",
  yellow: "#fdba2c",
  orange: "#e55100",
  navy: "#2e4873",
};

export function HowItWorksStepIcon({ icon, accent }: HowItWorksStepIconProps) {
  const stroke = ACCENT_STROKE[accent];

  return (
    <svg
      className="size-8"
      viewBox="0 0 32 32"
      fill="none"
      stroke={stroke}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {iconPaths[icon]}
    </svg>
  );
}

const iconPaths: Record<HowItWorksIconId, ReactNode> = {
  "upload-data": (
    <>
      <path d="M16 4 6 9v14l10 5 10-5V9L16 4z" />
      <path d="M16 14v10M11 11.5 16 14l5-2.5" />
      <path d="M6 9l10 5 10-5" />
    </>
  ),
  "organize-assets": (
    <>
      <rect x="5" y="8" width="11" height="14" rx="1.5" />
      <rect x="16" y="10" width="11" height="12" rx="1.5" />
      <path d="M8 12h5M8 16h5M19 14h5M19 18h5" />
    </>
  ),
  "process-store": (
    <>
      <path d="M16 5 8 9v14l8 4 8-4V9l-8-4z" />
      <circle cx="16" cy="16" r="4" />
      <path d="M16 14v4M14 16h4" />
    </>
  ),
  "analyze-track": (
    <>
      <path d="M6 26h20" />
      <path d="M8 20l5-8 4 5 9-12" />
      <path d="M22 6h3v3" />
    </>
  ),
  "scale-grow": (
    <>
      <path d="M6 24V14M12 24V10M18 24V16M24 24V8" />
      <path d="M6 24h20" />
      <path d="m20 8 4-4 4 4" />
    </>
  ),
};
