import { ASSET_KEYS, assetUrl } from "@estate/db";

/** Proxima Nova — Tailwind `font-sans` (see globals.css). */
export const SITE_FONT_SANS_CLASS = "font-sans";

/** Navbar links + CTA typography (excludes LumenLA wordmark). */
export const NAV_ITEM_TEXT_CLASS = "text-lg font-semibold leading-snug";

/** Trusted partners strip — same sans stack as navbar/hero. */
export const TRUSTED_STRIP_TEXT_CLASS = `${SITE_FONT_SANS_CLASS} text-sm font-semibold uppercase tracking-widest text-what-we-do-subtitle`;

/** Trusted partners strip layout (width + spacing). */
export const TRUSTED_STRIP_LAYOUT_CLASS =
  "mx-auto flex w-full max-w-screen-2xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 py-7 sm:px-10 sm:py-8 lg:px-16";

/** Navbar row height (Tailwind class). */
export const NAVBAR_HEIGHT_CLASS = "h-[4.5rem]";

/** Space between viewport top and navbar row (6px; 2px above pt-2). */
export const NAVBAR_TOP_PADDING_CLASS = "pt-[1px]";

/** Home hero overlay navbar — out of flow so hero stays full viewport. */
export const NAVBAR_OVERLAY_POSITION_CLASS = "fixed inset-x-0 top-0 z-50";

/**
 * Hero copy top bound — matches overlay navbar (NAVBAR_TOP_PADDING + NAVBAR_HEIGHT).
 * 1px + 4.5rem = 73px.
 */
export const HERO_CONTENT_TOP_INSET_CLASS = "top-[73px]";

/** Pixels scrolled before navbar glass effect activates. */
export const NAVBAR_SCROLL_OFFSET_PX = 8;

/** Shared horizontal page gutters (navbar + hero). */
export const PAGE_GUTTER_CLASS = "px-4 sm:px-6 lg:px-8";

/** Shared centered content width (navbar + hero). */
export const PAGE_CONTAINER_CLASS = "mx-auto w-full max-w-7xl";

/**
 * Home hero background (public path).
 * Use ≥2560px width source for sharp full-screen + Retina (current export may be ~1024px).
 */
export const HOME_HERO_IMAGE_PATH = assetUrl(ASSET_KEYS.homeHero);

/** Bump when replacing hero-home.jpg so browser/Next image cache refreshes. */
export const HOME_HERO_CACHE_VERSION = "20260518-hero-la";

export const HOME_HERO_IMAGE_ALT =
  "Aerial view of a luxury Los Angeles hillside home at golden hour";

/** Minimum recommended hero source width (px). */
export const HOME_HERO_MIN_SOURCE_WIDTH_PX = 2560;

/** What we do — card min height (px); width follows grid to navbar gutters. */
export const WHAT_WE_DO_CARD_HEIGHT_PX = 285;

/** Figma Card 6 (165:692) — corner radius. */
export const WHAT_WE_DO_CARD_RADIUS_PX = 38;

/** What we do card — nudge content block upward (px). */
export const WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX = -5;

/** What we do — icon box / image asset size (px), matches `size-12`. */
export const WHAT_WE_DO_ICON_SIZE_PX = 48;

/** Home stats strip — equal row/column gap. */
export const HOME_STATS_GRID_GAP_CLASS = "gap-8";

/** What we do — uniform row/column/section spacing (px via Tailwind scale). */
export const WHAT_WE_DO_CARD_GRID_GAP_CLASS =
  "gap-x-11 gap-y-11 lg:gap-x-14 lg:gap-y-14";

/** Recent work project tile — design size (px); grid uses full column width up to this. */
export const RECENT_WORK_PROJECT_WIDTH_PX = 592;
export const RECENT_WORK_PROJECT_HEIGHT_PX = 444;

/** Tailwind aspect ratio class (matches original 486×365). */
export const RECENT_WORK_PROJECT_ASPECT_CLASS = "aspect-[486/365]";

/** Property intelligence — scan-to-bim hero image (1024×716 source). */
export const PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS = "aspect-[1024/716]";

/** Client voices testimonial cards — star rating count. */
export const CLIENT_VOICES_STAR_COUNT = 5;

/** Client voices — nudge star row above role baseline (px). */
export const CLIENT_VOICES_STAR_LIFT_CLASS = "-translate-y-[5px]";

/** Estate.data pill CTA — 48px tall pill, 36px icon disc. */
export const ESTATE_CTA_BUTTON_CLASS = "h-12 rounded-[52px]";

/** Nudge label + icon disc right inside the pill (px). */

/** pl-8 (32px) + {@link ESTATE_CTA_CONTENT_OFFSET_PX}. */
export const ESTATE_CTA_BUTTON_PADDING_CLASS = "py-0.5 pl-[35px] pr-0.5";

/** Label-only nudge left inside the pill (5px). */
export const ESTATE_CTA_LABEL_OFFSET_CLASS = "-translate-x-[10px]";

/** Icon disc-only nudge left inside the pill (10px). */
export const ESTATE_CTA_ICON_DISC_OFFSET_CLASS = "-translate-x-[5px]";

/** Default fetch timeout for API client (ms). */
export const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;

/** API version prefix — keep in sync with apps/api routes. */
export const API_VERSION_PREFIX = "/v1";
