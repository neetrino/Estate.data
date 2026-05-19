/** Proxima Nova — Tailwind `font-sans` (see globals.css). */
export const SITE_FONT_SANS_CLASS = "font-sans";

/** Navbar links + CTA typography (excludes LumenLA wordmark). */
export const NAV_ITEM_TEXT_CLASS = "text-lg font-semibold leading-snug";

/** Trusted partners strip — same sans stack as navbar/hero. */
export const TRUSTED_STRIP_TEXT_CLASS = `${SITE_FONT_SANS_CLASS} text-sm font-semibold uppercase tracking-widest text-muted-foreground`;

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
export const HOME_HERO_IMAGE_PATH = "/images/hero-home.jpg";

/** Bump when replacing hero-home.jpg so browser/Next image cache refreshes. */
export const HOME_HERO_CACHE_VERSION = "20260518-hero-la";

export const HOME_HERO_IMAGE_ALT =
  "Aerial view of a luxury Los Angeles hillside home at golden hour";

/** Minimum recommended hero source width (px). */
export const HOME_HERO_MIN_SOURCE_WIDTH_PX = 2560;

/** Default fetch timeout for API client (ms). */
export const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;

/** API version prefix — keep in sync with apps/api routes. */
export const API_VERSION_PREFIX = "/v1";
