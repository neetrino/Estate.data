import { HOME_LISTING_CTA_COPY } from "@/features/home/content/homeListingCtaCopy";
import {
  HOME_LISTING_CTA_BOOK_BUTTON_CLASS,
  HOME_LISTING_CTA_PANEL_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const HOME_LISTING_CTA_TITLE_CLASS =
  "text-3xl font-semibold tracking-tight text-accent-foreground md:text-4xl";

const HOME_LISTING_CTA_DESCRIPTION_CLASS =
  "mt-3 max-w-lg text-home-listing-cta-description";

export function HomeListingCta() {
  const { title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref } =
    HOME_LISTING_CTA_COPY;

  return (
    <section
      className="bg-what-we-do-surface py-14 sm:py-16 lg:py-20"
      aria-labelledby="listing-cta-heading"
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <div className={HOME_LISTING_CTA_PANEL_CLASS}>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 id="listing-cta-heading" className={HOME_LISTING_CTA_TITLE_CLASS}>
                {title}
              </h2>
              <p className={HOME_LISTING_CTA_DESCRIPTION_CLASS}>{description}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <EstatePillButtonLink
                href={primaryHref}
                className={HOME_LISTING_CTA_BOOK_BUTTON_CLASS}
              >
                {primaryLabel}
              </EstatePillButtonLink>
              <EstatePillButtonLink
                href={secondaryHref}
                className={HOME_LISTING_CTA_BOOK_BUTTON_CLASS}
              >
                {secondaryLabel}
              </EstatePillButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
