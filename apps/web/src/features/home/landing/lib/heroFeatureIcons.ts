import type { FeatureHighlightIcon } from "@/features/home/content/featureHighlightsCopy";

const HERO_FEATURE_ICON_CACHE_VERSION = "20260601";

export const HERO_FEATURE_ICON_PATHS: Record<FeatureHighlightIcon, string> = {
  camera: `/icons/hero/feature/camera.png?v=${HERO_FEATURE_ICON_CACHE_VERSION}`,
  chart: `/icons/hero/feature/chart.png?v=${HERO_FEATURE_ICON_CACHE_VERSION}`,
  rocket: `/icons/hero/feature/rocket.png?v=${HERO_FEATURE_ICON_CACHE_VERSION}`,
};

/** Display size for 3D glass feature icons (includes frosted circle in asset). */
export const HERO_FEATURE_ICON_SIZE_PX = 56;
