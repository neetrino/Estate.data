import type { MediaServiceIconId } from "@/features/media/content/mediaServicesCopy";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";

export type MediaServiceImagePosition = "center" | "center right";

type MediaServiceAssetEntry = {
  readonly iconSrc: string;
  readonly imageSrc: string;
  readonly imagePosition: MediaServiceImagePosition;
};

const MEDIA_SERVICE_ICONS_BASE = "/icons/media-services";

export const MEDIA_SERVICE_ASSETS: Record<MediaServiceIconId, MediaServiceAssetEntry> = {
  photography: {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/photography.png`,
    imageSrc: STUDIO_MEDIA.photography,
    imagePosition: "center right",
  },
  "cinematic-video": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/cinematic-video.png`,
    imageSrc: STUDIO_MEDIA.photography,
    imagePosition: "center right",
  },
  "drone-aerial": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/drone-aerial.png`,
    imageSrc: STUDIO_MEDIA.drone,
    imagePosition: "center",
  },
  "tours-floorplans": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/tours-floorplans.png`,
    imageSrc: STUDIO_MEDIA.matterport,
    imagePosition: "center",
  },
  staging: {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/staging.png`,
    imageSrc: STUDIO_MEDIA.afterStaged,
    imagePosition: "center right",
  },
  "listing-websites": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/listing-websites.png`,
    imageSrc: STUDIO_MEDIA.landingPage,
    imagePosition: "center right",
  },
} as const;
