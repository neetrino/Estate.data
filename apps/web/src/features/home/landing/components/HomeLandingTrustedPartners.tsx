import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import {
  LANDING_TRUST_PARTNER_CARD_CLASS,
  LANDING_TRUST_PARTNERS_GRID_CLASS,
  LANDING_TRUST_PARTNERS_LABEL_CLASS,
} from "@/features/home/landing/lib/landingStyles";

export function HomeLandingTrustedPartners() {
  const { label, partners } = HOME_TRUSTED_PARTNERS_COPY;

  return (
    <div>
      <p className={LANDING_TRUST_PARTNERS_LABEL_CLASS}>{label}</p>
      <ul className={LANDING_TRUST_PARTNERS_GRID_CLASS}>
        {partners.map((name) => (
          <li key={name}>
            <div className={LANDING_TRUST_PARTNER_CARD_CLASS}>{name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
