import Image from "next/image";

import { HOME_LISTING_CTA_COPY } from "@/features/home/content/homeListingCtaCopy";
import { LISTING_CTA_CITY_ILLUSTRATION_SRC } from "@/features/home/landing/lib/listingCtaBannerAssets";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_CLASS,
  LANDING_SECTION_ENTER_FROM_WHITE_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import {
  HOME_LISTING_CTA_BUTTONS_WRAP_CLASS,
  HOME_LISTING_CTA_PANEL_CLASS,
  HOME_LISTING_CTA_PILL_BUTTON_CLASS,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

import "@/features/home/styles/home-listing-cta-banner.css";

export function HomeListingCta() {
  const {
    titleLines,
    descriptionLines,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
  } = HOME_LISTING_CTA_COPY;

  return (
    <section
      className={`home-listing-cta-section ${LANDING_SECTION_CLASS} ${LANDING_SECTION_ENTER_FROM_WHITE_CLASS}`}
      aria-labelledby="listing-cta-heading"
    >
      <div className={`${LANDING_CONTAINER_CLASS} home-listing-cta-section__inner`}>
        <div className={HOME_LISTING_CTA_PANEL_CLASS}>
          <div className="home-listing-cta-panel__content">
            <div className="home-listing-cta-panel__illustration" aria-hidden>
              <Image
                src={LISTING_CTA_CITY_ILLUSTRATION_SRC}
                alt=""
                width={200}
                height={200}
                className="home-listing-cta-panel__illustration-image"
                decoding="async"
              />
            </div>

            <div className="home-listing-cta-panel__copy">
              <h2 id="listing-cta-heading" className="home-listing-cta-panel__title">
                {titleLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </h2>
              <p className="home-listing-cta-panel__description">
                {descriptionLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <div className={`home-listing-cta-panel__actions ${HOME_LISTING_CTA_BUTTONS_WRAP_CLASS}`}>
              <EstatePillButtonLink
                href={primaryHref}
                className={`shrink-0 ${HOME_LISTING_CTA_PILL_BUTTON_CLASS} home-listing-cta-panel__button`}
              >
                {primaryLabel}
              </EstatePillButtonLink>
              <EstatePillButtonLink
                href={secondaryHref}
                className={`shrink-0 ${HOME_LISTING_CTA_PILL_BUTTON_CLASS} home-listing-cta-panel__button home-listing-cta-panel__button--secondary`}
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
