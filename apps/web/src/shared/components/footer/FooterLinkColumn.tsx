"use client";

import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import type { FooterNavLink } from "@/shared/components/footer/footerConfig";
import { FOOTER_COLUMN_TITLE_CLASS, FOOTER_LINK_CLASS } from "@/shared/lib/constants";

type FooterLinkColumnProps = {
  title: string;
  links: readonly FooterNavLink[];
  className?: string;
};

export function FooterLinkColumn({ title, links, className }: FooterLinkColumnProps) {
  const rootClassName = className ? `shrink-0 ${className}` : "shrink-0";

  return (
    <div className={rootClassName}>
      <h3 className={FOOTER_COLUMN_TITLE_CLASS}>{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.id}>
            {link.disabled ? (
              <span
                className={`${FOOTER_LINK_CLASS} cursor-not-allowed opacity-60`}
                aria-disabled
              >
                {link.label}
              </span>
            ) : (
              <HomeSectionLink href={link.href} className={FOOTER_LINK_CLASS}>
                {link.label}
              </HomeSectionLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
