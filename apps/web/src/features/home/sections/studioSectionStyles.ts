import { HOME_SECTION_SCROLL_MARGIN_CLASS } from "@/shared/lib/homeSectionIds";

export const STUDIO_PAGE_CLASS = "studio-site bg-studio-bg text-studio-fg";

export const STUDIO_CONTAINER_CLASS = "mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16";

export const STUDIO_SECTION_CLASS = `relative isolate py-24 md:py-32 ${HOME_SECTION_SCROLL_MARGIN_CLASS}`;

export const STUDIO_LIGHT_SECTION_CLASS = `${STUDIO_SECTION_CLASS} bg-studio-bg text-studio-fg`;

export const STUDIO_MUTED_SECTION_CLASS = `${STUDIO_SECTION_CLASS} bg-studio-card text-studio-fg`;

export const STUDIO_DARK_SECTION_CLASS = `${STUDIO_SECTION_CLASS} bg-studio-bg text-studio-fg`;

export const STUDIO_EYEBROW_CLASS = "studio-label text-studio-accent";

export const STUDIO_TITLE_CLASS = "studio-display-lg mt-6 text-studio-fg";

export const STUDIO_BODY_CLASS = "studio-body-lg mt-6 max-w-[52ch]";

/** Flat hero/promo buttons — no arrow, wider padding than section CTAs. */
export const STUDIO_HERO_PRIMARY_BUTTON_CLASS = [
  "bg-studio-accent px-8 py-4",
  "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-studio-accent-fg",
  "transition-colors hover:bg-studio-accent/85",
].join(" ");

/** Compact solid button used in the fixed header. */
export const STUDIO_NAV_BUTTON_CLASS = [
  "bg-studio-accent px-6 py-3",
  "text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-studio-accent-fg",
  "transition-colors hover:bg-studio-accent/85",
].join(" ");

export const STUDIO_HERO_SECONDARY_BUTTON_CLASS = [
  "border border-studio-fg/30 px-8 py-4",
  "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-studio-fg",
  "transition-colors hover:border-studio-accent hover:text-studio-accent",
].join(" ");
