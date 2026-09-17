"use client";

import { MAIN_NAV_LINKS, type NavLink } from "@/shared/components/navbar/navConfig";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { isNavbarActivePath } from "@/shared/components/navbar/navActivePath";
import { mobileNavLinkClassName } from "@/shared/components/navbar/mobileNavLinkStyles";
import {
  NAVBAR_MOBILE_NAV_LIST_CLASS,
  NAVBAR_MOBILE_PANEL_SCROLL_CLASS,
} from "@/shared/lib/constants";

type MobileNavMenuProps = {
  pathname: string;
  hash?: string;
  onNavigate: () => void;
};

export function MobileNavMenu({ pathname, hash = "", onNavigate }: MobileNavMenuProps) {
  return (
    <div className={NAVBAR_MOBILE_PANEL_SCROLL_CLASS}>
      <nav className={NAVBAR_MOBILE_NAV_LIST_CLASS} aria-label="Mobile">
        {MAIN_NAV_LINKS.map((link) => (
          <MobileNavLink
            key={link.href}
            link={link}
            active={isNavbarActivePath(pathname, link.href, hash)}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </div>
  );
}

type MobileNavLinkProps = {
  link: NavLink;
  active: boolean;
  onNavigate: () => void;
};

function MobileNavLink({ link, active, onNavigate }: MobileNavLinkProps) {
  return (
    <HomeSectionLink
      href={link.href}
      className={mobileNavLinkClassName(active)}
      ariaCurrent={active ? "page" : undefined}
      onNavigate={onNavigate}
    >
      {link.label}
    </HomeSectionLink>
  );
}
