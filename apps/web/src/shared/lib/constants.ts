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
export const NAVBAR_STICKY_POSITION_CLASS = "sticky top-0 z-[100] w-full self-start";

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
 * Mobile menu panel top — landing pill navbar (safe area + pill + vertical padding).
 * Keep in sync with {@link NAVBAR_LANDING_PILL_MAIN_OFFSET_CLASS}.
 */
export const NAVBAR_MOBILE_PANEL_TOP_LANDING_PILL_CLASS = [
  "top-[calc(7.75rem-7px+env(safe-area-inset-top,0px)-12px)]",
  "sm:top-[calc(8rem-7px+env(safe-area-inset-top,0px)-12px)]",
  "lg:top-[calc(8.25rem-7px+env(safe-area-inset-top,0px)-12px)]",
].join(" ");

/** Main content offset below fixed landing pill navbar (sync with home hero). */
export const NAVBAR_LANDING_PILL_MAIN_OFFSET_CLASS = [
  "pt-[calc(7.75rem-7px+env(safe-area-inset-top,0px))]",
  "sm:pt-[calc(8rem-7px+env(safe-area-inset-top,0px))]",
  "lg:pt-[calc(8.25rem-7px+env(safe-area-inset-top,0px))]",
].join(" ");

/**
 * Hero copy top bound — matches overlay navbar (safe area + 1px + 4.5rem).
 */
export const HERO_CONTENT_TOP_INSET_CLASS =
  "top-[calc(4.5rem+1px+env(safe-area-inset-top,0px))]";

/** Pixels scrolled before navbar glass effect activates. */
export const NAVBAR_SCROLL_OFFSET_PX = 8;

/** Burger tap — ignore duplicate pointer/click within this window (iOS Chrome/Safari). */
export const NAVBAR_BURGER_TOGGLE_DEBOUNCE_MS = 400;

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

/** Shared centered content width (navbar + pages + footer). */
export const PAGE_CONTAINER_CLASS = "mx-auto w-full max-w-7xl 2xl:max-w-[90rem]";

/**
 * Horizontal inset — page content aligns with landing pill navbar outer edges.
 * Single source for navbar nav + all page shells.
 */
export const SITE_HORIZONTAL_GUTTER_CLASS = [
  "px-[calc(1rem-5px)] sm:px-[calc(1.5rem-5px)]",
  "lg:px-[calc(2rem-5px)] xl:px-[calc(2.5rem-5px)]",
].join(" ");

/** Alias — same as {@link SITE_HORIZONTAL_GUTTER_CLASS}. */
export const PAGE_GUTTER_CLASS = SITE_HORIZONTAL_GUTTER_CLASS;

/** Alias — same as {@link SITE_HORIZONTAL_GUTTER_CLASS}. */
export const NAVBAR_LANDING_PILL_GUTTER_CLASS = SITE_HORIZONTAL_GUTTER_CLASS;

/** Centered page shell — max width + navbar-aligned horizontal gutter. */
export const SITE_PAGE_SHELL_CLASS = [PAGE_CONTAINER_CLASS, SITE_HORIZONTAL_GUTTER_CLASS].join(" ");

/** Landing “Book a Shoot” — purple→magenta gradient (navbar + hero). */
export const LANDING_BOOK_SHOOT_GRADIENT_SURFACE_CLASS = [
  "!bg-gradient-to-r !from-[#8B5CF6] !to-[#D946EF] !text-white",
  "shadow-[0_8px_24px_rgba(139,92,246,0.28)]",
].join(" ");

export const LANDING_BOOK_SHOOT_GRADIENT_HOVER_CLASS = [
  "transition-[box-shadow,transform,opacity] duration-300",
  "hover:-translate-y-0.5 hover:!opacity-100 hover:shadow-[0_12px_32px_rgba(139,92,246,0.32)]",
].join(" ");

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

/** Pricing section — below page header (Media packages). */
export const PRICING_SECTION_AFTER_HEADER_CLASS = "mt-8 sm:mt-10 lg:mt-12";

/** Pricing section — below another pricing section (Analytics). */
export const PRICING_SECTION_MARGIN_TOP_CLASS = "mt-14 sm:mt-16 lg:mt-20";

/** Pricing — phone + tablet/iPad (≤1399px). Tune mobile here; leave desktop block below. */
export const PRICING_GRID_MOBILE_TABLET_CLASS =
  "grid grid-cols-1 md:grid-cols-2 md:max-[1399px]:!grid-cols-2";

/** Media packages — phone only: CTA +5px (md+ uses tablet/desktop rules below). */
export const PRICING_MEDIA_CTA_MOBILE_ONLY_CLASS = "max-md:-translate-y-[5px]";

/** Pricing — desktop Figma (lg+, iPad stays 2-col via max-[1399px] overrides). */
export const PRICING_GRID_DESKTOP_CLASS = "lg:grid-cols-3";

export const PRICING_MEDIA_CTA_DESKTOP_CLASS = [
  "lg:-translate-y-[17px]",
  "max-[1399px]:!translate-y-0",
].join(" ");

/** Estate pill on hero — mobile layout; sm+ natural width via `fullWidth` on the link. */
export const ESTATE_PILL_HERO_MOBILE_CLASS = [
  "max-sm:!w-auto max-sm:max-w-full max-sm:mx-auto",
  "max-sm:justify-center max-sm:gap-2",
  "max-sm:!py-0.5 max-sm:!pl-4 max-sm:!pr-2",
  "max-sm:[&>span:first-child]:!translate-x-0",
  "max-sm:[&>span:last-child]:!translate-x-0",
].join(" ");

export const PRICING_PACKAGE_GRID_CLASS = [
  PRICING_GRID_MOBILE_TABLET_CLASS,
  PRICING_GRID_DESKTOP_CLASS,
].join(" ");

/** Analytics subscriptions — hero-style pill (natural width). */
export const PRICING_ANALYTICS_CTA_BUTTON_CLASS = ESTATE_PILL_HERO_MOBILE_CLASS;

export const PRICING_MEDIA_CTA_BUTTON_CLASS = [
  ESTATE_PILL_HERO_MOBILE_CLASS,
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

/** Portfolio grid — tighter gap so three-up tiles use maximum column width. */
export const PORTFOLIO_GRID_GAP_CLASS = "gap-5 sm:gap-6 lg:gap-5";

/** What we do — uniform row/column/section spacing (px via Tailwind scale). */
export const WHAT_WE_DO_CARD_GRID_GAP_CLASS =
  "gap-x-6 gap-y-6 sm:gap-x-11 sm:gap-y-11 lg:gap-x-14 lg:gap-y-14";

/** Site footer — Services & Company columns nudge left on large screens only. */
export const FOOTER_LINK_COLUMNS_OFFSET_CLASS = "lg:-translate-x-[20px]";

/** Site footer — column headings (Services, Company, Studio) — #873C83. */
export const FOOTER_COLUMN_TITLE_CLASS = "text-base font-bold text-brand-purple";

/** Site footer — nav + studio links; hover #C364BE. */
export const FOOTER_LINK_CLASS =
  "text-sm text-brand-navy/70 transition-colors hover:text-brand-purple-light";

/** Site footer — root shell with lavender artwork background. */
export const SITE_FOOTER_CLASS =
  "site-footer relative overflow-hidden text-brand-navy [color-scheme:light]";

/** Site footer — top edge line separating footer from page content. */
export const FOOTER_TOP_SEPARATOR_CLASS = "border-t border-foreground/10";

/** Site footer — main row; stacked mobile, 2-col tablet, spread desktop. */
export const FOOTER_MAIN_ROW_CLASS =
  "grid w-full grid-cols-1 gap-10 pt-10 pb-4 sm:grid-cols-2 sm:pt-12 sm:pb-6 lg:flex lg:items-start lg:justify-between lg:gap-0";

/** Site footer — brand block spans full width below sm, single column on lg row. */
export const FOOTER_BRAND_COLUMN_CLASS = "sm:col-span-2 lg:col-span-1 lg:max-w-xs";

/** Site footer — divider + copyright block below main row. */
export const FOOTER_DIVIDER_CLASS =
  `mt-3 ${FOOTER_TOP_SEPARATOR_CLASS} pt-6 pb-10 sm:pb-12`;

/** Recent work project tile — design size (px); grid uses full column width up to this. */
export const RECENT_WORK_PROJECT_WIDTH_PX = 592;
export const RECENT_WORK_PROJECT_HEIGHT_PX = 444;

/** Tailwind aspect ratio class (matches original 486×365). */
export const RECENT_WORK_PROJECT_ASPECT_CLASS = "aspect-[486/365]";

/** Property intelligence — scan-to-bim hero image (1024×716 source). */
export const PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS = "aspect-[1024/716]";

/** Home property intelligence — visual frame (4:3, matches original landing layout). */
export const PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS =
  "relative w-full min-h-[17rem] overflow-hidden rounded-3xl aspect-[4/3] sm:min-h-[19rem]";

/** Inner page `<h1>` — brand navy (#2E4873); not used on home. */
export const INNER_PAGE_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl md:text-5xl lg:text-[3rem]";

/** Property intelligence pages (/data-bim, /media) — page header typography. */
export const PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-property-intelligence-accent sm:text-base";

export const PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS = INNER_PAGE_TITLE_CLASS;

export const PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-property-intelligence-navy sm:text-xl";

/** Estate pill — data services inner pages (report CTA, etc.). */
export const PROPERTY_INTELLIGENCE_CTA_CLASS =
  "bg-property-intelligence-accent text-white hover:opacity-90 [&>span:last-child]:bg-property-intelligence-navy";

/** Home property intelligence — “Explore data services” gradient pill (see home-property-intelligence-section.css). */
export const HOME_PROPERTY_INTELLIGENCE_EXPLORE_CTA_CLASS =
  "home-property-intelligence-explore-cta";

/** Portfolio / Solutions page header — eyebrow + subtitle (#C364BE), title (#2E4873). */
export const WHAT_WE_DO_PAGE_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-what-we-do-subtitle sm:text-base";

export const WHAT_WE_DO_PAGE_TITLE_CLASS = INNER_PAGE_TITLE_CLASS;

export const WHAT_WE_DO_PAGE_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-what-we-do-subtitle sm:text-xl";

/** Solutions page — same purple typography as Portfolio. */
export const SOLUTIONS_PAGE_EYEBROW_CLASS = WHAT_WE_DO_PAGE_EYEBROW_CLASS;

export const SOLUTIONS_PAGE_TITLE_CLASS = WHAT_WE_DO_PAGE_TITLE_CLASS;

export const SOLUTIONS_PAGE_SUBTITLE_CLASS = WHAT_WE_DO_PAGE_SUBTITLE_CLASS;

export const SOLUTIONS_SUBTITLE_GOLD_CLASS = "text-what-we-do-subtitle";

export const SOLUTIONS_SUBTITLE_ACCENT_CLASS = "font-semibold text-what-we-do-subtitle";

export const SOLUTIONS_ROLE_TITLE_CLASS = "text-xl font-bold text-what-we-do-title sm:text-2xl";

export const SOLUTIONS_ROLE_TITLE_ACCENT_CLASS =
  "mt-1.5 h-1 w-10 rounded-full bg-what-we-do-title";

export const SOLUTIONS_ROLE_PRICE_CLASS =
  "text-2xl font-bold tracking-tight text-what-we-do-title sm:text-3xl";

export const SOLUTIONS_ROLE_ICON_BOX_CLASS = [
  "flex size-14 shrink-0 items-center justify-center rounded-2xl bg-what-we-do-title text-white",
  "shadow-[0_4px_14px_rgba(135,60,131,0.35)]",
].join(" ");

export const SOLUTIONS_ROLE_DELIVERABLES_LABEL_CLASS =
  "text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground";

/** Solutions role card — nudge deliverables icon row left (px). */
export const SOLUTIONS_ROLE_DELIVERABLES_OFFSET_X_PX = 10;

/** Matches {@link SOLUTIONS_ROLE_DELIVERABLES_OFFSET_X_PX} via Tailwind spacing scale. */
export const SOLUTIONS_ROLE_DELIVERABLES_LIST_OFFSET_CLASS = "-ml-2.5";

/** Solutions role card 2 — extra nudge deliverables row right (px). */
export const SOLUTIONS_ROLE_DELIVERABLES_OFFSET_RIGHT_X_PX = 2;

/** Matches {@link SOLUTIONS_ROLE_DELIVERABLES_OFFSET_RIGHT_X_PX} via Tailwind spacing scale. */
export const SOLUTIONS_ROLE_DELIVERABLES_LIST_OFFSET_RIGHT_CLASS = "ml-1";

export const SOLUTIONS_ROLE_DELIVERABLES_OFFSET_RIGHT_ROLE_ID = "developers";

/**
 * Deliverable icon stroke colors — #C364BE, #FDBA2C, #16C0DA, #E55100, #2E4873, #873C83.
 * Light purple and dark purple are not adjacent; yellow replaces dark purple on early slots.
 * Cycles by index when a card has more than six deliverables.
 */
export const SOLUTIONS_DELIVERABLE_ICON_COLOR_CLASSES = [
  "text-what-we-do-subtitle",
  "text-brand-yellow",
  "text-brand-cyan",
  "text-brand-orange",
  "text-brand-navy",
  "text-what-we-do-title",
] as const;

export function getSolutionsDeliverableIconColorClass(index: number): string {
  const palette = SOLUTIONS_DELIVERABLE_ICON_COLOR_CLASSES;
  return palette[index % palette.length] ?? palette[0];
}

export const SOLUTIONS_ROLE_PRICE_BOX_CLASS = [
  "flex shrink-0 flex-col items-center justify-center rounded-xl",
  "bg-solutions-role-price-surface px-5 py-4 text-center sm:min-w-[7.5rem]",
].join(" ");

export const SOLUTIONS_ROLE_PRICE_LABEL_CLASS =
  "text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground";

/** Primary CTA surface — #C364BE (Contact + Solutions submit/CTA). */
export const WHAT_WE_DO_SUBTITLE_BUTTON_SURFACE_CLASS =
  "!bg-[#c364be] !text-white transition-opacity hover:opacity-90";

export const SOLUTIONS_PAGE_CTA_CLASS = [
  "mt-10 inline-flex h-12 items-center justify-center rounded-button px-8",
  "text-base font-semibold shadow",
  WHAT_WE_DO_SUBTITLE_BUTTON_SURFACE_CLASS,
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
].join(" ");

/** Contact page — same purple typography as Portfolio / Solutions. */
export const CONTACT_PAGE_EYEBROW_CLASS = WHAT_WE_DO_PAGE_EYEBROW_CLASS;

export const CONTACT_PAGE_TITLE_CLASS = WHAT_WE_DO_PAGE_TITLE_CLASS;

export const CONTACT_PAGE_SUBTITLE_CLASS = WHAT_WE_DO_PAGE_SUBTITLE_CLASS;

export const CONTACT_FORM_SUBMIT_BUTTON_CLASS = [
  "inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap",
  "rounded-button px-8 text-base font-semibold leading-snug shadow sm:w-auto",
  WHAT_WE_DO_SUBTITLE_BUTTON_SURFACE_CLASS,
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

export const CONTACT_FORM_CONTROL_FOCUS_CLASS = "focus-visible:ring-what-we-do-subtitle/40";

export const CONTACT_STUDIO_LINK_CLASS =
  "text-base leading-relaxed text-black transition-colors hover:text-what-we-do-title sm:text-lg";

/** About page — eyebrow matches Portfolio / Pricing; title uses brand navy (#2E4873). */
export const ABOUT_PAGE_EYEBROW_CLASS = WHAT_WE_DO_PAGE_EYEBROW_CLASS;

export const ABOUT_PAGE_TITLE_CLASS = INNER_PAGE_TITLE_CLASS;

export const ABOUT_PAGE_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-what-we-do-subtitle sm:text-xl";

/** About story — accent spans in body copy (#C364BE). */
export const ABOUT_STORY_BRAND_ACCENT_CLASS = "font-semibold text-what-we-do-subtitle";

/** About stack card — white shell + purple glow. */
export const ABOUT_STACK_CARD_SHELL_CLASS = [
  "rounded-[38px] border border-brand-purple/20 bg-white",
  "shadow-[0_8px_32px_rgba(135,60,131,0.14),0_2px_12px_rgba(195,100,190,0.1)]",
].join(" ");

export const ABOUT_STACK_TITLE_CLASS = "text-lg font-bold text-what-we-do-title lg:text-base";

export const ABOUT_STACK_CHECK_ICON_CLASS = "text-what-we-do-subtitle";

/** Inner pages — vertical rhythm below fixed landing pill navbar. */
export const INNER_PAGE_MAIN_SPACING_CLASS = [
  NAVBAR_LANDING_PILL_MAIN_OFFSET_CLASS,
  "pb-12 sm:pb-14 md:pb-16 lg:pb-20",
].join(" ");

/** Inner pages (not home) — default hero gradient (magenta left, cyan right). */
export const INNER_PAGE_MAIN_CLASS = [
  "page-hero-background overflow-x-hidden",
  INNER_PAGE_MAIN_SPACING_CLASS,
].join(" ");

/** Media / Data & BIM — reversed gradient (cyan left, magenta right). */
export const PROPERTY_INTELLIGENCE_PAGE_MAIN_CLASS = [
  "page-hero-background page-hero-background--cyan-left overflow-x-hidden",
  INNER_PAGE_MAIN_SPACING_CLASS,
].join(" ");

export const ABOUT_PAGE_MAIN_CLASS = INNER_PAGE_MAIN_CLASS;

/** Solutions role cards — white shell + purple glow (matches About stack card). */
export const SOLUTIONS_ROLE_CARD_SHELL_CLASS = ABOUT_STACK_CARD_SHELL_CLASS;

/** Media services cards — black surface + blue glow. */
export const MEDIA_SERVICE_CARD_SURFACE_STYLE = {
  borderRadius: WHAT_WE_DO_CARD_RADIUS_PX,
  background: "var(--media-service-card-background)",
  boxShadow:
    "var(--media-service-card-outer-shadow), var(--media-service-card-inset-shadow)",
} as const;

/** Pricing /media packages — orange gradient card (Cinematic+). */
export const PRICING_MEDIA_CARD_ORANGE_SURFACE_STYLE = {
  borderRadius: WHAT_WE_DO_CARD_RADIUS_PX,
  background: "var(--pricing-media-card-orange-background)",
  boxShadow:
    "var(--pricing-media-card-orange-outer-shadow), var(--pricing-media-card-orange-inset-shadow)",
} as const;

export type PricingMediaCardAccent = "blue" | "purple" | "orange";

type PricingMediaCardSurfaceStyle = {
  readonly borderRadius: number;
  readonly background: string;
  readonly boxShadow: string;
};

/** Pricing media packages — per-card accent surfaces. */
export const PRICING_MEDIA_CARD_SURFACE_BY_ACCENT: Record<
  PricingMediaCardAccent,
  PricingMediaCardSurfaceStyle
> = {
  blue: MEDIA_SERVICE_CARD_SURFACE_STYLE,
  purple: WHAT_WE_DO_CARD_SURFACE_STYLE,
  orange: PRICING_MEDIA_CARD_ORANGE_SURFACE_STYLE,
};

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

/** Client voices — decorative quote marks (#FDBA2C). */
export const CLIENT_VOICES_QUOTE_MARK_CLASS = "text-brand-yellow";

/** Client voices section — main heading typography. */
export const CLIENT_VOICES_SECTION_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-5xl lg:text-[3rem]";

/** Client voices section — white surface + vertical rhythm. */
export const CLIENT_VOICES_SECTION_SURFACE_CLASS =
  `bg-white ${SECTION_VERTICAL_PADDING_CLASS}`;

/** What we do / recent work sections — warm off-white surface + vertical rhythm. */
export const WHAT_WE_DO_SECTION_SURFACE_CLASS =
  `bg-what-we-do-surface ${SECTION_VERTICAL_PADDING_CLASS}`;

/** Home listing CTA — content block; section carries the gradient backdrop. */
export const HOME_LISTING_CTA_PANEL_CLASS =
  "home-listing-cta-panel px-6 py-10 sm:px-10 sm:py-12";

/** Estate pill — white surface, #873C83 label, #C364BE icon disc (listing CTA above footer). */
export const HOME_LISTING_CTA_PILL_BUTTON_CLASS = [
  "!bg-home-listing-cta-button !text-home-listing-cta-button-foreground",
  "[&>span:first-child]:!text-home-listing-cta-button-foreground",
  "[&>span:last-child]:!bg-home-listing-cta-button-icon [&>span:last-child]:!text-white",
].join(" ");

/** Listing CTA — one row on phone, centered (equal side margins); end-aligned from md. */
export const HOME_LISTING_CTA_BUTTONS_WRAP_CLASS = [
  "flex w-full flex-row flex-nowrap items-center justify-center gap-2",
  "sm:gap-3 md:justify-end",
].join(" ");

/** Listing CTA — full-size pills; compact padding only (fits iPhone row with nowrap). */
export const HOME_LISTING_CTA_MOBILE_PILL_CLASS = [
  "max-sm:!w-auto max-sm:shrink-0",
  "max-sm:gap-2 max-sm:!py-0.5 max-sm:!pl-4 max-sm:!pr-2",
  "max-sm:[&>span:first-child]:!translate-x-0",
  "max-sm:[&>span:last-child]:!translate-x-0",
].join(" ");

/** Estate.data pill CTA — 48px tall, fully rounded ends. */
export const ESTATE_CTA_BUTTON_CLASS = "h-12 rounded-full";

/** Nudge label + icon disc right inside the pill (px). */

/** pl-8 (32px) + {@link ESTATE_CTA_CONTENT_OFFSET_PX}. */
export const ESTATE_CTA_BUTTON_PADDING_CLASS = "py-0.5 pl-[35px] pr-0.5";

/** Label-only nudge left inside the pill (5px). */
export const ESTATE_CTA_LABEL_OFFSET_CLASS = "-translate-x-[10px]";

/** Icon disc-only nudge left inside the pill (10px). */
export const ESTATE_CTA_ICON_DISC_OFFSET_CLASS = "-translate-x-[5px]";

/** Pill CTA in a flex column — natural width (matches hero Book a Shoot). */
export const ESTATE_PILL_CONTENT_WIDTH_CLASS = [
  "shrink-0 w-auto max-w-full self-start !mx-0",
].join(" ");

/** Default fetch timeout for API client (ms). */
export const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;

/** API version prefix — keep in sync with apps/api routes. */
export const API_VERSION_PREFIX = "/v1";

/** Lazy-loaded section shell — reserves vertical space to limit CLS. */
export const LAZY_SECTION_PLACEHOLDER_MIN_HEIGHT_CLASS = "min-h-[20rem] sm:min-h-[22rem]";

/** Lazy-loaded section shell — inner pulse block. */
export const LAZY_SECTION_PLACEHOLDER_PULSE_CLASS =
  "min-h-[12rem] animate-pulse rounded-2xl bg-brand-navy/[0.04]";
