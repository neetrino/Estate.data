import type { MediaServiceIconId } from "@/features/media/content/mediaServicesCopy";

export type MediaServiceImagePosition = "center" | "center right";

type MediaServiceAssetEntry = {
  readonly iconSrc: string;
  readonly imageSrc: string;
  readonly imagePosition: MediaServiceImagePosition;
};

const MEDIA_SERVICE_ICONS_BASE = "/images/media-services/icons";
const MEDIA_SERVICE_CARDS_BASE = "/images/media-services/cards";

/** Static icon + card background paths for /media service tiles. */
export const MEDIA_SERVICE_ASSETS: Record<MediaServiceIconId, MediaServiceAssetEntry> = {
  photography: {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/photography.png`,
    imageSrc: `${MEDIA_SERVICE_CARDS_BASE}/photography.png`,
    imagePosition: "center right",
  },
  "cinematic-video": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/cinematic-video.png`,
    imageSrc: `${MEDIA_SERVICE_CARDS_BASE}/cinematic-video.png`,
    imagePosition: "center right",
  },
  "drone-aerial": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/drone-aerial.png`,
    imageSrc: `${MEDIA_SERVICE_CARDS_BASE}/drone-aerial.png`,
    imagePosition: "center",
  },
  "tours-floorplans": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/tours-floorplans.png`,
    imageSrc: `${MEDIA_SERVICE_CARDS_BASE}/tours-floorplans.png`,
    imagePosition: "center",
  },
  staging: {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/staging.png`,
    imageSrc: `${MEDIA_SERVICE_CARDS_BASE}/staging.png`,
    imagePosition: "center right",
  },
  "listing-websites": {
    iconSrc: `${MEDIA_SERVICE_ICONS_BASE}/listing-websites.png`,
    imageSrc: `${MEDIA_SERVICE_CARDS_BASE}/listing-websites.png`,
    imagePosition: "center right",
  },
} as const;
