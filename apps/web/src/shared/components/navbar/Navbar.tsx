"use client";

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
} from "@/shared/components/navbar/navConfig";
import { MobileNavMenu } from "@/shared/components/navbar/MobileNavMenu";
import { isNavbarActivePath } from "@/shared/components/navbar/navActivePath";
import { NavBookShootCta } from "@/shared/components/navbar/NavBookShootCta";
import { NavDesktopItem } from "@/shared/components/navbar/NavDesktopItem";
import { useLocationHash } from "@/shared/components/navbar/useLocationHash";
import { scrollPageToTop } from "@/shared/lib/scrollPageToTop";

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
};

export function Navbar({ overlay }: NavbarProps) {
  const pathname = usePathname();
  const hash = useLocationHash();
  const isHome = pathname === "/";
  const isOverlay = overlay ?? isHome;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOverHomeHero, setIsOverHomeHero] = useState(true);
  const [isInitialHeaderAnimating, setIsInitialHeaderAnimating] = useState(true);
  const previousPathnameRef = useRef<string | null>(null);
  const lastBurgerToggleAtRef = useRef(0);
  const scrollHomeOnLogoRef = useRef(false);
  const initialHeaderAnimationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    initialHeaderAnimationTimeoutRef.current = setTimeout(() => {
      setIsInitialHeaderAnimating(false);
    }, 420);

    return () => {
      if (initialHeaderAnimationTimeoutRef.current) {
        clearTimeout(initialHeaderAnimationTimeoutRef.current);
      }
    };
  }, []);

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
    if (!isOverlay) {
      return;
    }

    const updateHeroOverlayState = () => {
      const heroElement = document.querySelector<HTMLElement>(".la-hero");
      if (!heroElement) {
        setIsOverHomeHero(window.scrollY <= NAVBAR_SCROLL_OFFSET_PX);
        return;
      }

      const heroBottom = heroElement.offsetTop + heroElement.offsetHeight;
      const navbarEstimatedHeightPx = 112;
      setIsOverHomeHero(window.scrollY + navbarEstimatedHeightPx < heroBottom);
    };

    updateHeroOverlayState();
    window.addEventListener("scroll", updateHeroOverlayState, { passive: true });
    window.addEventListener("resize", updateHeroOverlayState);

    return () => {
      window.removeEventListener("scroll", updateHeroOverlayState);
      window.removeEventListener("resize", updateHeroOverlayState);
    };
  }, [isOverlay]);

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

  const navTone = "light";
  const useFigmaHomeDesktopHeader = true;
  const useTransparentHomeHeader =
    isOverlay && useFigmaHomeDesktopHeader && isOverHomeHero && !isMobileMenuVisible;

  const positionClass = NAVBAR_OVERLAY_POSITION_CLASS;

  const headerZClass = isMobileMenuVisible ? NAVBAR_HEADER_MENU_OPEN_Z_CLASS : "";

  return (
    <>
      <header
        className={[
          positionClass,
          headerZClass,
          NAVBAR_SURFACE_TRANSITION_CLASS,
          NAVBAR_TOP_PADDING_CLASS,
          headerSurfaceClass,
          "transform-gpu transition-[transform,opacity,filter] duration-360 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isInitialHeaderAnimating ? "translate-y-[-8px] opacity-0 blur-[2px]" : "translate-y-0 opacity-100 blur-0",
          "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-0",
        ].join(" ")}
      >
        <nav
          className={[
            useFigmaHomeDesktopHeader
              ? "w-full px-0 py-0"
              : `${SITE_PAGE_SHELL_CLASS} py-3 sm:py-4`,
          ].join(" ")}
          aria-label="Main"
        >
          <div
            className={[
              useFigmaHomeDesktopHeader
                ? [
                    "la-home-navbar-shell border-b transition-[background-color,border-color,backdrop-filter,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    useTransparentHomeHeader
                      ? "border-white/0 bg-transparent backdrop-blur-[0px] shadow-none"
                      : "border-studio-border bg-studio-bg/85 backdrop-blur-xl shadow-[0_24px_60px_rgba(0,0,0,0.35)]",
                  ].join(" ")
                : "navbar-landing-pill",
              isOverlay && !useFigmaHomeDesktopHeader ? "navbar-landing-pill--home" : "",
              useFigmaHomeDesktopHeader
                ? "flex items-center justify-between gap-8 px-8 py-6"
                : "flex min-h-[3.75rem] items-center justify-between gap-3 px-4 sm:min-h-[4rem] sm:px-5 lg:px-6",
            ].join(" ")}
          >
            <div
              className={[
                "transform-gpu transition-[transform,opacity,filter] duration-360 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-0",
                isInitialHeaderAnimating
                  ? "translate-y-[5px] opacity-0 blur-[1px]"
                  : "translate-y-0 opacity-100 blur-0",
              ].join(" ")}
            >
              <LogoLink
                tone={navTone}
                onNavigate={closeMobile}
                onHomeClick={handleHomeLogoClick}
                useFigmaHomeDesktopStyle={useFigmaHomeDesktopHeader}
              />
            </div>

            <div
              className={`${NAVBAR_DESKTOP_ONLY_CLASS} min-w-0 flex-1 justify-center px-4 transform-gpu transition-[transform,opacity,filter] duration-360 delay-40 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-0 ${
                isInitialHeaderAnimating
                  ? "translate-y-[6px] opacity-0 blur-[1px]"
                  : "translate-y-0 opacity-100 blur-0"
              }`}
            >
              <ul className="flex items-center justify-center gap-8">
                {MAIN_NAV_LINKS.map((link) => (
                  <NavDesktopItem
                    key={link.label}
                    link={link}
                    active={isNavbarActivePath(pathname, link.href, hash)}
                    tone={useFigmaHomeDesktopHeader ? "dark" : navTone}
                    serviceLinks={link.hasServicesDropdown ? SERVICE_NAV_LINKS : undefined}
                    useOverlayStyle={useFigmaHomeDesktopHeader}
                  />
                ))}
              </ul>
            </div>

            <div
              className={`${NAVBAR_DESKTOP_ONLY_CLASS} shrink-0 items-center gap-3 transform-gpu transition-[transform,opacity,filter] duration-360 delay-80 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:blur-0 ${
                isInitialHeaderAnimating
                  ? "translate-y-[7px] opacity-0 blur-[1px]"
                  : "translate-y-0 opacity-100 blur-0"
              }`}
            >
              <NavBookShootCta
                href={NAV_CTA_LINKS.bookShoot.href}
                label={useFigmaHomeDesktopHeader ? "BOOK A SHOOT" : NAV_CTA_LINKS.bookShoot.label}
                useFigmaHomeDesktopStyle={useFigmaHomeDesktopHeader}
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
            <MobileNavMenu pathname={pathname} hash={hash} onNavigate={closeMobile} />
          </div>
        </>
      ) : null}
    </>
  );
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
