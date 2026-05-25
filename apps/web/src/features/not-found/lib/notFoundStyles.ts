import { ABOUT_STACK_CARD_SHELL_CLASS } from "@/shared/lib/constants";

/** Large decorative status code beside the message. */
export const NOT_FOUND_DISPLAY_CODE_CLASS = [
  "shrink-0 select-none bg-gradient-to-br from-brand-purple/35 via-brand-purple-light to-property-intelligence-accent",
  "bg-clip-text text-[5.5rem] font-bold leading-none tracking-tighter text-transparent",
  "sm:text-[6.75rem] lg:text-[8.5rem]",
].join(" ");

export const NOT_FOUND_QUICK_LINKS_CARD_CLASS = [
  ABOUT_STACK_CARD_SHELL_CLASS,
  "mt-10 p-6 sm:p-8",
].join(" ");

/** Popular destinations — light purple pill buttons. */
export const NOT_FOUND_QUICK_LINK_BUTTON_CLASS = [
  "inline-flex h-11 min-w-[7.5rem] items-center justify-center rounded-full px-5",
  "border border-brand-purple/20 bg-brand-purple/10",
  "text-sm font-semibold text-brand-purple sm:text-base",
  "transition-colors hover:border-brand-purple/35 hover:bg-brand-purple/15",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple-light",
].join(" ");

export const NOT_FOUND_QUICK_LINKS_LIST_CLASS =
  "mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-3";

export const NOT_FOUND_CTA_ROW_CLASS =
  "mt-9 flex w-full max-w-lg flex-row flex-wrap items-center justify-start gap-2.5 sm:gap-3.5";
