/** Hero copy column — prevents overflow in grid layouts. */
export const HERO_COPY_ROOT_CLASS = "min-w-0 max-w-full";

/** Location pill — glass surface, purple accent. */
export const HERO_COPY_BADGE_CLASS = [
  "inline-flex w-fit max-w-full items-center gap-1.5 rounded-full",
  "border border-[#8B5CF6]/15 bg-white/80 px-4 py-1.5",
  "text-xs font-semibold tracking-normal text-[#7C3AED] shadow-[0_4px_14px_rgba(46,72,115,0.08)]",
  "backdrop-blur-md sm:text-[0.8125rem]",
  "[&_svg]:size-3.5 [&_svg]:shrink-0",
].join(" ");

/** Headline — ~38px mobile, ~48px tablet, ~64px desktop via clamp. */
export const HERO_COPY_HEADLINE_CLASS = [
  "mt-6 max-w-full font-bold tracking-tight text-[#2e4873]",
  "text-[clamp(2.375rem,1.1rem+2.75vw,4rem)] leading-[1.08]",
  "sm:mt-7",
].join(" ");

/** Subtitle — muted, max ~560px, ~18px on desktop. */
export const HERO_COPY_SUBTITLE_CLASS = [
  "mt-5 max-w-[35rem] text-base leading-[1.65] text-slate-600",
  "sm:mt-6 sm:text-lg",
].join(" ");
