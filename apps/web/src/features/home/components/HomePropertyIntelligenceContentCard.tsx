import type { HomePropertyIntelligenceTrustItem } from "@/features/home/content/propertyIntelligenceCopy";
import { HOME_PROPERTY_INTELLIGENCE_COPY } from "@/features/home/content/propertyIntelligenceCopy";
import {
  PropertyIntelligenceCheckIcon,
  PropertyIntelligenceScalableIcon,
  PropertyIntelligenceSecureIcon,
  PropertyIntelligenceTrustedIcon,
} from "@/features/home/components/HomePropertyIntelligenceIcons";
import { HOME_MOBILE_LEFT_PILL_CLASS } from "@/features/home/landing/lib/landingStyles";
import { HOME_PROPERTY_INTELLIGENCE_EXPLORE_CTA_CLASS } from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

function TrustIconForItem({ itemId }: { itemId: HomePropertyIntelligenceTrustItem["id"] }) {
  switch (itemId) {
    case "secure":
      return <PropertyIntelligenceSecureIcon className="home-pi-trust__icon" />;
    case "scalable":
      return <PropertyIntelligenceScalableIcon className="home-pi-trust__icon" />;
    case "trusted":
      return <PropertyIntelligenceTrustedIcon className="home-pi-trust__icon" />;
    default:
      return null;
  }
}

export function HomePropertyIntelligenceContentCard() {
  const { titleLine1, titleLine2, description, features, trustItems, ctaLabel, ctaHref } =
    HOME_PROPERTY_INTELLIGENCE_COPY;

  return (
    <div className="home-pi-content">
      <h2 id="property-intelligence-heading" className="home-pi-content__title">
        <span className="home-pi-content__title-line">{titleLine1}</span>
        <span className="home-pi-content__title-gradient">{titleLine2}</span>
      </h2>

      <p className="home-pi-content__description">{description}</p>

      <hr className="home-pi-content__divider" />

      <ul className="home-pi-content__features">
        {features.map((feature) => (
          <li key={feature.title} className="home-pi-content__feature">
            <span className="home-pi-content__feature-check" aria-hidden>
              <PropertyIntelligenceCheckIcon className="home-pi-content__feature-check-icon" />
            </span>
            <div className="home-pi-content__feature-copy">
              <p className="home-pi-content__feature-title">{feature.title}</p>
              <p className="home-pi-content__feature-desc">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="home-pi-content__footer">
        <EstatePillButtonLink
          href={ctaHref}
          className={`${HOME_PROPERTY_INTELLIGENCE_EXPLORE_CTA_CLASS} ${HOME_MOBILE_LEFT_PILL_CLASS}`}
        >
          {ctaLabel}
        </EstatePillButtonLink>

        <ul className="home-pi-trust" aria-label="Platform qualities">
          {trustItems.map((item) => (
            <li key={item.id} className="home-pi-trust__item">
              <TrustItemContent item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TrustItemContent({ item }: { item: HomePropertyIntelligenceTrustItem }) {
  return (
    <div className={`home-pi-trust__content home-pi-trust__content--${item.accent}`}>
      <TrustIconForItem itemId={item.id} />
      <span className="home-pi-trust__label">{item.label}</span>
    </div>
  );
}
