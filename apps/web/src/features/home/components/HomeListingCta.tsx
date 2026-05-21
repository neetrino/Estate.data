import { HOME_LISTING_CTA_COPY } from "@/features/home/content/homeListingCtaCopy";
import { LANDING_CONTAINER_CLASS, LANDING_SECTION_MUTED_CLASS } from "@/features/home/landing/lib/landingStyles";
import { HOME_LISTING_CTA_BOOK_BUTTON_CLASS } from "@/shared/lib/constants";
import {
  EstatePillButtonLink,
  LandingGradientOutlineButtonLink,
} from "@/shared/ui/button";

export function HomeListingCta() {
  const { title, description, primaryLabel, primaryHref, secondaryLabel, secondaryHref } =
    HOME_LISTING_CTA_COPY;

  return (
    <section className={LANDING_SECTION_MUTED_CLASS} aria-labelledby="listing-cta-heading">
      <div className={LANDING_CONTAINER_CLASS}>
        <div className="home-landing-cta-panel grid items-center gap-8 overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-12 md:grid-cols-2">
          <div>
            <h2
              id="listing-cta-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              {description}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <EstatePillButtonLink
              href={primaryHref}
              fullWidth
              className={`sm:shrink-0 ${HOME_LISTING_CTA_BOOK_BUTTON_CLASS}`}
            >
              {primaryLabel}
            </EstatePillButtonLink>
            <LandingGradientOutlineButtonLink href={secondaryHref} fullWidth className="sm:shrink-0">
              {secondaryLabel}
            </LandingGradientOutlineButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
