import { ASSET_KEYS, assetUrl } from "@estate/db";

/** Proxima Nova — Tailwind `font-sans` (see globals.css). */
export const SITE_FONT_SANS_CLASS = "font-sans";

/** Navbar links + CTA typography (excludes Estate Data wordmark). */
export const NAV_ITEM_TEXT_CLASS = "text-base font-semibold leading-snug sm:text-lg";

/** Trusted partners strip — same sans stack as navbar/hero. */
export const TRUSTED_STRIP_TEXT_CLASS = `${SITE_FONT_SANS_CLASS} text-sm font-semibold uppercase tracking-widest text-what-we-do-subtitle`;

/** Trusted partners strip layout (width + spacing). */
export const TRUSTED_STRIP_LAYOUT_CLASS =
  "mx-auto flex w-full max-w-screen-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-6 sm:gap-x-10 sm:gap-y-4 sm:px-8 sm:py-7 md:gap-x-12 lg:px-16 lg:py-8";

/** Navbar row height (Tailwind class). */
export const NAVBAR_HEIGHT_CLASS = "h-[4.5rem]";

/** Logo display — navbar (px: 56×91). */
export const LOGO_NAV_HEIGHT_CLASS = "h-14";
export const LOGO_NAV_WIDTH_CLASS = "w-[5.6875rem]";

/** Logo display — footer (~43% larger than nav). */
export const LOGO_FOOTER_HEIGHT_CLASS = "h-20";
export const LOGO_FOOTER_WIDTH_CLASS = "w-[8.125rem]";

/** Footer logo — nudge right and down (px). */
export const LOGO_FOOTER_OFFSET_CLASS = "-translate-x-[3px] translate-y-[2px]";

/** Footer tagline — space below logo (px). */
export const FOOTER_BRAND_TAGLINE_OFFSET_CLASS = "mt-[31px]";

/** Space between viewport top and navbar row (safe area + 1px). */
export const NAVBAR_TOP_PADDING_CLASS = "pt-[max(1px,env(safe-area-inset-top))]";

/** Home hero overlay navbar — fixed to viewport (must sit outside overflow-hidden hero). */
export const NAVBAR_OVERLAY_POSITION_CLASS = "fixed inset-x-0 top-0 z-[100]";

/** Sticky navbar on inner pages — above page content, below mobile menu layer. */
export const NAVBAR_STICKY_POSITION_CLASS = "sticky top-0 z-[100]";

/** Header while mobile menu is open — above drawer + backdrop. */
export const NAVBAR_HEADER_MENU_OPEN_Z_CLASS = "z-[110]";

/** Mobile menu backdrop — below drawer, below header when open. */
export const NAVBAR_MOBILE_BACKDROP_Z_CLASS = "z-[105]";

/** Mobile menu drawer — below open header. */
export const NAVBAR_MOBILE_PANEL_Z_CLASS = "z-[108]";

/** Viewport ≤1399px — burger control (phone, tablet, iPad Pro). */
export const NAVBAR_MOBILE_BURGER_CLASS = "hidden max-[1399px]:inline-flex min-[1400px]:hidden";

/** Viewport ≤1399px — mobile menu layers. */
export const NAVBAR_MOBILE_MENU_CLASS = "max-[1399px]:block min-[1400px]:hidden";

/** Viewport ≥1400px — full desktop nav. */
export const NAVBAR_DESKTOP_ONLY_CLASS = "hidden min-[1400px]:flex";

/**
 * Mobile menu panel — nudge up under navbar (px).
 * Keep in sync with {@link NAVBAR_MOBILE_PANEL_TOP_CLASS}.
 */
export const NAVBAR_MOBILE_PANEL_TOP_OFFSET_PX = 12;

/**
 * Mobile menu panel top — navbar row + safe area, minus {@link NAVBAR_MOBILE_PANEL_TOP_OFFSET_PX}.
 * Keep in sync with NAVBAR_TOP_PADDING + NAVBAR_HEIGHT + safe-area.
 */
export const NAVBAR_MOBILE_PANEL_TOP_CLASS =
  "top-[calc(4.5rem+1px+env(safe-area-inset-top,0px)-12px)]";

/**
 * Hero copy top bound — matches overlay navbar (safe area + 1px + 4.5rem).
 */
export const HERO_CONTENT_TOP_INSET_CLASS =
  "top-[calc(4.5rem+1px+env(safe-area-inset-top,0px))]";

/** Pixels scrolled before navbar glass effect activates. */
export const NAVBAR_SCROLL_OFFSET_PX = 8;

/** Navbar + mobile menu — liquid glass surface (keep in sync). */
export const NAVBAR_GLASS_SURFACE_CLASS =
  "bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150";

/** Mobile burger drawer — solid white panel. */
export const NAVBAR_MOBILE_PANEL_SURFACE_CLASS =
  "border-t border-zinc-200/80 bg-white shadow-lg";

/** Mobile burger menu panel — corner radius (px). */
export const NAVBAR_MOBILE_MENU_RADIUS_PX = 15;

/** Mobile burger menu panel — corner radius (Tailwind). */
export const NAVBAR_MOBILE_MENU_RADIUS_CLASS = "rounded-[15px]";

/** Mobile drawer — scrollable link list area. */
export const NAVBAR_MOBILE_PANEL_SCROLL_CLASS =
  "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-5";

/** Mobile drawer — stacked links with dividers. */
export const NAVBAR_MOBILE_NAV_LIST_CLASS =
  "flex w-full flex-col divide-y divide-zinc-200/80";

/** Shared horizontal page gutters (navbar + hero). */
export const PAGE_GUTTER_CLASS = "px-4 sm:px-6 lg:px-8 xl:px-10";

/** Shared centered content width (navbar + hero). */
export const PAGE_CONTAINER_CLASS = "mx-auto w-full max-w-7xl 2xl:max-w-[90rem]";

/** Section vertical rhythm — mobile through desktop. */
export const SECTION_VERTICAL_PADDING_CLASS = "py-12 sm:py-14 md:py-16 lg:py-20";

/** Dark gradient marketing cards (What we do, media, pricing). */
export const GRADIENT_CARD_PADDING_CLASS = "px-5 py-6 sm:px-8 sm:py-8";

/** Pricing package cards — slightly tighter vertical padding. */
export const PRICING_CARD_PADDING_CLASS = "px-5 py-6 sm:px-8 sm:py-7";

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

/** What we do / pricing package cards — dark gradient surface + inset glow. */
export const WHAT_WE_DO_CARD_SURFACE_STYLE = {
  borderRadius: WHAT_WE_DO_CARD_RADIUS_PX,
  background: "var(--what-we-do-card-background)",
  boxShadow: "var(--what-we-do-card-inset-shadow)",
} as const;

/** Pricing package cards — min height for price + features + CTA (px). */
export const PRICING_PACKAGE_CARD_MIN_HEIGHT_PX = 340;

/** Media packages — horizontal inset for book CTA on each side (px). */
export const PRICING_MEDIA_CTA_INSET_X_PX = 58;

/** Analytics “Talk to sales” — horizontal inset on each side (px). */
export const PRICING_ANALYTICS_CTA_INSET_X_PX = 65;

/** Media packages — gap above CTA (px). */
export const PRICING_MEDIA_CTA_MARGIN_TOP_PX = 32;

/** Media packages — extra upward nudge via transform (px). */
export const PRICING_MEDIA_CTA_LIFT_PX = 17;

/** Analytics — gap above CTA (px). */
export const PRICING_ANALYTICS_CTA_MARGIN_TOP_PX = 16;

/** Pricing — phone + tablet/iPad (≤1399px). Tune mobile here; leave desktop block below. */
export const PRICING_GRID_MOBILE_TABLET_CLASS =
  "grid grid-cols-1 md:grid-cols-2 md:max-[1399px]:!grid-cols-2";

export const PRICING_CTA_MOBILE_TABLET_CLASS =
  "max-w-full justify-center self-center max-[1399px]:!w-auto";

/** Media packages — phone only: CTA +5px (md+ uses tablet/desktop rules below). */
export const PRICING_MEDIA_CTA_MOBILE_ONLY_CLASS = "max-md:-translate-y-[5px]";

/** Pricing — desktop Figma (lg+, iPad stays 2-col via max-[1399px] overrides). */
export const PRICING_GRID_DESKTOP_CLASS = "lg:grid-cols-3";

export const PRICING_CTA_DESKTOP_CLASS = [
  "w-[calc(100%-2rem)]",
  "sm:w-[calc(100%-4.5rem)]",
  "lg:w-[calc(100%-7.25rem)]",
].join(" ");

export const PRICING_MEDIA_CTA_DESKTOP_CLASS = [
  "lg:-translate-y-[17px]",
  "max-[1399px]:!translate-y-0",
].join(" ");

export const PRICING_PACKAGE_GRID_CLASS = [
  PRICING_GRID_MOBILE_TABLET_CLASS,
  PRICING_GRID_DESKTOP_CLASS,
].join(" ");

export const PRICING_PACKAGE_CTA_BUTTON_CLASS = [
  PRICING_CTA_MOBILE_TABLET_CLASS,
  PRICING_CTA_DESKTOP_CLASS,
].join(" ");

export const PRICING_MEDIA_CTA_BUTTON_CLASS = [
  PRICING_PACKAGE_CTA_BUTTON_CLASS,
  PRICING_MEDIA_CTA_MOBILE_ONLY_CLASS,
  PRICING_MEDIA_CTA_DESKTOP_CLASS,
].join(" ");

/** Pricing card CTA row — centered; spacing via Tailwind (32px / 16px). */
export const PRICING_MEDIA_CTA_WRAP_CLASS = "mt-8 flex w-full justify-center";

export const PRICING_ANALYTICS_CTA_WRAP_CLASS = "mt-4 flex w-full justify-center";

/** What we do card — nudge content block upward (px). */
export const WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX = -5;

/** What we do — icon box / image asset size (px), matches `size-12`. */
export const WHAT_WE_DO_ICON_SIZE_PX = 48;

/** Home stats strip — equal row/column gap. */
export const HOME_STATS_GRID_GAP_CLASS = "gap-8";

/** What we do — uniform row/column/section spacing (px via Tailwind scale). */
export const WHAT_WE_DO_CARD_GRID_GAP_CLASS =
  "gap-x-6 gap-y-6 sm:gap-x-11 sm:gap-y-11 lg:gap-x-14 lg:gap-y-14";

/** Site footer — Services & Company columns nudge left on large screens only. */
export const FOOTER_LINK_COLUMNS_OFFSET_CLASS = "lg:-translate-x-[20px]";

/** Site footer — top edge line separating footer from page content. */
export const FOOTER_TOP_SEPARATOR_CLASS = "border-t border-foreground/10";

/** Site footer — main row; stacked mobile, 2-col tablet, spread desktop. */
export const FOOTER_MAIN_ROW_CLASS =
  "grid w-full grid-cols-1 gap-10 pt-10 pb-4 sm:grid-cols-2 sm:pt-12 sm:pb-6 lg:flex lg:items-start lg:justify-between lg:gap-0";

/** Site footer — brand block spans full width below sm, single column on lg row. */
export const FOOTER_BRAND_COLUMN_CLASS = "sm:col-span-2 lg:col-span-1 lg:max-w-xs";

/** Site footer — divider + copyright block below main row. */
export const FOOTER_DIVIDER_CLASS =
  `mt-3 ${FOOTER_TOP_SEPARATOR_CLASS} bg-white pt-6 pb-10 sm:pb-12`;

/** Recent work project tile — design size (px); grid uses full column width up to this. */
export const RECENT_WORK_PROJECT_WIDTH_PX = 592;
export const RECENT_WORK_PROJECT_HEIGHT_PX = 444;

/** Tailwind aspect ratio class (matches original 486×365). */
export const RECENT_WORK_PROJECT_ASPECT_CLASS = "aspect-[486/365]";

/** Property intelligence — scan-to-bim hero image (1024×716 source). */
export const PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS = "aspect-[1024/716]";

/** Home property intelligence — visual frame; lg height aligns with eyebrow through CTA. */
export const PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS =
  "relative w-full min-h-[17rem] overflow-hidden rounded-3xl aspect-[4/3] sm:min-h-[19rem] lg:aspect-auto lg:h-full lg:min-h-0";

/** Property intelligence pages (/data-bim, /media) — page header typography. */
export const PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-property-intelligence-accent sm:text-base";

export const PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-property-intelligence-navy sm:text-4xl md:text-5xl lg:text-[3rem]";

export const PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-property-intelligence-navy sm:text-xl";

/** Estate pill — “Explore data services” on home property intelligence block. */
export const PROPERTY_INTELLIGENCE_CTA_CLASS =
  "bg-property-intelligence-accent text-white hover:opacity-90 [&>span:last-child]:bg-property-intelligence-navy";

/** Solutions page — #FDBA2C eyebrow; subtitle uses gold + client-voices-accent. */
export const SOLUTIONS_PAGE_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-home-listing-cta-book sm:text-base";

export const SOLUTIONS_PAGE_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-client-voices-accent sm:text-4xl md:text-5xl lg:text-[3rem]";

export const SOLUTIONS_PAGE_SUBTITLE_CLASS = "mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl";

/** Contact page — yellow eyebrow, orange title, yellow subtitle. */
export const CONTACT_PAGE_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-home-listing-cta-book sm:text-base";

export const CONTACT_PAGE_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-client-voices-accent sm:text-4xl md:text-5xl lg:text-[3rem]";

export const CONTACT_PAGE_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-home-listing-cta-book sm:text-xl";

/** About page — yellow eyebrow, orange title, black body copy. */
export const ABOUT_PAGE_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-home-listing-cta-book sm:text-base";

export const ABOUT_PAGE_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-client-voices-accent sm:text-4xl md:text-5xl lg:text-[3rem]";

export const ABOUT_PAGE_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-foreground sm:text-xl";

/** About page main — tighter top gap below sticky navbar. */
export const ABOUT_PAGE_MAIN_CLASS = [
  "bg-what-we-do-surface",
  "pt-5 pb-12 sm:pt-6 sm:pb-14 md:pt-14 md:pb-16 lg:pb-20",
].join(" ");

/** Solutions role cards — white shell + orange glow (px radius matches pricing cards). */
export const SOLUTIONS_ROLE_CARD_SHELL_CLASS = [
  "rounded-[38px] border border-[var(--solutions-role-card-orange-ring)] bg-white",
  "shadow-[var(--solutions-role-card-orange-shadow)]",
].join(" ");

/** Media services cards — black surface + blue glow. */
export const MEDIA_SERVICE_CARD_SURFACE_STYLE = {
  borderRadius: WHAT_WE_DO_CARD_RADIUS_PX,
  background: "var(--media-service-card-background)",
  boxShadow:
    "var(--media-service-card-outer-shadow), var(--media-service-card-inset-shadow)",
} as const;

/** Media services cards — matches What we do tile height (px). */
export const MEDIA_SERVICE_CARD_MIN_HEIGHT_PX = 285;

/** Client voices testimonial cards — star rating count. */
export const CLIENT_VOICES_STAR_COUNT = 5;

/** Client voices — nudge star row above role baseline (px). */
export const CLIENT_VOICES_STAR_LIFT_CLASS = "-translate-y-[5px]";

/** Client voices — shift quote glyphs left to align with quote text. */
export const CLIENT_VOICES_QUOTE_OFFSET_CLASS = "-ml-[14px]";

/** Client voices section — eyebrow label typography. */
export const CLIENT_VOICES_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-client-voices-accent sm:text-base";

/** Client voices section — main heading typography. */
export const CLIENT_VOICES_SECTION_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[3rem]";

/** Client voices section — white surface + vertical rhythm. */
export const CLIENT_VOICES_SECTION_SURFACE_CLASS =
  `bg-white ${SECTION_VERTICAL_PADDING_CLASS}`;

/** What we do / recent work sections — warm off-white surface + vertical rhythm. */
export const WHAT_WE_DO_SECTION_SURFACE_CLASS =
  `bg-what-we-do-surface ${SECTION_VERTICAL_PADDING_CLASS}`;

/** Home listing CTA — purple gradient panel below client voices. */
export const HOME_LISTING_CTA_PANEL_CLASS =
  "home-listing-cta-panel overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12";

/** Estate pill — lavender surface, black label, purple icon disc (listing CTA). */
export const HOME_LISTING_CTA_PRIMARY_BUTTON_CLASS = [
  "bg-home-listing-cta-button text-home-listing-cta-button-foreground",
  "[&>span:last-child]:bg-home-listing-cta-button-icon [&>span:last-child]:text-white",
].join(" ");

/** Listing CTA — “View Pricing” outline; no hover fill/border change. */
export const HOME_LISTING_CTA_SECONDARY_BUTTON_CLASS =
  "hover:!border-brand-purple/30 hover:!bg-white";

/** Estate.data pill CTA — 48px tall, fully rounded ends. */
export const ESTATE_CTA_BUTTON_CLASS = "h-12 rounded-full";

/** Nudge label + icon disc right inside the pill (px). */

/** pl-8 (32px) + {@link ESTATE_CTA_CONTENT_OFFSET_PX}. */
export const ESTATE_CTA_BUTTON_PADDING_CLASS = "py-0.5 pl-[35px] pr-0.5";

/** Label-only nudge left inside the pill (5px). */
export const ESTATE_CTA_LABEL_OFFSET_CLASS = "-translate-x-[10px]";

/** Icon disc-only nudge left inside the pill (10px). */
export const ESTATE_CTA_ICON_DISC_OFFSET_CLASS = "-translate-x-[5px]";

/** Book Cinematic+ pricing CTA — icon disc further left (long label). */
export const PRICING_CINEMATIC_PLUS_CTA_ICON_DISC_CLASS = "[&>span:last-child]:-translate-x-[14px]";

/** Default fetch timeout for API client (ms). */
export const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;

/** API version prefix — keep in sync with apps/api routes. */
export const API_VERSION_PREFIX = "/v1";
