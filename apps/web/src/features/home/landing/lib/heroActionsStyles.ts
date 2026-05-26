/** Hero CTA row — stack on mobile, row on desktop. */
export const HERO_ACTIONS_ROOT_CLASS = [
  "mt-9 flex w-full max-w-xl flex-col gap-3",
  "sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5",
].join(" ");

const HERO_CTA_PILL_BASE_CLASS = [
  "group inline-flex h-11 w-full items-center justify-between gap-2.5 rounded-full",
  "pl-5 pr-1.5 text-sm font-semibold sm:h-12 sm:w-auto sm:min-w-[12.5rem] sm:text-base",
  "transition-[transform,box-shadow,border-color] duration-300",
  "hover:-translate-y-0.5",
  "focus-visible:outline-none focus-visible:ring-2",
].join(" ");

const HERO_CTA_ICON_DISC_BASE_CLASS = [
  "flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9",
  "transition-transform duration-300 group-hover:translate-x-0.5",
].join(" ");

export const HERO_ACTIONS_SECONDARY_CLASS = [
  HERO_CTA_PILL_BASE_CLASS,
  "border border-[#8B5CF6]/20 bg-white/90 text-[#2e4873]",
  "shadow-[0_4px_16px_rgba(46,72,115,0.06)] backdrop-blur-md",
  "hover:border-[#8B5CF6]/35 hover:shadow-[0_8px_28px_rgba(139,92,246,0.12)]",
  "focus-visible:ring-[#8B5CF6]/40",
].join(" ");

export const HERO_ACTIONS_SECONDARY_ICON_DISC_CLASS = [
  HERO_CTA_ICON_DISC_BASE_CLASS,
  "bg-[#8B5CF6]/10 text-[#8B5CF6]",
].join(" ");
