import {
  ESTATE_PILL_HERO_MOBILE_CLASS,
  NAVBAR_LANDING_PILL_MAIN_OFFSET_CLASS,
  SITE_PAGE_SHELL_CLASS,
  SECTION_VERTICAL_PADDING_CLASS,
} from "@/shared/lib/constants";

export const LANDING_PAGE_CLASS = "bg-white text-brand-navy [color-scheme:light]";

export const LANDING_SECTION_CLASS = SECTION_VERTICAL_PADDING_CLASS;

export const LANDING_CONTAINER_CLASS = SITE_PAGE_SHELL_CLASS;

export const LANDING_SECTION_WHITE_CLASS = `bg-white ${LANDING_SECTION_CLASS}`;

export const LANDING_SECTION_MUTED_CLASS = `bg-landing-surface ${LANDING_SECTION_CLASS}`;

/** Space below fixed landing pill navbar (safe area + pill + gap). */
export const HOME_LANDING_HERO_TOP_PADDING_CLASS = NAVBAR_LANDING_PILL_MAIN_OFFSET_CLASS;

export const HOME_LANDING_HERO_GRID_CLASS = [
  "grid items-start gap-11",
  "lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:items-stretch lg:gap-12",
  "xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.22fr)] xl:gap-14",
].join(" ");

/** Hero copy column — matches dashboard card height on lg+ (content top, features bottom). */
export const HOME_LANDING_HERO_COPY_COLUMN_CLASS = [
  "flex min-h-0 w-full flex-col items-start",
  "lg:h-full lg:justify-between",
].join(" ");

export const HOME_LANDING_HERO_COPY_TOP_CLASS = "flex w-full min-w-0 flex-col items-start";

/** Hero dashboard column — full width of its grid track. */
export const HOME_LANDING_HERO_DASHBOARD_COLUMN_CLASS =
  "min-h-0 w-full min-w-0 flex flex-col lg:h-full";

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

/** What we do CTA — white icon disc, black arrow (gradient pill label unchanged). */
export const WHAT_WE_DO_CTA_ICON_DISC_CLASS = [
  "[&>span:last-child]:!bg-white",
  "[&>span:last-child]:!text-black",
].join(" ");

export const HOME_MOBILE_OUTLINE_BUTTON_CLASS = [
  HOME_MOBILE_FULL_WIDTH_BUTTON_CLASS,
  "max-sm:justify-center",
].join(" ");

export const HOME_MOBILE_CTA_STACK_CLASS = "max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-3";

export const HOME_MOBILE_CTA_SECONDARY_CENTER_CLASS = "max-sm:self-center";

/** Hero main block — fills first screen; trust strip sits below (see {@link HOME_LANDING_TRUST_BELOW_HERO_CLASS}). */
export const HOME_LANDING_HERO_INNER_CLASS = [
  "relative flex min-h-0 flex-1 flex-col justify-center",
  "pb-6 sm:pb-8",
].join(" ");

/**
 * Hero = one viewport (all breakpoints). Sync with {@link NAVBAR_LANDING_PILL_MAIN_OFFSET_CLASS}.
 */
export const HOME_LANDING_HERO_VIEWPORT_CLASS = [
  "flex min-h-[calc(100dvh-env(safe-area-inset-top,0px))]",
  "min-h-[calc(100svh-env(safe-area-inset-top,0px))]",
].join(" ");

/** Trusted partners — below the fold, after full-viewport hero. */
export const HOME_LANDING_TRUST_BELOW_HERO_CLASS = [
  "bg-landing-surface pb-8 pt-10 sm:pt-12",
].join(" ");

export const LANDING_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.18em] text-brand-purple-light";

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

