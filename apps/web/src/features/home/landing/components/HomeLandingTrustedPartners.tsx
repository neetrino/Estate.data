import Image from "next/image";
import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import {
  LANDING_TRUST_STRIP_BLUE_HOVER_TAIL_COUNT,
  LANDING_TRUST_STRIP_CARD_HIT_CLASS,
  LANDING_TRUST_STRIP_HEADER_CLASS,
  landingTrustStripCardSurfaceClass,
  LANDING_TRUST_STRIP_HEADER_LINE_CLASS,
  LANDING_TRUST_STRIP_GRID_CLASS,
  LANDING_TRUST_STRIP_LABEL_CLASS,
  LANDING_TRUST_STRIP_PANEL_CLASS,
  LANDING_TRUST_STRIP_PANEL_INNER_CLASS,
} from "@/features/home/landing/lib/landingStyles";

/** Display width for trusted partner logo cards (px). */
const TRUSTED_PARTNER_IMAGE_WIDTH_PX = 280;

/** Display height for trusted partner logo cards (px). */
const TRUSTED_PARTNER_IMAGE_HEIGHT_PX = 72;

export function HomeLandingTrustedPartners() {
  const { label, partners } = HOME_TRUSTED_PARTNERS_COPY;
  const blueHoverFromIndex = partners.length - LANDING_TRUST_STRIP_BLUE_HOVER_TAIL_COUNT;

  return (
    <section aria-label="Trusted real estate partners">
      <div className={LANDING_TRUST_STRIP_PANEL_CLASS}>
        <div className={LANDING_TRUST_STRIP_PANEL_INNER_CLASS}>
          <div className={LANDING_TRUST_STRIP_HEADER_CLASS}>
            <TrustStripHeaderAccent side="left" />
            <h2 className={LANDING_TRUST_STRIP_LABEL_CLASS}>{label}</h2>
            <TrustStripHeaderAccent side="right" />
          </div>
          <ul className={LANDING_TRUST_STRIP_GRID_CLASS}>
            {partners.map((partner, index) => {
              const blueHover = index >= blueHoverFromIndex;

              return (
              <li key={partner.id} className="min-w-0">
                <div className={LANDING_TRUST_STRIP_CARD_HIT_CLASS}>
                  <div className={landingTrustStripCardSurfaceClass(blueHover)}>
                    <Image
                      src={partner.imageSrc}
                      alt={partner.name}
                      width={TRUSTED_PARTNER_IMAGE_WIDTH_PX}
                      height={TRUSTED_PARTNER_IMAGE_HEIGHT_PX}
                      className="h-auto w-full object-contain"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
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

function TrustStripHeaderAccent({ side }: { side: "left" | "right" }) {
  const line = <span className={LANDING_TRUST_STRIP_HEADER_LINE_CLASS} />;
  const star = <TrustStripStarIcon />;

  return (
    <span className="flex items-center gap-2 sm:gap-2.5" aria-hidden>
      {side === "left" ? (
        <>
          {line}
          {star}
        </>
      ) : (
        <>
          {star}
          {line}
        </>
      )}
    </span>
  );
}

function TrustStripStarIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-brand-navy/50 sm:size-3" aria-hidden>
      <path
        d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6 4.6 4.6Z"
        fill="currentColor"
      />
    </svg>
  );
}
