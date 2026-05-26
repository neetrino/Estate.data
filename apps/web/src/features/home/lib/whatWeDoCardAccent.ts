import type { WhatWeDoService } from "@/features/home/content/whatWeDoCopy";

/** Neon card accent — matches reference art variants (purple / cyan / sunset). */
export type WhatWeDoNeonCardAccent = "purple" | "cyan" | "sunset";

const WHAT_WE_DO_CARD_ACCENT_BY_ID: Record<WhatWeDoService["id"], WhatWeDoNeonCardAccent> = {
  photography: "purple",
  "cinematic-video": "cyan",
  "drone-aerial": "cyan",
  "tours-floorplans": "sunset",
  "scan-to-bim": "sunset",
  "market-intelligence": "purple",
};

const WHAT_WE_DO_NEON_CARD_BASE_CLASS = "what-we-do-neon-card";

/** Modifier class for a service card surface accent. */
export function whatWeDoNeonCardClassName(serviceId: WhatWeDoService["id"]): string {
  const accent = WHAT_WE_DO_CARD_ACCENT_BY_ID[serviceId];
  const compactIconClass = whatWeDoNeonCardUsesCompactIcon(serviceId)
    ? "what-we-do-neon-card--compact-icon"
    : "";

  return [WHAT_WE_DO_NEON_CARD_BASE_CLASS, `what-we-do-neon-card--${accent}`, compactIconClass]
    .filter(Boolean)
    .join(" ");
}

/** Photography + Cinematic Video — slightly smaller icons in the planet ring. */
export function whatWeDoNeonCardUsesCompactIcon(serviceId: WhatWeDoService["id"]): boolean {
  return serviceId === "photography" || serviceId === "cinematic-video";
}
