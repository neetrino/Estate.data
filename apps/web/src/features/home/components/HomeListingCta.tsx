import { HOME_LISTING_CTA_COPY } from "@/features/home/content/homeListingCtaCopy";
import { LANDING_CONTAINER_CLASS, LANDING_SECTION_MUTED_CLASS } from "@/features/home/landing/lib/landingStyles";
import {
  HOME_LISTING_CTA_BUTTONS_WRAP_CLASS,
  HOME_LISTING_CTA_MOBILE_PILL_CLASS,
  HOME_LISTING_CTA_PANEL_CLASS,
  HOME_LISTING_CTA_PILL_BUTTON_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

export function HomeListingCta() {
  const { title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref } =
    HOME_LISTING_CTA_COPY;

  return (
    <section className={LANDING_SECTION_MUTED_CLASS} aria-labelledby="listing-cta-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <div className={`${HOME_LISTING_CTA_PANEL_CLASS} grid items-center gap-8 md:grid-cols-2`}>
          <div>
            <h2
              id="listing-cta-heading"
              className="text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-navy/85 sm:text-lg">
              {description}
            </p>
          </div>
          <div className={HOME_LISTING_CTA_BUTTONS_WRAP_CLASS}>
            <EstatePillButtonLink
              href={primaryHref}
              className={`shrink-0 ${HOME_LISTING_CTA_PILL_BUTTON_CLASS} ${HOME_LISTING_CTA_MOBILE_PILL_CLASS}`}
            >
              {primaryLabel}
            </EstatePillButtonLink>
            <EstatePillButtonLink
              href={secondaryHref}
              className={`shrink-0 ${HOME_LISTING_CTA_PILL_BUTTON_CLASS} ${HOME_LISTING_CTA_MOBILE_PILL_CLASS}`}
            >
              {secondaryLabel}
            </EstatePillButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
