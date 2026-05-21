import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS, SECTION_VERTICAL_PADDING_CLASS } from "@/shared/lib/constants";

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
  "grid items-center gap-11 lg:grid-cols-2 lg:gap-14 xl:gap-[4.5rem]";

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
export const HOME_MOBILE_PILL_BUTTON_CLASS = [
  "max-sm:!w-auto max-sm:max-w-full max-sm:mx-auto",
  "max-sm:justify-center max-sm:gap-2",
  "max-sm:!py-0.5 max-sm:!pl-4 max-sm:!pr-2",
  "max-sm:[&>span:first-child]:!translate-x-0",
  "max-sm:[&>span:last-child]:!translate-x-0",
].join(" ");

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

/** Lifts trust strip from hero bottom; extra top space on mobile (padding, not mt-auto). */
export const HOME_LANDING_TRUST_STRIP_WRAPPER_CLASS =
  "mt-auto shrink-0 mb-[10px] max-sm:pt-8";

/**
 * Hero fills one viewport below the sticky navbar row (4.5rem + safe area + 1px).
 * Keep in sync with {@link NAVBAR_HEIGHT_CLASS} and {@link NAVBAR_TOP_PADDING_CLASS}.
 */
export const HOME_LANDING_HERO_MIN_HEIGHT_CLASS =
  "min-h-[calc(100dvh-4.5rem-1px-env(safe-area-inset-top,0px))] min-h-[calc(100svh-4.5rem-1px-env(safe-area-inset-top,0px))]";

export const LANDING_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.18em] text-brand-purple-light";

/** Hero location chip — smaller than section eyebrows. */
export const HOME_LANDING_LOCATION_BADGE_CLASS =
  "inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-white px-3.5 py-1.5 text-sm font-semibold text-brand-purple-light shadow-sm";

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

/** Hero trust strip — same white + gradient stack as hero (`home-landing-hero-bg`). */
export const LANDING_TRUST_STRIP_PANEL_CLASS = [
  "relative overflow-hidden rounded-2xl border border-brand-navy/[0.07] bg-white",
  "shadow-[0_4px_24px_rgba(46,72,115,0.06)]",
].join(" ");

export const LANDING_TRUST_STRIP_PANEL_INNER_CLASS = "relative z-[1] px-4 py-4 sm:px-6 sm:py-5";

export const LANDING_TRUST_STRIP_LABEL_CLASS = [
  "text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-navy",
  "sm:text-xs",
].join(" ");

export const LANDING_TRUST_STRIP_GRID_CLASS = [
  "mt-4 grid grid-cols-2 gap-2 max-sm:mt-5",
  "sm:mt-4 sm:grid-cols-3 sm:gap-2.5",
  "lg:grid-cols-6 lg:gap-2",
].join(" ");

/** Last N trust cells use cyan hover; earlier cells use purple. */
export const LANDING_TRUST_STRIP_BLUE_HOVER_TAIL_COUNT = 3;

/** Stable hover target — does not move (prevents cursor flicker / jitter). */
export const LANDING_TRUST_STRIP_CELL_HIT_CLASS =
  "group relative min-h-[3.25rem] w-full pb-[3px] sm:min-h-[3.5rem]";

const LANDING_TRUST_STRIP_CELL_SURFACE_BASE_CLASS = [
  "flex h-full w-full items-center justify-center rounded-xl",
  "border border-brand-navy/[0.06] bg-white px-2 py-3",
  "shadow-[0_2px_10px_rgba(46,72,115,0.05)]",
  "transition-[transform,box-shadow,border-color] duration-200 ease-out",
  "will-change-transform motion-safe:group-hover:-translate-y-[3px]",
  "sm:px-3",
].join(" ");

const LANDING_TRUST_STRIP_CELL_HOVER_PURPLE_CLASS = [
  "group-hover:border-brand-purple-light/20",
  "group-hover:shadow-[0_12px_28px_rgba(135,60,131,0.1)]",
].join(" ");

const LANDING_TRUST_STRIP_CELL_HOVER_CYAN_CLASS = [
  "group-hover:border-brand-cyan/30",
  "group-hover:shadow-[0_12px_28px_rgba(22,192,218,0.14)]",
].join(" ");

const LANDING_TRUST_STRIP_NAME_BASE_CLASS = [
  "text-center text-xs font-medium leading-snug text-brand-navy/45",
  "transition-colors duration-200 sm:text-sm",
].join(" ");

/** Trust cell visual surface — lifts inside fixed hit area on hover. */
export function landingTrustStripCellSurfaceClass(blueHover: boolean): string {
  return [
    LANDING_TRUST_STRIP_CELL_SURFACE_BASE_CLASS,
    blueHover ? LANDING_TRUST_STRIP_CELL_HOVER_CYAN_CLASS : LANDING_TRUST_STRIP_CELL_HOVER_PURPLE_CLASS,
  ].join(" ");
}

/** Trust cell label — purple or cyan on hover. */
export function landingTrustStripNameClass(blueHover: boolean): string {
  return [
    LANDING_TRUST_STRIP_NAME_BASE_CLASS,
    blueHover ? "group-hover:text-brand-cyan" : "group-hover:text-brand-purple",
  ].join(" ");
}

