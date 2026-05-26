import Link from "next/link";
import { NOT_FOUND_PAGE_COPY } from "@/features/not-found/content/notFoundPageCopy";
import {
  NOT_FOUND_CTA_ROW_CLASS,
  NOT_FOUND_DISPLAY_CODE_CLASS,
  NOT_FOUND_QUICK_LINK_BUTTON_CLASS,
  NOT_FOUND_QUICK_LINKS_CARD_CLASS,
  NOT_FOUND_QUICK_LINKS_LIST_CLASS,
} from "@/features/not-found/lib/notFoundStyles";
import {
  INNER_PAGE_MAIN_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_PAGE_EYEBROW_CLASS,
  WHAT_WE_DO_PAGE_SUBTITLE_CLASS,
  WHAT_WE_DO_PAGE_TITLE_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink, LandingOutlineButtonLink } from "@/shared/ui/button";

export function NotFoundPage() {
  const { eyebrow, title, subtitle, primaryCta, secondaryCta, quickLinksHeading, quickLinks } =
    NOT_FOUND_PAGE_COPY;

  return (
    <main className={INNER_PAGE_MAIN_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <header className="max-w-2xl">
              <p className={WHAT_WE_DO_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
              <h1 className={WHAT_WE_DO_PAGE_TITLE_CLASS}>{title}</h1>
              <p className={WHAT_WE_DO_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
              <div className={NOT_FOUND_CTA_ROW_CLASS}>
                <EstatePillButtonLink href={primaryCta.href}>{primaryCta.label}</EstatePillButtonLink>
                <LandingOutlineButtonLink href={secondaryCta.href} showArrow={false}>
                  {secondaryCta.label}
                </LandingOutlineButtonLink>
              </div>
            </header>
            <p className={NOT_FOUND_DISPLAY_CODE_CLASS} aria-hidden>
              404
            </p>
          </div>

          <section className={NOT_FOUND_QUICK_LINKS_CARD_CLASS} aria-labelledby="not-found-quick-links">
            <h2
              id="not-found-quick-links"
              className="text-lg font-bold text-what-we-do-title sm:text-xl"
            >
              {quickLinksHeading}
            </h2>
            <ul className={NOT_FOUND_QUICK_LINKS_LIST_CLASS}>
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={NOT_FOUND_QUICK_LINK_BUTTON_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
    </main>
  );
}
