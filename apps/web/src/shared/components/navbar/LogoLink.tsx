"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { scrollPageToTop } from "@/shared/lib/scrollPageToTop";
import {
  LOGO_FOOTER_HEIGHT_CLASS,
  LOGO_FOOTER_WIDTH_CLASS,
  LOGO_NAV_HEIGHT_CLASS,
  LOGO_NAV_WIDTH_CLASS,
} from "@/shared/lib/constants";
import {
  SITE_LOGO_ALT,
  SITE_LOGO_CACHE_VERSION,
  SITE_LOGO_DARK_CACHE_VERSION,
  SITE_LOGO_DARK_PATH,
  SITE_LOGO_PATH,
} from "@/shared/components/navbar/navConfig";

/** Intrinsic dimensions for Next Image (source ~637×392). */
const LOGO_SOURCE_WIDTH_PX = 637;
const LOGO_SOURCE_HEIGHT_PX = 392;

const LOGO_LAYER_TRANSITION_CLASS =
  "transition-opacity duration-300 ease-out";

type NavTone = "light" | "dark";

type LogoSize = "nav" | "footer";

type LogoDisplaySpec = {
  readonly linkClass: string;
  readonly layerLightClass: string;
  readonly layerDarkClass: string;
};

const LOGO_SIZE_SPECS: Record<LogoSize, LogoDisplaySpec> = {
  nav: {
    linkClass: `${LOGO_NAV_HEIGHT_CLASS} ${LOGO_NAV_WIDTH_CLASS}`,
    layerLightClass: `absolute inset-0 ${LOGO_NAV_HEIGHT_CLASS} w-full object-contain object-left`,
    layerDarkClass: `absolute -left-[4px] -top-[3px] ${LOGO_NAV_HEIGHT_CLASS} w-full object-contain object-left`,
  },
  footer: {
    linkClass: `${LOGO_FOOTER_HEIGHT_CLASS} ${LOGO_FOOTER_WIDTH_CLASS}`,
    layerLightClass: `absolute inset-0 ${LOGO_FOOTER_HEIGHT_CLASS} w-full object-contain object-left`,
    layerDarkClass: `absolute -left-[6px] -top-[4px] ${LOGO_FOOTER_HEIGHT_CLASS} w-full object-contain object-left`,
  },
};

type LogoLinkProps = {
  onNavigate?: () => void;
  /** When already on home — parent may defer scroll (e.g. mobile menu body lock). */
  onHomeClick?: () => void;
  tone?: NavTone;
  size?: LogoSize;
};

function logoLayerOpacityClass(visible: boolean): string {
  return visible ? "opacity-100" : "opacity-0";
}

export function LogoLink({ onNavigate, onHomeClick, tone = "dark", size = "nav" }: LogoLinkProps) {
  const pathname = usePathname();
  const isLight = tone === "light";
  const { linkClass, layerLightClass, layerDarkClass } = LOGO_SIZE_SPECS[size];

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();

    if (onHomeClick) {
      onHomeClick();
      return;
    }

    scrollPageToTop();
  };

  return (
    <Link
      href="/"
      className={`relative inline-flex shrink-0 ${linkClass}`}
      onClick={handleClick}
    >
      <Image
        src={`${SITE_LOGO_PATH}?v=${SITE_LOGO_CACHE_VERSION}`}
        alt={SITE_LOGO_ALT}
        width={LOGO_SOURCE_WIDTH_PX}
        height={LOGO_SOURCE_HEIGHT_PX}
        priority
        unoptimized
        className={`${layerLightClass} ${LOGO_LAYER_TRANSITION_CLASS} ${logoLayerOpacityClass(isLight)}`}
      />
      <Image
        src={`${SITE_LOGO_DARK_PATH}?v=${SITE_LOGO_DARK_CACHE_VERSION}`}
        alt=""
        aria-hidden
        width={LOGO_SOURCE_WIDTH_PX}
        height={LOGO_SOURCE_HEIGHT_PX}
        priority
        unoptimized
        className={`${layerDarkClass} ${LOGO_LAYER_TRANSITION_CLASS} ${logoLayerOpacityClass(!isLight)}`}
      />
    </Link>
  );
}
