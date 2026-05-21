import { PAGE_CONTAINER_CLASS, PAGE_GUTTER_CLASS, SECTION_VERTICAL_PADDING_CLASS } from "@/shared/lib/constants";

export const LANDING_PAGE_CLASS = "bg-white text-brand-navy [color-scheme:light]";

export const LANDING_SECTION_CLASS = SECTION_VERTICAL_PADDING_CLASS;

export const LANDING_CONTAINER_CLASS = `${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`;

export const LANDING_SECTION_WHITE_CLASS = `bg-white ${LANDING_SECTION_CLASS}`;

export const LANDING_SECTION_MUTED_CLASS = `bg-landing-surface ${LANDING_SECTION_CLASS}`;

export const LANDING_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.18em] text-brand-purple-light";

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

