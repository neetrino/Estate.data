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
import { DATA_BIM_PATH, isDataBimRoute } from "@/shared/lib/routes";
import {
  NAV_ITEM_TEXT_CLASS,
  NAVBAR_DESKTOP_ONLY_CLASS,
  NAVBAR_HEIGHT_CLASS,
  NAVBAR_MOBILE_BURGER_CLASS,
  NAVBAR_MOBILE_MENU_CLASS,
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  NAVBAR_OVERLAY_POSITION_CLASS,
  NAVBAR_STICKY_POSITION_CLASS,
  NAVBAR_TOP_PADDING_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";
import { navbarBookShootButtonClassName } from "@/shared/ui/button";

const NAVBAR_SURFACE_TRANSITION_CLASS =
  "transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out";

const NAVBAR_TRANSPARENT_CLASS = "bg-transparent";

const NAVBAR_GLASS_CLASS =
  "bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl backdrop-saturate-150";

const NAVBAR_SOLID_CLASS = "bg-white";

const NAVBAR_BURGER_BUTTON_CLASS =
  "relative z-[101] min-h-11 min-w-11 shrink-0 touch-manipulation cursor-pointer items-center justify-center rounded-md p-2 [-webkit-tap-highlight-color:transparent]";

const NAVBAR_MOBILE_PANEL_CLASS = [
  "fixed inset-x-0",
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  "z-[100]",
  "max-h-[calc(100dvh-4.5rem-1px-env(safe-area-inset-top,0px))]",
  "overflow-y-auto overscroll-contain",
  "border-t border-zinc-200/80 bg-white shadow-lg",
  "px-4 py-4",
  NAVBAR_MOBILE_MENU_CLASS,
].join(" ");

const NAVBAR_MOBILE_BACKDROP_CLASS = [
  "fixed inset-0",
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  "z-[99] bg-black/30",
  NAVBAR_MOBILE_MENU_CLASS,
].join(" ");

type NavbarProps = {
  /** Transparent at top; liquid glass after scroll (home hero). */
  overlay?: boolean;
};

export function Navbar({ overlay = false }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMenuPath, setMobileMenuPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isMobileMenuVisible = mobileMenuOpen && mobileMenuPath === pathname;

  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileMenuPath(null);
  }, []);

  const toggleMobileMenu = () => {
    if (isMobileMenuVisible) {
      closeMobile();
      return;
    }
    setMobileMenuPath(pathname);
    setMobileMenuOpen(true);
  };

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > NAVBAR_SCROLL_OFFSET_PX);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!isMobileMenuVisible) {
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };
  }, [isMobileMenuVisible]);

  const headerSurfaceClass = (() => {
    if (overlay) {
      return scrolled ? NAVBAR_GLASS_CLASS : NAVBAR_TRANSPARENT_CLASS;
    }
    return scrolled ? NAVBAR_GLASS_CLASS : NAVBAR_SOLID_CLASS;
  })();

  const navTone = overlay && !scrolled ? "light" : "dark";

  const positionClass = overlay ? NAVBAR_OVERLAY_POSITION_CLASS : NAVBAR_STICKY_POSITION_CLASS;

  const headerSurfaceWhenMenuOpen =
    isMobileMenuVisible && !overlay ? NAVBAR_SOLID_CLASS : headerSurfaceClass;

  return (
    <>
      <header
        className={`${positionClass} ${NAVBAR_SURFACE_TRANSITION_CLASS} ${NAVBAR_TOP_PADDING_CLASS} ${headerSurfaceWhenMenuOpen}`}
      >
        <nav
          className={`${PAGE_CONTAINER_CLASS} flex ${NAVBAR_HEIGHT_CLASS} items-center justify-between gap-3 ${PAGE_GUTTER_CLASS}`}
          aria-label="Main"
        >
          <LogoLink tone={navTone} onNavigate={closeMobile} />

          <div className={`${NAVBAR_DESKTOP_ONLY_CLASS} min-w-0 flex-1 justify-center px-4`}>
            <ul className="flex items-center justify-center gap-6 xl:gap-8">
              {MAIN_NAV_LINKS.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  active={isActivePath(pathname, link.href)}
                  tone={navTone}
                />
              ))}
            </ul>
          </div>

          <div className={`${NAVBAR_DESKTOP_ONLY_CLASS} shrink-0 items-center gap-6`}>
            <PhoneNavLink tone={navTone} onNavigate={closeMobile} />
            <Link href={NAV_CTA_LINKS.bookShoot.href} className={navbarBookShootButtonClassName}>
              {NAV_CTA_LINKS.bookShoot.label}
            </Link>
          </div>

          <button
            type="button"
            className={`${NAVBAR_BURGER_BUTTON_CLASS} ${NAVBAR_MOBILE_BURGER_CLASS} ${
              navTone === "light"
                ? "text-white hover:bg-white/10"
                : "text-black hover:bg-black/5"
            }`}
            aria-expanded={isMobileMenuVisible}
            aria-controls="mobile-nav"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">
              {isMobileMenuVisible ? "Close menu" : "Open menu"}
            </span>
            {isMobileMenuVisible ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>
      </header>

      {isMobileMenuVisible ? (
        <>
          <button
            type="button"
            className={NAVBAR_MOBILE_BACKDROP_CLASS}
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div id="mobile-nav" className={NAVBAR_MOBILE_PANEL_CLASS}>
            <ul className="flex flex-col gap-1">
              {MAIN_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={mobileNavLinkClass(isActivePath(pathname, link.href))}
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
}

type NavTone = "light" | "dark";

function NavItem({
  link,
  active,
  tone,
}: {
  link: NavLink;
  active: boolean;
  tone: NavTone;
}) {
  return (
    <li>
      <Link href={link.href} className={desktopNavLinkClass(active, tone)}>
        {link.label}
      </Link>
    </li>
  );
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === DATA_BIM_PATH) {
    return isDataBimRoute(pathname);
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function desktopNavLinkClass(active: boolean, tone: NavTone): string {
  const base = `${NAV_ITEM_TEXT_CLASS} whitespace-nowrap transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none`;
  if (active) {
    return `${base} text-accent`;
  }
  if (tone === "light") {
    return `${base} text-white`;
  }
  return `${base} text-black`;
}

function mobileNavLinkClass(active: boolean): string {
  const base = `block rounded-md px-3 py-3 ${NAV_ITEM_TEXT_CLASS} transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-none`;
  if (active) {
    return `${base} bg-accent/10 text-accent`;
  }
  return `${base} text-black hover:bg-accent/10`;
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
