"use client";

import Link from "next/link";
import { useState } from "react";
import {
  MOBILE_NAV_MORE_LINKS,
  MOBILE_NAV_PRIMARY_LINKS,
  type NavLink,
} from "@/shared/components/navbar/navConfig";
import { isNavbarActivePath } from "@/shared/components/navbar/navActivePath";
import {
  mobileNavLinkClassName,
  mobileNavMoreToggleClassName,
} from "@/shared/components/navbar/mobileNavLinkStyles";
import {
  NAVBAR_MOBILE_NAV_LIST_CLASS,
  NAVBAR_MOBILE_PANEL_SCROLL_CLASS,
} from "@/shared/lib/constants";

type MobileNavMenuProps = {
  pathname: string;
  onNavigate: () => void;
};

function isMoreSectionActive(pathname: string): boolean {
  return MOBILE_NAV_MORE_LINKS.some((link) => isNavbarActivePath(pathname, link.href));
}

export function MobileNavMenu({ pathname, onNavigate }: MobileNavMenuProps) {
  const moreSectionActive = isMoreSectionActive(pathname);
  const [moreOpen, setMoreOpen] = useState(() => moreSectionActive);
  const [prevMoreSectionActive, setPrevMoreSectionActive] = useState(moreSectionActive);

  if (moreSectionActive !== prevMoreSectionActive) {
    setPrevMoreSectionActive(moreSectionActive);
    if (moreSectionActive) {
      setMoreOpen(true);
    }
  }

  return (
    <div className={NAVBAR_MOBILE_PANEL_SCROLL_CLASS}>
      <nav className={NAVBAR_MOBILE_NAV_LIST_CLASS} aria-label="Mobile">
        {MOBILE_NAV_PRIMARY_LINKS.map((link) => (
          <MobileNavLink
            key={link.href}
            link={link}
            active={isNavbarActivePath(pathname, link.href)}
            onNavigate={onNavigate}
          />
        ))}

        <div className="flex flex-col py-0">
          <button
            type="button"
            className={mobileNavMoreToggleClassName(moreSectionActive)}
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((open) => !open)}
          >
            More
            <ChevronDownIcon open={moreOpen} />
          </button>

          {moreOpen ? (
            <div className="flex flex-col">
              {MOBILE_NAV_MORE_LINKS.map((link) => (
                <MobileNavLink
                  key={link.href}
                  link={link}
                  active={isNavbarActivePath(pathname, link.href)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          ) : null}
        </div>
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
    <Link
      href={link.href}
      className={mobileNavLinkClassName(active)}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      {link.label}
    </Link>
  );
}

function ChevronDownIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-6 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
