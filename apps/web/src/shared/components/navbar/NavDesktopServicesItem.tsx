"use client";

import { SERVICE_NAV_LINKS } from "@/shared/components/navbar/navConfig";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { isNavbarActivePath } from "@/shared/components/navbar/navActivePath";

type NavDesktopServicesItemProps = {
  readonly pathname: string;
  readonly hash: string;
  readonly useOverlayStyle?: boolean;
};

const TRIGGER_OVERLAY_CLASS = [
  "relative inline-flex items-center whitespace-nowrap pb-1",
  "border-b border-transparent text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
  "transition-colors focus-visible:outline-none focus-visible:text-studio-accent",
].join(" ");

const PANEL_CLASS = [
  "invisible absolute left-1/2 top-full z-50 min-w-[15.5rem] -translate-x-1/2 pt-3",
  "opacity-0 transition-[opacity,visibility] duration-150",
  "group-hover:visible group-hover:opacity-100",
  "group-focus-within:visible group-focus-within:opacity-100",
].join(" ");

const LIST_CLASS = [
  "border border-studio-border bg-studio-bg/95 py-2 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
  "backdrop-blur-xl",
].join(" ");

const ITEM_CLASS = [
  "block px-4 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em]",
  "text-studio-fg/80 transition-colors hover:bg-studio-accent/10 hover:text-studio-fg",
].join(" ");

const ITEM_ACTIVE_CLASS = "bg-studio-accent/15 text-studio-accent";

/** Desktop Services menu — hover/focus opens in-page section links. */
export function NavDesktopServicesItem({
  pathname,
  hash,
  useOverlayStyle = false,
}: NavDesktopServicesItemProps) {
  const anyActive = SERVICE_NAV_LINKS.some((service) =>
    isNavbarActivePath(pathname, service.href, hash),
  );

  return (
    <li className="group relative">
      <button
        type="button"
        className={triggerClass(anyActive, useOverlayStyle)}
        aria-haspopup="menu"
        aria-expanded={false}
      >
        Services
      </button>
      <div className={PANEL_CLASS}>
        <ul className={LIST_CLASS} role="menu" aria-label="Services">
          {SERVICE_NAV_LINKS.filter((service) => service.enabled).map((service) => {
            const active = isNavbarActivePath(pathname, service.href, hash);
            return (
              <li key={service.id} role="none">
                <HomeSectionLink
                  href={service.href}
                  className={`${ITEM_CLASS} ${active ? ITEM_ACTIVE_CLASS : ""}`.trim()}
                  ariaCurrent={active ? "page" : undefined}
                >
                  {service.label}
                </HomeSectionLink>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
}

function triggerClass(active: boolean, useOverlayStyle: boolean): string {
  if (useOverlayStyle) {
    if (active) {
      return `${TRIGGER_OVERLAY_CLASS} border-studio-accent text-studio-accent`;
    }
    return `${TRIGGER_OVERLAY_CLASS} text-studio-fg/80 hover:text-studio-fg`;
  }

  return active
    ? "text-accent text-[0.72rem] font-semibold uppercase tracking-[0.18em]"
    : "text-studio-fg/80 text-[0.72rem] font-semibold uppercase tracking-[0.18em]";
}
