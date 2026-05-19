"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NAVBAR_SCROLL_OFFSET_PX } from "@/shared/lib/constants";
import { LogoLink } from "@/shared/components/navbar/LogoLink";
import { PhoneNavLink } from "@/shared/components/navbar/PhoneNavLink";
import {
  MAIN_NAV_LINKS,
  NAV_CTA_LINKS,
  type NavLink,
} from "@/shared/components/navbar/navConfig";
import {
  NAV_ITEM_TEXT_CLASS,
  NAVBAR_HEIGHT_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";
import { AccentButtonLink } from "@/shared/ui/button";

const NAVBAR_SURFACE_BASE =
  "sticky top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out";

const NAVBAR_TRANSPARENT_CLASS = "bg-transparent";

const NAVBAR_GLASS_CLASS =
  "bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150";

const NAVBAR_SOLID_CLASS = "bg-white";

type NavbarProps = {
  /** Transparent at top; liquid glass after scroll (home hero). */
  overlay?: boolean;
};

export function Navbar({ overlay = false }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > NAVBAR_SCROLL_OFFSET_PX);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const headerSurfaceClass = (() => {
    if (overlay) {
      return scrolled ? NAVBAR_GLASS_CLASS : NAVBAR_TRANSPARENT_CLASS;
    }
    return scrolled ? NAVBAR_GLASS_CLASS : NAVBAR_SOLID_CLASS;
  })();

  return (
    <header className={`${NAVBAR_SURFACE_BASE} ${headerSurfaceClass}`}>
      <nav
        className={`${PAGE_CONTAINER_CLASS} flex ${NAVBAR_HEIGHT_CLASS} items-center gap-4 ${PAGE_GUTTER_CLASS}`}
        aria-label="Main"
      >
        <LogoLink onNavigate={closeMobile} />

        <div className="flex min-w-0 flex-1 justify-center px-4">
          <ul className="hidden items-center justify-center gap-6 lg:flex xl:gap-8">
            {MAIN_NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                active={isActivePath(pathname, link.href)}
              />
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-5 sm:gap-6">
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
            className="inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-black/5 lg:hidden"
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
          className="border-t border-zinc-200/80 bg-white/95 px-4 py-4 backdrop-blur-xl lg:hidden"
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
          <div className="mt-4 flex flex-col gap-3 border-t border-zinc-200 pt-4">
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
  return `${base} text-black hover:text-black/80`;
}

function mobileNavLinkClass(active: boolean): string {
  const base = `block rounded-md px-3 py-2.5 ${NAV_ITEM_TEXT_CLASS}`;
  if (active) {
    return `${base} bg-accent/10 text-accent`;
  }
  return `${base} text-black hover:bg-zinc-50`;
}

function MenuIcon() {
  return (
    <svg
      width="26"
      height="26"
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
      width="26"
      height="26"
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
