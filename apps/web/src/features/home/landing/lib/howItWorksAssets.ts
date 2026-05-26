import type { HowItWorksIconId } from "@/features/home/content/howItWorksCopy";

export const HOW_IT_WORKS_BG_SOURCES = {
  mobile: "/images/how-it-works-bg-1024.webp",
  tablet: "/images/how-it-works-bg-1920.webp",
  desktop: "/images/how-it-works-bg-2560.webp",
} as const;

const HOW_IT_WORKS_ICON_BASE = "/images/how-it-works";

/** Retina-ready WebP paths keyed by step icon id. */
export const HOW_IT_WORKS_ICON_SOURCES: Record<
  HowItWorksIconId,
  { display: string; retina: string }
> = {
  "upload-data": {
    display: `${HOW_IT_WORKS_ICON_BASE}/upload-data-160.webp`,
    retina: `${HOW_IT_WORKS_ICON_BASE}/upload-data-320.webp`,
  },
  "organize-assets": {
    display: `${HOW_IT_WORKS_ICON_BASE}/organize-assets-160.webp`,
    retina: `${HOW_IT_WORKS_ICON_BASE}/organize-assets-320.webp`,
  },
  "process-store": {
    display: `${HOW_IT_WORKS_ICON_BASE}/process-store-160.webp`,
    retina: `${HOW_IT_WORKS_ICON_BASE}/process-store-320.webp`,
  },
  "analyze-track": {
    display: `${HOW_IT_WORKS_ICON_BASE}/analyze-track-160.webp`,
    retina: `${HOW_IT_WORKS_ICON_BASE}/analyze-track-320.webp`,
  },
  "scale-grow": {
    display: `${HOW_IT_WORKS_ICON_BASE}/scale-grow-160.webp`,
    retina: `${HOW_IT_WORKS_ICON_BASE}/scale-grow-320.webp`,
  },
};
