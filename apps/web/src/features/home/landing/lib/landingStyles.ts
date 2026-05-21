import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS, SECTION_VERTICAL_PADDING_CLASS } from "@/shared/lib/constants";

export const LANDING_PAGE_CLASS = "bg-white text-brand-navy [color-scheme:light]";

export const LANDING_SECTION_CLASS = SECTION_VERTICAL_PADDING_CLASS;

export const LANDING_CONTAINER_CLASS = `${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`;

export const LANDING_SECTION_WHITE_CLASS = `bg-white ${LANDING_SECTION_CLASS}`;

export const LANDING_SECTION_MUTED_CLASS = `bg-landing-surface ${LANDING_SECTION_CLASS}`;

/** Space between sticky navbar and hero copy (below navbar row). */
export const HOME_LANDING_HERO_TOP_PADDING_CLASS = "pt-[22px] sm:pt-[38px] lg:pt-[52px]";

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
  "inline-flex items-center gap-1.5 rounded-full border border-brand-purple/25 bg-white px-3 py-1 text-xs font-semibold text-brand-purple-light shadow-sm";

export const LANDING_SECTION_TITLE_CLASS =
  "text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl md:text-[2.5rem] md:leading-tight";

export const LANDING_SECTION_SUBTITLE_CLASS =
  "mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg";

export const LANDING_GLASS_CARD_CLASS = "home-landing-glass-card rounded-2xl";

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

export const LANDING_TRUST_PARTNERS_LABEL_CLASS =
  "text-xs font-semibold uppercase tracking-[0.12em] text-brand-navy/55 sm:text-sm";

/** Hero trusted partners — glass tiles in landing card style. */
export const LANDING_TRUST_PARTNER_CARD_CLASS = [
  LANDING_GLASS_CARD_CLASS,
  "flex min-h-[3.5rem] items-center justify-center px-3 py-3",
  "text-center text-xs font-semibold leading-snug text-brand-navy sm:min-h-[3.75rem] sm:text-sm",
].join(" ");

export const LANDING_TRUST_PARTNERS_GRID_CLASS = "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5";

