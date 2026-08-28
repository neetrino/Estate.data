import type { HowItWorksIconId } from "@/features/home/content/howItWorksCopy";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";

export const HOW_IT_WORKS_BG_SOURCES = {
  mobile: STUDIO_MEDIA.heroVilla,
  tablet: STUDIO_MEDIA.heroVilla,
  desktop: STUDIO_MEDIA.heroVilla,
} as const;

const ICON = STUDIO_MEDIA.mark;

export const HOW_IT_WORKS_ICON_SOURCES: Record<
  HowItWorksIconId,
  { display: string; retina: string }
> = {
  "upload-data": { display: ICON, retina: ICON },
  "organize-assets": { display: ICON, retina: ICON },
  "process-store": { display: ICON, retina: ICON },
  "analyze-track": { display: ICON, retina: ICON },
  "scale-grow": { display: ICON, retina: ICON },
};
