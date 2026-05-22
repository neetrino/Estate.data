const MOBILE_NAV_LINK_AFTER_BASE_CLASS = [
  "after:pointer-events-none",
  "after:absolute",
  "after:bottom-0",
  "after:left-0",
  "after:h-px",
  "after:max-w-full",
  "after:translate-y-[2px]",
  "after:rounded-full",
  "after:origin-left",
  "after:content-['']",
  "after:bg-[linear-gradient(90deg,rgba(195,100,190,0)_0%,rgba(195,100,190,0.14)_5%,rgba(195,100,190,0.45)_14%,rgba(195,100,190,0.9)_32%,rgb(195,100,190)_50%,rgba(195,100,190,0.9)_68%,rgba(195,100,190,0.45)_86%,rgba(195,100,190,0.14)_95%,rgba(195,100,190,0)_100%)]",
  "after:transition-[width,box-shadow]",
  "after:duration-[340ms]",
  "after:ease-[cubic-bezier(0.22,1,0.36,1)]",
  "hover:after:w-full",
  "focus-visible:after:w-full",
].join(" ");

const MOBILE_NAV_LINK_BASE_CLASS =
  "relative block py-3.5 text-xl font-semibold transition-opacity";

const MOBILE_NAV_LINK_IDLE_TEXT_CLASS =
  "text-foreground hover:opacity-70 active:opacity-50";

const MOBILE_NAV_LINK_ACTIVE_TEXT_CLASS = "text-accent hover:opacity-100 active:opacity-100";

const MOBILE_NAV_LINK_AFTER_SHADOW_IDLE_CLASS =
  "after:shadow-[0_0_6px_rgba(195,100,190,0.2),0_0_14px_rgba(195,100,190,0.28)]";

const MOBILE_NAV_LINK_AFTER_SHADOW_ACTIVE_CLASS =
  "after:shadow-[0_0_8px_rgba(195,100,190,0.35),0_0_18px_rgba(195,100,190,0.45),0_0_32px_rgba(195,100,190,0.28)]";

/** Mobile drawer primary / More links with animated accent underline. */
export function mobileNavLinkClassName(active: boolean): string {
  return [
    MOBILE_NAV_LINK_BASE_CLASS,
    active ? MOBILE_NAV_LINK_ACTIVE_TEXT_CLASS : MOBILE_NAV_LINK_IDLE_TEXT_CLASS,
    MOBILE_NAV_LINK_AFTER_BASE_CLASS,
    active ? "after:w-full" : "after:w-0",
    active ? MOBILE_NAV_LINK_AFTER_SHADOW_ACTIVE_CLASS : MOBILE_NAV_LINK_AFTER_SHADOW_IDLE_CLASS,
  ].join(" ");
}

const MOBILE_NAV_MORE_TOGGLE_BASE_CLASS =
  "flex w-full items-center justify-between gap-2 py-3.5 text-left text-xl font-semibold transition-opacity hover:opacity-80";

/** Mobile drawer “More” toggle — accent when a nested route is active. */
export function mobileNavMoreToggleClassName(sectionActive: boolean): string {
  return [
    MOBILE_NAV_MORE_TOGGLE_BASE_CLASS,
    sectionActive ? "text-accent" : "text-foreground",
  ].join(" ");
}
