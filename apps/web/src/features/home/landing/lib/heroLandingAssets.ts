import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";

const VILLA = STUDIO_MEDIA.heroVilla;

export const HERO_LANDING_BG_SOURCES = {
  mobile: VILLA,
  tablet: VILLA,
  desktop: VILLA,
} as const;

export const WHAT_WE_DO_BG_SOURCES = {
  mobile: VILLA,
  tablet: VILLA,
  desktop: VILLA,
} as const;

export const HOME_STATS_BG_SOURCES = {
  mobile: VILLA,
  tablet: VILLA,
  desktop: VILLA,
} as const;

export const HOME_PROPERTY_INTELLIGENCE_BG_SOURCES = {
  mobile: STUDIO_MEDIA.scanBim,
  tablet: STUDIO_MEDIA.scanBim,
  desktop: STUDIO_MEDIA.scanBim,
} as const;

export const HOME_PROPERTY_INTELLIGENCE_VISUAL_SOURCES = {
  default: STUDIO_MEDIA.scanBim,
  retina: STUDIO_MEDIA.scanBim,
} as const;

export const HOME_CLIENT_VOICES_BG_SOURCES = {
  mobile: VILLA,
  tablet: VILLA,
  desktop: VILLA,
} as const;
