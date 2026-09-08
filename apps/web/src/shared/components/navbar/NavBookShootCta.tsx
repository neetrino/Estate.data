"use client";

import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { STUDIO_NAV_BUTTON_CLASS } from "@/features/home/sections/studioSectionStyles";

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
    <HomeSectionLink href={href} className={STUDIO_NAV_BUTTON_CLASS}>
      {label}
    </HomeSectionLink>
  );
}
