"use client";

import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { STUDIO_PRIMARY_BUTTON_CLASS } from "@/features/home/sections/studioSectionStyles";

type NavBookShootCtaProps = {
  href: string;
  label: string;
  useFigmaHomeDesktopStyle?: boolean;
};

export function NavBookShootCta({
  href,
  label,
}: NavBookShootCtaProps) {
  return (
    <HomeSectionLink href={href} className={`${STUDIO_PRIMARY_BUTTON_CLASS} h-10 px-6 py-0`}>
      {label}
      <span aria-hidden>→</span>
    </HomeSectionLink>
  );
}
