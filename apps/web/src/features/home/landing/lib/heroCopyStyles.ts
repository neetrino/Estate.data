/** Hero copy column — prevents overflow in grid layouts. */
export const HERO_COPY_ROOT_CLASS = "min-w-0 max-w-full";

/** Location pill — compact glass chip above headline. */
export const HERO_COPY_BADGE_CLASS = [
  "inline-flex w-fit max-w-full items-center gap-1.5 rounded-full",
  "border border-[#8B5CF6]/12 bg-white/75 px-3 py-1",
  "text-[11px] font-semibold tracking-normal text-[#7C3AED]",
  "shadow-[0_2px_10px_rgba(46,72,115,0.06)] backdrop-blur-md sm:text-xs",
  "[&_svg]:size-3.5 [&_svg]:shrink-0",
].join(" ");

/** Headline — ~36px mobile, ~44px tablet, ~60px desktop via clamp. */
export const HERO_COPY_HEADLINE_CLASS = [
  "mt-4 max-w-full font-bold tracking-tight text-[#2e4873] sm:mt-5",
  "text-[clamp(2.25rem,1rem+2.5vw,3.75rem)] leading-[1.08]",
].join(" ");

/** Subtitle — muted, max ~560px, ~18px on desktop. */
export const HERO_COPY_SUBTITLE_CLASS = [
  "mt-5 max-w-[35rem] text-base leading-[1.65] text-slate-600",
  "sm:mt-6 sm:text-lg",
].join(" ");
