"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { LogoLink } from "@/shared/components/navbar/LogoLink";
import { PhoneNavLink } from "@/shared/components/navbar/PhoneNavLink";
import {
  MAIN_NAV_LINKS,
  NAV_CTA_LINKS,
  type NavLink,
} from "@/shared/components/navbar/navConfig";
import { NAV_ITEM_TEXT_CLASS } from "@/shared/lib/constants";
import { AccentButtonLink } from "@/shared/ui/button";

const NAVBAR_HEIGHT_CLASS = "h-16";

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/95 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-950/95">
      <nav
        className={`mx-auto flex ${NAVBAR_HEIGHT_CLASS} max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8`}
        aria-label="Main"
      >
        <div className="flex min-w-0 flex-1 items-center gap-8 lg:gap-10">
          <LogoLink onNavigate={closeMobile} />

          <ul className="hidden items-center gap-5 lg:flex xl:gap-6">
            {MAIN_NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                active={isActivePath(pathname, link.href)}
              />
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <PhoneNavLink
            className="hidden sm:inline-flex"
            onNavigate={closeMobile}
          />
          <AccentButtonLink
            href={NAV_CTA_LINKS.bookShoot.href}
            className="hidden sm:inline-flex"
          >
            {NAV_CTA_LINKS.bookShoot.label}
          </AccentButtonLink>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">
              {mobileOpen ? "Close menu" : "Open menu"}
            </span>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-zinc-200 bg-white px-4 py-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-950"
        >
          <ul className="flex flex-col gap-1">
            {MAIN_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={mobileNavLinkClass(
                    isActivePath(pathname, link.href),
                  )}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
            <PhoneNavLink
              className="justify-center py-2.5"
              onNavigate={closeMobile}
            />
            <AccentButtonLink
              href={NAV_CTA_LINKS.bookShoot.href}
              className="w-full py-2.5"
              onClick={closeMobile}
            >
              {NAV_CTA_LINKS.bookShoot.label}
            </AccentButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function NavItem({ link, active }: { link: NavLink; active: boolean }) {
  return (
    <li>
      <Link href={link.href} className={desktopNavLinkClass(active)}>
        {link.label}
      </Link>
    </li>
  );
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function desktopNavLinkClass(active: boolean): string {
  const base = `${NAV_ITEM_TEXT_CLASS} whitespace-nowrap transition-colors`;
  if (active) {
    return `${base} text-accent`;
  }
  return `${base} text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50`;
}

function mobileNavLinkClass(active: boolean): string {
  const base = `block rounded-md px-3 py-2.5 ${NAV_ITEM_TEXT_CLASS}`;
  if (active) {
    return `${base} bg-accent/10 text-accent`;
  }
  return `${base} text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-900`;
}

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
