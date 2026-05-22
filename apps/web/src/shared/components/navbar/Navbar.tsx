"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NAVBAR_BURGER_TOGGLE_DEBOUNCE_MS,
  NAVBAR_SCROLL_OFFSET_PX,
} from "@/shared/lib/constants";
import { LogoLink } from "@/shared/components/navbar/LogoLink";
import {
  MAIN_NAV_LINKS,
  NAV_CTA_LINKS,
  type NavLink,
} from "@/shared/components/navbar/navConfig";
import { MobileNavMenu } from "@/shared/components/navbar/MobileNavMenu";
import { isNavbarActivePath } from "@/shared/components/navbar/navActivePath";
import {
  NAV_ITEM_TEXT_CLASS,
  NAVBAR_DESKTOP_ONLY_CLASS,
  NAVBAR_GLASS_SURFACE_CLASS,
  NAVBAR_HEIGHT_CLASS,
  NAVBAR_MOBILE_BURGER_CLASS,
  NAVBAR_MOBILE_MENU_CLASS,
  NAVBAR_MOBILE_MENU_RADIUS_CLASS,
  NAVBAR_HEADER_MENU_OPEN_Z_CLASS,
  NAVBAR_MOBILE_BACKDROP_Z_CLASS,
  NAVBAR_MOBILE_PANEL_SURFACE_CLASS,
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  NAVBAR_MOBILE_PANEL_Z_CLASS,
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

const NAVBAR_SOLID_CLASS = "bg-white";

const NAVBAR_BURGER_BUTTON_CLASS =
  "relative z-[101] min-h-11 min-w-11 shrink-0 touch-manipulation cursor-pointer items-center justify-center rounded-md p-2 [-webkit-tap-highlight-color:transparent]";

const NAVBAR_MOBILE_PANEL_CLASS = [
  "fixed inset-x-0",
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  NAVBAR_MOBILE_PANEL_Z_CLASS,
  "flex max-h-[calc(100dvh-4.5rem+11px-env(safe-area-inset-top,0px))] flex-col overflow-hidden",
  NAVBAR_MOBILE_PANEL_SURFACE_CLASS,
  NAVBAR_MOBILE_MENU_RADIUS_CLASS,
  NAVBAR_MOBILE_MENU_CLASS,
].join(" ");

const NAVBAR_MOBILE_BACKDROP_CLASS = [
  "fixed inset-0",
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  NAVBAR_MOBILE_BACKDROP_Z_CLASS,
  "bg-black/30",
  NAVBAR_MOBILE_MENU_CLASS,
].join(" ");

type NavbarProps = {
  /** Transparent at top; liquid glass after scroll (home hero). */
  overlay?: boolean;
};

export function Navbar({ overlay = false }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const previousPathnameRef = useRef<string | null>(null);
  const lastBurgerToggleAtRef = useRef(0);

  const isMobileMenuVisible = mobileMenuOpen;

  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleBurgerActivate = useCallback(() => {
    const now = Date.now();
    if (now - lastBurgerToggleAtRef.current < NAVBAR_BURGER_TOGGLE_DEBOUNCE_MS) {
      return;
    }
    lastBurgerToggleAtRef.current = now;
    setMobileMenuOpen((open) => !open);
  }, []);

  const handleBurgerPointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }
    handleBurgerActivate();
  };

  useEffect(() => {
    if (previousPathnameRef.current === null) {
      previousPathnameRef.current = pathname;
      return;
    }
    if (previousPathnameRef.current !== pathname) {
      previousPathnameRef.current = pathname;
      setMobileMenuOpen(false);
    }
  }, [pathname]);

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

    const scrollY = window.scrollY;
    const { body } = document;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      body.style.position = previous.position;
      body.style.top = previous.top;
      body.style.left = previous.left;
      body.style.right = previous.right;
      body.style.width = previous.width;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuVisible]);

  const headerSurfaceClass = (() => {
    if (overlay) {
      return scrolled ? NAVBAR_GLASS_SURFACE_CLASS : NAVBAR_TRANSPARENT_CLASS;
    }
    return scrolled ? NAVBAR_GLASS_SURFACE_CLASS : NAVBAR_SOLID_CLASS;
  })();

  const navTone =
    isMobileMenuVisible || !overlay || scrolled ? "dark" : "light";

  const positionClass = overlay ? NAVBAR_OVERLAY_POSITION_CLASS : NAVBAR_STICKY_POSITION_CLASS;

  const headerSurfaceWhenMenuOpen = isMobileMenuVisible
    ? NAVBAR_SOLID_CLASS
    : headerSurfaceClass;

  const headerZClass = isMobileMenuVisible ? NAVBAR_HEADER_MENU_OPEN_Z_CLASS : "";

  return (
    <>
      <header
        className={`${positionClass} ${headerZClass} ${NAVBAR_SURFACE_TRANSITION_CLASS} ${NAVBAR_TOP_PADDING_CLASS} ${headerSurfaceWhenMenuOpen}`}
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
                  active={isNavbarActivePath(pathname, link.href)}
                  tone={navTone}
                />
              ))}
            </ul>
          </div>

          <div className={`${NAVBAR_DESKTOP_ONLY_CLASS} shrink-0 items-center`}>
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
            onPointerUp={handleBurgerPointerUp}
            onClick={handleBurgerActivate}
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
            <MobileNavMenu pathname={pathname} onNavigate={closeMobile} />
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
