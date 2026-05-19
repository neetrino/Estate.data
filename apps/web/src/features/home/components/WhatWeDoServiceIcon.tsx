import type { ReactNode } from "react";
import type { WhatWeDoServiceIconId } from "@/features/home/content/whatWeDoCopy";

type WhatWeDoServiceIconProps = {
  icon: WhatWeDoServiceIconId;
};

export function WhatWeDoServiceIcon({ icon }: WhatWeDoServiceIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {iconPaths[icon]}
    </svg>
  );
}

const iconPaths: Record<WhatWeDoServiceIconId, ReactNode> = {
  photography: (
    <>
      <path d="M4 8h4l2-2h4l2 2h4v10H4V8z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  "cinematic-video": (
    <>
      <rect x="3" y="7" width="14" height="10" rx="2" />
      <path d="M17 10l4-2v8l-4-2" />
    </>
  ),
  "drone-aerial": (
    <>
      <path d="M12 14v4" />
      <path d="M8 12l-4-2M16 12l4-2" />
      <path d="M6 10l2-4M18 10l-2-4" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  "tours-floorplans": (
    <>
      <path d="M12 4 4 8v8l8 4 8-4V8l-8-4z" />
      <path d="M4 8l8 4 8-4M12 12v8" />
    </>
  ),
  "scan-to-bim": (
    <>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M4 8l8 4 8-4" />
      <path d="M12 12v8" />
      <path d="M9 16h6" />
    </>
  ),
  "market-intelligence": (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 15v-3M12 15V9M16 15V6" />
    </>
  ),
};
