"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  NAVBAR_BURGER_TOGGLE_DEBOUNCE_MS,
  NAVBAR_MOBILE_BACKDROP_Z_CLASS,
  NAVBAR_MOBILE_MENU_CLASS,
  NAVBAR_MOBILE_MENU_RADIUS_CLASS,
  NAVBAR_MOBILE_PANEL_SURFACE_CLASS,
  NAVBAR_MOBILE_PANEL_TOP_LANDING_PILL_CLASS,
  NAVBAR_MOBILE_PANEL_Z_CLASS,
  NAVBAR_OVERLAY_POSITION_CLASS,
  NAVBAR_SCROLL_OFFSET_PX,
  NAVBAR_TOP_PADDING_CLASS,
  NAV_ITEM_TEXT_CLASS,
  NAVBAR_DESKTOP_ONLY_CLASS,
  NAVBAR_HEADER_MENU_OPEN_Z_CLASS,
  NAVBAR_MOBILE_BURGER_CLASS,
  SITE_PAGE_SHELL_CLASS,
} from "@/shared/lib/constants";
import { LogoLink } from "@/shared/components/navbar/LogoLink";
import {
  MAIN_NAV_LINKS,
  NAV_CTA_LINKS,
  SERVICE_NAV_LINKS,
  type NavLink,
} from "@/shared/components/navbar/navConfig";
import { MobileNavMenu } from "@/shared/components/navbar/MobileNavMenu";
import { isNavbarActivePath } from "@/shared/components/navbar/navActivePath";
import { NavBookShootCta } from "@/shared/components/navbar/NavBookShootCta";
import { scrollPageToTop } from "@/shared/lib/scrollPageToTop";
import type { ServiceCatalogItem } from "@/shared/lib/serviceCatalog";

const NAVBAR_SURFACE_TRANSITION_CLASS =
  "transition-[background-color,backdrop-filter,box-shadow] duration-300 ease-out";

const NAVBAR_TRANSPARENT_CLASS = "bg-transparent";

const NAVBAR_BURGER_BUTTON_CLASS =
  "relative z-[101] min-h-11 min-w-11 shrink-0 touch-manipulation cursor-pointer items-center justify-center rounded-md p-2 [-webkit-tap-highlight-color:transparent]";

const NAVBAR_MOBILE_PANEL_TOP_CLASS = NAVBAR_MOBILE_PANEL_TOP_LANDING_PILL_CLASS;

const NAVBAR_MOBILE_PANEL_CLASS = [
  "fixed",
  "left-[calc(1rem-5px)] right-[calc(1rem-5px)]",
  "sm:left-[calc(1.5rem-5px)] sm:right-[calc(1.5rem-5px)]",
  "lg:left-[calc(2rem-5px)] lg:right-[calc(2rem-5px)]",
  "xl:left-[calc(2.5rem-5px)] xl:right-[calc(2.5rem-5px)]",
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  NAVBAR_MOBILE_PANEL_Z_CLASS,
  "flex max-h-[calc(100dvh-7.75rem+7px-env(safe-area-inset-top,0px))] flex-col overflow-hidden",
  "sm:max-h-[calc(100dvh-8rem+7px-env(safe-area-inset-top,0px))]",
  "lg:max-h-[calc(100dvh-8.25rem+7px-env(safe-area-inset-top,0px))]",
  NAVBAR_MOBILE_PANEL_SURFACE_CLASS,
  NAVBAR_MOBILE_MENU_RADIUS_CLASS,
  NAVBAR_MOBILE_MENU_CLASS,
].join(" ");

const NAVBAR_MOBILE_BACKDROP_CLASS = [
  "fixed inset-0",
  NAVBAR_MOBILE_PANEL_TOP_CLASS,
  NAVBAR_MOBILE_BACKDROP_Z_CLASS,
  "bg-transparent",
  NAVBAR_MOBILE_MENU_CLASS,
].join(" ");

type NavbarProps = {
  /** Fixed over hero (home). Defaults to home route. */
  overlay?: boolean;
  /** Glass pill shell — links stay dark for contrast on the pill surface. */
  landingPill?: boolean;
};

export function Navbar({ overlay, landingPill = true }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isOverlay = overlay ?? isHome;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const previousPathnameRef = useRef<string | null>(null);
  const lastBurgerToggleAtRef = useRef(0);
  const scrollHomeOnLogoRef = useRef(false);

  const isMobileMenuVisible = mobileMenuOpen;

  const closeMobile = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const handleHomeLogoClick = useCallback(() => {
    scrollHomeOnLogoRef.current = true;

    if (!isMobileMenuVisible) {
      scrollPageToTop();
    }
  }, [isMobileMenuVisible]);

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

      if (scrollHomeOnLogoRef.current) {
        scrollHomeOnLogoRef.current = false;
        window.scrollTo(0, scrollY);
        scrollPageToTop();
        return;
      }

      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuVisible]);

  const headerSurfaceClass = NAVBAR_TRANSPARENT_CLASS;

  const navTone =
    landingPill || isMobileMenuVisible || !isOverlay || scrolled ? "dark" : "light";

  const positionClass = NAVBAR_OVERLAY_POSITION_CLASS;

  const headerZClass = isMobileMenuVisible ? NAVBAR_HEADER_MENU_OPEN_Z_CLASS : "";

  return (
    <>
      <header
        className={`${positionClass} ${headerZClass} ${NAVBAR_SURFACE_TRANSITION_CLASS} ${NAVBAR_TOP_PADDING_CLASS} ${headerSurfaceClass}`}
      >
        <nav
          className={[SITE_PAGE_SHELL_CLASS, "py-3 sm:py-4"].join(" ")}
          aria-label="Main"
        >
          <div
            className={[
              "navbar-landing-pill",
              isHome ? "navbar-landing-pill--home" : "",
              "flex min-h-[3.75rem] items-center justify-between gap-3 px-4 sm:min-h-[4rem] sm:px-5 lg:px-6",
            ].join(" ")}
          >
            <LogoLink
              tone={navTone}
              onNavigate={closeMobile}
              onHomeClick={handleHomeLogoClick}
            />

            <div className={`${NAVBAR_DESKTOP_ONLY_CLASS} min-w-0 flex-1 justify-center px-4`}>
              <ul className="flex items-center justify-center gap-5 xl:gap-7">
                {MAIN_NAV_LINKS.map((link) => (
                  <NavItem
                    key={link.href}
                    link={link}
                    active={isNavbarActivePath(pathname, link.href)}
                    tone={navTone}
                    serviceLinks={link.href === "/services" ? SERVICE_NAV_LINKS : undefined}
                  />
                ))}
              </ul>
            </div>

            <div className={`${NAVBAR_DESKTOP_ONLY_CLASS} shrink-0 items-center`}>
              <NavBookShootCta
                href={NAV_CTA_LINKS.bookShoot.href}
                label={NAV_CTA_LINKS.bookShoot.label}
              />
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
          </div>
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
  serviceLinks,
}: {
  link: NavLink;
  active: boolean;
  tone: NavTone;
  serviceLinks?: readonly ServiceCatalogItem[];
}) {
  const hasServiceDropdown = (serviceLinks?.length ?? 0) > 0;

  return (
    <li className={hasServiceDropdown ? "group relative" : undefined}>
      <Link
        href={link.href}
        className={desktopNavLinkClass(active, tone)}
        aria-current={active ? "page" : undefined}
      >
        {link.label}
      </Link>
      {hasServiceDropdown ? (
        <div className="pointer-events-none invisible absolute left-1/2 top-full z-[130] mt-3 w-72 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all duration-150 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100">
          <ul className="space-y-1" aria-label="Services">
            {serviceLinks?.map((service) => (
              <li key={service.id}>
                {service.enabled ? (
                  <Link
                    href={service.href}
                    className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    {service.label}
                  </Link>
                ) : (
                  <span
                    className="flex cursor-not-allowed items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-400"
                    aria-disabled
                  >
                    <span>{service.label}</span>
                    {service.comingSoon ? (
                      <span className="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-500">
                        Coming Soon
                      </span>
                    ) : null}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function desktopNavLinkClass(active: boolean, tone: NavTone): string {
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
