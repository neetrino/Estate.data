/** Feature list — desktop 3-column layout from md+ (synced with hero). */
export const HERO_FEATURES_ROOT_CLASS = [
  "relative z-10 mt-7 grid min-w-0 max-w-full grid-cols-3 gap-2",
  "sm:mt-8 sm:gap-8",
  "md:mt-0 md:gap-10",
  "home-hero-features--ipad-center",
].join(" ");

export const HERO_FEATURES_ITEM_CLASS =
  "relative z-10 flex min-w-0 flex-col items-center gap-2 text-center sm:gap-3 min-[1280px]:items-start min-[1280px]:text-left";

export const HERO_FEATURES_ICON_CLASS = "size-14 shrink-0 object-contain sm:size-[3.75rem]";

export const HERO_FEATURES_COPY_CLASS =
  "min-w-0 flex flex-col items-center min-[1280px]:items-start";

export const HERO_FEATURES_TITLE_CLASS =
  "min-h-[2.5rem] max-w-[9ch] overflow-hidden text-sm font-bold leading-tight text-[#2e4873] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] sm:min-h-0 sm:max-w-none sm:whitespace-nowrap sm:text-base sm:[display:block]";

export const HERO_FEATURES_SUBTITLE_CLASS =
  "mt-0.5 text-sm font-medium leading-snug text-[#2e4873]/55 sm:text-[0.9375rem]";
