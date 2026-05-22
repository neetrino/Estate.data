import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_EYEBROW_CLASS,
  LANDING_TRUST_PARTNER_CHIP_CLASS,
} from "@/features/home/landing/lib/landingStyles";

export function HomeTrustedStrip() {
  const { label, partners } = HOME_TRUSTED_PARTNERS_COPY;

  return (
    <section
      className="border-y border-brand-navy/6 bg-landing-surface py-6 sm:py-8"
      aria-label="Trusted real estate partners"
    >
      <div className={`${LANDING_CONTAINER_CLASS} text-center`}>
        <p className={LANDING_EYEBROW_CLASS}>{label}</p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {partners.map((partner) => (
            <li key={partner.id}>
              <span className={LANDING_TRUST_PARTNER_CHIP_CLASS}>{partner.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
