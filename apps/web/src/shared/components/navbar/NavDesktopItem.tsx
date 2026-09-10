"use client";

import type { NavLink } from "@/shared/components/navbar/navConfig";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { NAV_ITEM_TEXT_CLASS } from "@/shared/lib/constants";

type NavTone = "light" | "dark";

type NavDesktopItemProps = {
  readonly link: NavLink;
  readonly active: boolean;
  readonly tone: NavTone;
  readonly onNavigate?: () => void;
  readonly useOverlayStyle?: boolean;
};

export function NavDesktopItem({
  link,
  active,
  tone,
  onNavigate,
  useOverlayStyle = false,
}: NavDesktopItemProps) {
  return (
    <li>
      <HomeSectionLink
        href={link.href}
        className={desktopNavLinkClass(active, tone, useOverlayStyle)}
        ariaCurrent={active ? "page" : undefined}
        onNavigate={onNavigate}
      >
        {link.label}
      </HomeSectionLink>
    </li>
  );
}

function desktopNavLinkClass(
  active: boolean,
  tone: NavTone,
  useOverlayStyle: boolean,
): string {
  if (useOverlayStyle) {
    const base = [
      "relative inline-flex items-center whitespace-nowrap pb-1",
      "border-b border-transparent text-[0.72rem] font-semibold uppercase tracking-[0.18em]",
      "transition-colors focus-visible:outline-none focus-visible:text-studio-accent",
    ].join(" ");

    if (active) {
      return `${base} border-studio-accent text-studio-accent`;
    }

    return `${base} text-studio-fg/80 hover:text-studio-fg`;
  }

  const base = [
    NAV_ITEM_TEXT_CLASS,
    "relative inline-flex items-center whitespace-nowrap transition-colors",
    "hover:text-brand-purple-light focus-visible:text-brand-purple-light focus-visible:outline-none",
  ].join(" ");

  if (active) {
    return `${base} text-accent`;
  }
  if (tone === "light") {
    return `${base} text-white`;
  }
  return `${base} text-slate-900`;
}
