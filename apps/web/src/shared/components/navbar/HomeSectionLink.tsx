"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  homeHashHref,
  homeSectionSearchHref,
  resolveHomeSectionId,
  scrollToHomeSection,
  scrollToHomeSectionAfterMenu,
} from "@/shared/lib/scrollToHomeSection";

type HomeSectionLinkProps = {
  readonly href: string;
  readonly className?: string;
  readonly children: ReactNode;
  readonly onNavigate?: () => void;
  readonly ariaCurrent?: "page" | undefined;
};

/**
 * Same-page section jumps use a native hash `<a>` so Next.js App Router
 * does not intercept `/#id` or throw on `history.replaceState`.
 */
export function HomeSectionLink({
  href,
  className,
  children,
  onNavigate,
  ariaCurrent,
}: HomeSectionLinkProps) {
  const pathname = usePathname();
  const sectionId = resolveHomeSectionId(href);

  if (!sectionId) {
    return (
      <Link
        href={href}
        className={className}
        aria-current={ariaCurrent}
        onClick={() => onNavigate?.()}
      >
        {children}
      </Link>
    );
  }

  if (pathname !== "/") {
    return (
      <Link
        href={homeSectionSearchHref(sectionId)}
        className={className}
        aria-current={ariaCurrent}
        onClick={() => onNavigate?.()}
      >
        {children}
      </Link>
    );
  }

  return (
    <HomeHashAnchor
      sectionId={sectionId}
      className={className}
      onNavigate={onNavigate}
      ariaCurrent={ariaCurrent}
    >
      {children}
    </HomeHashAnchor>
  );
}

type HomeHashAnchorProps = {
  readonly sectionId: string;
  readonly className?: string;
  readonly children: ReactNode;
  readonly onNavigate?: () => void;
  readonly ariaCurrent?: "page" | undefined;
};

function HomeHashAnchor({
  sectionId,
  className,
  children,
  onNavigate,
  ariaCurrent,
}: HomeHashAnchorProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>): void {
    event.preventDefault();
    onNavigate?.();
    if (onNavigate) {
      scrollToHomeSectionAfterMenu(sectionId);
      return;
    }
    scrollToHomeSection(sectionId);
  }

  return (
    <a
      href={homeHashHref(sectionId)}
      className={className}
      aria-current={ariaCurrent}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
