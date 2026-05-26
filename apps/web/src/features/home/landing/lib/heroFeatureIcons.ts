import type { FeatureHighlightIcon } from "@/features/home/content/featureHighlightsCopy";

const HERO_FEATURE_ICON_CACHE_VERSION = "20260526-removebg";

export const HERO_FEATURE_ICON_PATHS: Record<FeatureHighlightIcon, string> = {
  camera: `/images/hero/feature-icons/camera.png?v=${HERO_FEATURE_ICON_CACHE_VERSION}`,
  chart: `/images/hero/feature-icons/chart.png?v=${HERO_FEATURE_ICON_CACHE_VERSION}`,
  rocket: `/images/hero/feature-icons/rocket.png?v=${HERO_FEATURE_ICON_CACHE_VERSION}`,
};

/** Display size for 3D glass feature icons (includes frosted circle in asset). */
export const HERO_FEATURE_ICON_SIZE_PX = 56;
