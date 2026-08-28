import { HOME_SECTION_SCROLL_MARGIN_CLASS } from "@/shared/lib/homeSectionIds";

export const STUDIO_PAGE_CLASS = "studio-site bg-studio-bg text-studio-fg";

export const STUDIO_CONTAINER_CLASS = "mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16";

export const STUDIO_SECTION_CLASS = `relative isolate py-20 md:py-32 ${HOME_SECTION_SCROLL_MARGIN_CLASS}`;

export const STUDIO_LIGHT_SECTION_CLASS = `${STUDIO_SECTION_CLASS} bg-studio-bg text-studio-fg`;

export const STUDIO_MUTED_SECTION_CLASS = `${STUDIO_SECTION_CLASS} bg-studio-card text-studio-fg`;

export const STUDIO_DARK_SECTION_CLASS = `${STUDIO_SECTION_CLASS} bg-studio-bg text-studio-fg`;

export const STUDIO_EYEBROW_CLASS = "studio-label text-studio-accent";

export const STUDIO_TITLE_CLASS = "studio-display-lg mt-4 text-studio-fg";

export const STUDIO_BODY_CLASS =
  "mt-5 max-w-[52ch] text-base leading-relaxed text-studio-muted md:text-lg";

export const STUDIO_PRIMARY_BUTTON_CLASS = [
  "inline-flex items-center justify-center gap-2",
  "bg-studio-accent px-7 py-3.5",
  "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-studio-accent-fg",
  "transition-colors hover:bg-studio-accent/85",
].join(" ");

export const STUDIO_SECONDARY_BUTTON_CLASS = [
  "inline-flex items-center justify-center gap-2",
  "border border-studio-border px-7 py-3.5",
  "text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-studio-fg",
  "transition-colors hover:border-studio-accent hover:text-studio-accent",
].join(" ");
