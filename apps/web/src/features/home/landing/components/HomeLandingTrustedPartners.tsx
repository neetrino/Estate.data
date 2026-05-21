import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import {
  LANDING_TRUST_STRIP_BLUE_HOVER_TAIL_COUNT,
  LANDING_TRUST_STRIP_GRID_CLASS,
  LANDING_TRUST_STRIP_LABEL_CLASS,
  LANDING_TRUST_STRIP_CELL_HIT_CLASS,
  LANDING_TRUST_STRIP_PANEL_CLASS,
  LANDING_TRUST_STRIP_PANEL_INNER_CLASS,
  landingTrustStripCellSurfaceClass,
  landingTrustStripNameClass,
} from "@/features/home/landing/lib/landingStyles";

export function HomeLandingTrustedPartners() {
  const { label, partners } = HOME_TRUSTED_PARTNERS_COPY;
  const blueHoverFromIndex = partners.length - LANDING_TRUST_STRIP_BLUE_HOVER_TAIL_COUNT;

  return (
    <section aria-label="Trusted real estate partners">
      <div className={LANDING_TRUST_STRIP_PANEL_CLASS}>
        <div className="home-landing-hero-bg pointer-events-none absolute inset-0 opacity-80" aria-hidden />
        <div className={LANDING_TRUST_STRIP_PANEL_INNER_CLASS}>
          <p className={LANDING_TRUST_STRIP_LABEL_CLASS}>{label}</p>
          <ul className={LANDING_TRUST_STRIP_GRID_CLASS}>
            {partners.map((name, index) => {
              const blueHover = index >= blueHoverFromIndex;

              return (
                <li key={name} className="min-w-0">
                  <div className={LANDING_TRUST_STRIP_CELL_HIT_CLASS}>
                    <div className={landingTrustStripCellSurfaceClass(blueHover)}>
                      <span className={landingTrustStripNameClass(blueHover)}>{name}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
