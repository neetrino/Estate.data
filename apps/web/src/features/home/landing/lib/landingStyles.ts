import {
  ESTATE_PILL_HERO_MOBILE_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  SECTION_VERTICAL_PADDING_CLASS,
} from "@/shared/lib/constants";

export const LANDING_PAGE_CLASS = "bg-white text-brand-navy [color-scheme:light]";

export const LANDING_SECTION_CLASS = SECTION_VERTICAL_PADDING_CLASS;

export const LANDING_CONTAINER_CLASS = `${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`;

export const LANDING_SECTION_WHITE_CLASS = `bg-white ${LANDING_SECTION_CLASS}`;

export const LANDING_SECTION_MUTED_CLASS = `bg-landing-surface ${LANDING_SECTION_CLASS}`;

/** Space between sticky navbar and hero copy (below navbar row). */
export const HOME_LANDING_HERO_TOP_PADDING_CLASS = "pt-[22px] sm:pt-[38px] lg:pt-[52px]";

/** Nudge hero main block (excludes trust strip) downward. */
export const HOME_LANDING_HERO_MAIN_OFFSET_CLASS = "mt-[15px]";

export const HOME_LANDING_HERO_GRID_CLASS =
  "grid items-start gap-11 lg:grid-cols-2 lg:items-stretch lg:gap-14 xl:gap-[4.5rem]";

/** Hero copy column — sets row height on lg+; items-start keeps location chip shrink-wrapped. */
export const HOME_LANDING_HERO_COPY_COLUMN_CLASS = "flex flex-col items-start";

/** Hero dashboard column — desktop only; hidden below lg (incl. 1,200+ preview card). */
export const HOME_LANDING_HERO_DASHBOARD_COLUMN_CLASS =
  "hidden min-h-0 flex-col lg:flex lg:h-full";

export const HOME_LANDING_HERO_HEADLINE_CLASS = [
  "mt-7 text-[2.375rem] font-bold leading-[1.08] tracking-tight text-brand-navy",
  "sm:mt-8 sm:text-5xl lg:text-[3.5rem]",
].join(" ");

export const HOME_LANDING_HERO_DESCRIPTION_CLASS = [
  "mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground",
  "sm:mt-7 sm:text-xl",
].join(" ");

export const HOME_LANDING_HERO_CTA_ROW_CLASS = [
  "mt-9 flex w-full max-w-lg flex-col gap-3.5",
  "max-sm:max-w-none max-sm:items-stretch",
  "sm:flex-row sm:items-center",
].join(" ");

/** Home — mobile-only outline CTAs full width (desktop unchanged). */
export const HOME_MOBILE_FULL_WIDTH_BUTTON_CLASS = "max-sm:w-full max-sm:max-w-full";

/** Home — pill + icon disc: natural width, centered (not stretched full width). */
export const HOME_MOBILE_PILL_BUTTON_CLASS = ESTATE_PILL_HERO_MOBILE_CLASS;

/** Home — primary pill CTAs (Book a Shoot, Explore data services), left on mobile. */
export const HOME_MOBILE_LEFT_PILL_CLASS = [
  HOME_MOBILE_PILL_BUTTON_CLASS,
  "max-sm:!mx-0 max-sm:self-start",
].join(" ");

export const HOME_MOBILE_BOOK_SHOOT_PILL_CLASS = HOME_MOBILE_LEFT_PILL_CLASS;

export const HOME_MOBILE_OUTLINE_BUTTON_CLASS = [
  HOME_MOBILE_FULL_WIDTH_BUTTON_CLASS,
  "max-sm:justify-center",
].join(" ");

export const HOME_MOBILE_CTA_STACK_CLASS = "max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-3";

export const HOME_MOBILE_CTA_SECONDARY_CENTER_CLASS = "max-sm:self-center";

/**
 * Trust strip spacing — full-viewport pin only at xl+ (desktop).
 * Below xl (incl. iPad Pro): natural flow so mt-auto does not create a huge gap.
 * md–xl: extra space above trusted partners on tablet / iPad Pro only.
 */
export const HOME_LANDING_TRUST_STRIP_WRAPPER_CLASS = [
  "shrink-0 mb-[10px] max-sm:pt-8",
  "mt-8 sm:mt-10",
  "md:max-xl:mt-12 lg:max-xl:mt-14",
  "xl:mt-auto xl:pt-0",
  "2xl:mt-10 2xl:pt-0",
].join(" ");

/** Hero inner stack — grows to fill viewport on xl laptops only; 2xl+ uses natural flow. */
export const HOME_LANDING_HERO_INNER_CLASS = [
  "relative flex min-h-0 flex-col justify-start pb-6 sm:pb-8",
  "max-xl:flex-none xl:flex-1 2xl:flex-none",
].join(" ");

/**
 * Hero fills one viewport below the sticky navbar row (4.5rem + safe area + 1px).
 * xl+ only — tablets keep content height (no empty gap above trust strip).
 * Keep in sync with {@link NAVBAR_HEIGHT_CLASS} and {@link NAVBAR_TOP_PADDING_CLASS}.
 */
export const HOME_LANDING_HERO_MIN_HEIGHT_CLASS = [
  "max-xl:min-h-0",
  "xl:min-h-[calc(100dvh-4.5rem-1px-env(safe-area-inset-top,0px))]",
  "xl:min-h-[calc(100svh-4.5rem-1px-env(safe-area-inset-top,0px))]",
  "2xl:min-h-0",
].join(" ");

export const LANDING_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.18em] text-brand-purple-light";

/** Hero location chip — Serving Greater Los Angeles (compact). */
export const HOME_LANDING_LOCATION_BADGE_CLASS = [
  "inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-purple/25 bg-white px-4 py-1.5 shadow-sm",
  "text-xs font-semibold normal-case tracking-normal text-brand-purple-light",
  "[&_svg]:size-3.5",
].join(" ");

export const LANDING_SECTION_TITLE_CLASS =
  "text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl md:text-[2.5rem] md:leading-tight";

export const LANDING_SECTION_SUBTITLE_CLASS =
  "mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg";

export const LANDING_GLASS_CARD_CLASS = "home-landing-glass-card rounded-2xl";

/** Home stats strip — equal-height cards in 2×2 grid on mobile. */
export const HOME_STATS_STRIP_GRID_CLASS = [
  "grid grid-cols-2 gap-4 max-sm:auto-rows-fr",
  "sm:grid-cols-2 lg:grid-cols-4 lg:gap-6",
].join(" ");

export const HOME_STATS_CARD_CLASS = [
  LANDING_GLASS_CARD_CLASS,
  "flex h-full flex-col items-center px-4 py-5 text-center",
  "max-sm:min-h-[10.75rem]",
  "sm:px-5 sm:py-6",
].join(" ");

export type LandingAccent = "purple" | "cyan" | "yellow" | "orange" | "navy";

const LANDING_ACCENT_CYCLE: readonly LandingAccent[] = [
  "purple",
  "cyan",
  "yellow",
  "orange",
  "navy",
  "purple",
];

const ACCENT_ICON_BG: Record<LandingAccent, string> = {
  purple: "bg-brand-purple/10 text-brand-purple",
  cyan: "bg-brand-cyan/12 text-brand-cyan",
  yellow: "bg-brand-yellow/15 text-brand-yellow",
  orange: "bg-brand-orange/12 text-brand-orange",
  navy: "bg-brand-navy/8 text-brand-navy",
};

const ACCENT_VALUE: Record<LandingAccent, string> = {
  purple: "text-brand-purple",
  cyan: "text-brand-cyan",
  yellow: "text-brand-yellow",
  orange: "text-brand-orange",
  navy: "text-brand-navy",
};

/** Rotating accent for home section cards and metrics. */
export function homeLandingAccentAt(index: number): LandingAccent {
  return LANDING_ACCENT_CYCLE[index % LANDING_ACCENT_CYCLE.length];
}

export function landingIconSurfaceClass(accent: LandingAccent): string {
  return `flex size-11 shrink-0 items-center justify-center rounded-xl ${ACCENT_ICON_BG[accent]}`;
}

export function landingMetricValueClass(accent: LandingAccent): string {
  return `text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl ${ACCENT_VALUE[accent]}`;
}

export const LANDING_TRUST_PARTNER_CHIP_CLASS = [
  "rounded-full border border-brand-navy/10 bg-white px-4 py-2",
  "text-sm font-semibold text-brand-navy shadow-sm",
].join(" ");

/** Hero trust strip — no panel background; cards only. */
export const LANDING_TRUST_STRIP_PANEL_CLASS = "relative";

export const LANDING_TRUST_STRIP_PANEL_INNER_CLASS = "px-0 py-0";

export const LANDING_TRUST_STRIP_HEADER_CLASS =
  "flex items-center justify-center gap-3 sm:gap-5";

export const LANDING_TRUST_STRIP_HEADER_LINE_CLASS =
  "h-px w-10 bg-brand-navy/20 sm:w-14";

export const LANDING_TRUST_STRIP_LABEL_CLASS = [
  "shrink-0 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-navy",
  "sm:text-xs",
].join(" ");

export const LANDING_TRUST_STRIP_GRID_CLASS = [
  "mt-5 grid grid-cols-2 gap-3",
  "sm:grid-cols-3 sm:gap-3",
  "lg:mt-6 lg:grid-cols-6 lg:gap-3",
].join(" ");

/** Last N trust cards use cyan hover; earlier cards use purple. */
export const LANDING_TRUST_STRIP_BLUE_HOVER_TAIL_COUNT = 3;

/** Fixed hit area — card lifts inside on hover (no layout shift). */
export const LANDING_TRUST_STRIP_CARD_HIT_CLASS = "group relative w-full pb-[3px]";

const LANDING_TRUST_STRIP_CARD_SURFACE_BASE_CLASS = [
  "relative w-full overflow-hidden rounded-xl",
  "transition-[transform,box-shadow] duration-200 ease-out",
  "will-change-transform motion-safe:group-hover:-translate-y-[3px]",
].join(" ");

const LANDING_TRUST_STRIP_CARD_HOVER_PURPLE_CLASS = [
  "group-hover:shadow-[0_12px_28px_rgba(135,60,131,0.14)]",
  "group-hover:ring-1 group-hover:ring-brand-purple-light/30",
].join(" ");

const LANDING_TRUST_STRIP_CARD_HOVER_CYAN_CLASS = [
  "group-hover:shadow-[0_12px_28px_rgba(22,192,218,0.18)]",
  "group-hover:ring-1 group-hover:ring-brand-cyan/35",
].join(" ");

/** Trust partner card — purple or cyan highlight on hover. */
export function landingTrustStripCardSurfaceClass(blueHover: boolean): string {
  return [
    LANDING_TRUST_STRIP_CARD_SURFACE_BASE_CLASS,
    blueHover ? LANDING_TRUST_STRIP_CARD_HOVER_CYAN_CLASS : LANDING_TRUST_STRIP_CARD_HOVER_PURPLE_CLASS,
  ].join(" ");
}

