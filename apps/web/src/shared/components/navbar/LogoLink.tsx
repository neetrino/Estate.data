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
  SITE_BRAND_WORDMARK,
  SITE_LOGO_ALT,
  SITE_LOGO_CACHE_VERSION,
  SITE_LOGO_DARK_CACHE_VERSION,
  SITE_LOGO_DARK_PATH,
  SITE_LOGO_PATH,
} from "@/shared/components/navbar/navConfig";
import { STUDIO_MARK_SRC, STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";

/** Intrinsic dimensions for Next Image (source ~637×392). */
const LOGO_SOURCE_WIDTH_PX = 637;
const LOGO_SOURCE_HEIGHT_PX = 392;

const LOGO_LAYER_TRANSITION_CLASS =
  "transition-opacity duration-300 ease-out";

type NavTone = "light" | "dark";

type LogoSize = "nav" | "footer";

type LogoDisplaySpec = {
  readonly imageWrapClass: string;
  readonly layerLightClass: string;
  readonly layerDarkClass: string;
};

const LOGO_SIZE_SPECS: Record<LogoSize, LogoDisplaySpec> = {
  nav: {
    imageWrapClass: `${LOGO_NAV_HEIGHT_CLASS} ${LOGO_NAV_WIDTH_CLASS}`,
    layerLightClass: `absolute inset-0 ${LOGO_NAV_HEIGHT_CLASS} w-full object-contain object-left`,
    layerDarkClass: `absolute -left-[4px] -top-[3px] ${LOGO_NAV_HEIGHT_CLASS} w-full object-contain object-left`,
  },
  footer: {
    imageWrapClass: `${LOGO_FOOTER_HEIGHT_CLASS} ${LOGO_FOOTER_WIDTH_CLASS}`,
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
  customLabel?: string;
  customIconPath?: string;
  useFigmaHomeDesktopStyle?: boolean;
};

function logoLayerOpacityClass(visible: boolean): string {
  return visible ? "opacity-100" : "opacity-0";
}

export function LogoLink({
  onNavigate,
  onHomeClick,
  tone = "dark",
  size = "nav",
  customLabel,
  customIconPath,
  useFigmaHomeDesktopStyle = false,
}: LogoLinkProps) {
  const pathname = usePathname();
  const isLight = tone === "light";
  const { imageWrapClass, layerLightClass, layerDarkClass } = LOGO_SIZE_SPECS[size];
  const toneClassName = isLight ? "text-white" : "text-slate-900";
  const rootClassName = "inline-flex";
  const brandLabel = customLabel ?? SITE_BRAND_WORDMARK;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (pathname !== "/" || size !== "nav") {
      return;
    }

    event.preventDefault();

    if (onHomeClick) {
      onHomeClick();
      return;
    }

    scrollPageToTop();
  };

  if (useFigmaHomeDesktopStyle && size === "nav") {
    return (
      <Link
        href="/"
        className="relative inline-flex shrink-0 items-center gap-3 text-studio-fg"
        onClick={handleClick}
      >
        <span className="relative size-8 shrink-0">
          <Image
            src={customIconPath ?? STUDIO_MARK_SRC}
            alt=""
            aria-hidden
            fill
            unoptimized
            className="object-contain"
          />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-bold tracking-[0.16em]">
            {brandLabel}
          </span>
          <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-studio-muted">
            {STUDIO_PAGE_COPY.brand.kicker}
          </span>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`${rootClassName} ${toneClassName} relative shrink-0`}
      onClick={handleClick}
    >
      <span className={`relative ${imageWrapClass}`}>
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
      </span>
    </Link>
  );
}
