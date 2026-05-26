import Image from "next/image";
import { HOME_TRUSTED_PARTNERS_COPY } from "@/features/home/content/trustedPartnersCopy";
import type { TrustedPartner } from "@/features/home/content/trustedPartnersCopy";
import {
  TRUSTED_LOGOS_CARD_CLASS,
  TRUSTED_LOGOS_GRID_CLASS,
  TRUSTED_LOGOS_HEADER_CLASS,
  TRUSTED_LOGOS_HEADER_LINE_CLASS,
  TRUSTED_LOGOS_LABEL_CLASS,
  TRUSTED_LOGOS_SECTION_CLASS,
} from "@/features/home/landing/lib/trustedLogosStyles";

const TRUSTED_PARTNER_IMAGE_WIDTH_PX = 280;
const TRUSTED_PARTNER_IMAGE_HEIGHT_PX = 72;

export function TrustedLogos() {
  const { label, partners } = HOME_TRUSTED_PARTNERS_COPY;

  return (
    <section className={TRUSTED_LOGOS_SECTION_CLASS} aria-label="Trusted real estate partners">
      <div className={TRUSTED_LOGOS_HEADER_CLASS}>
        <TrustLogosHeaderAccent side="left" />
        <h2 className={TRUSTED_LOGOS_LABEL_CLASS}>{label}</h2>
        <TrustLogosHeaderAccent side="right" />
      </div>

      <ul className={TRUSTED_LOGOS_GRID_CLASS}>
        {partners.map((partner) => (
          <li key={partner.id} className="min-w-0">
            <TrustLogoCard partner={partner} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function TrustLogoCard({ partner }: { partner: TrustedPartner }) {
  return (
    <div className={TRUSTED_LOGOS_CARD_CLASS}>
      <Image
        src={partner.imageSrc}
        alt={partner.name}
        width={TRUSTED_PARTNER_IMAGE_WIDTH_PX}
        height={TRUSTED_PARTNER_IMAGE_HEIGHT_PX}
        className="max-h-10 w-full object-contain object-center grayscale sm:max-h-11"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
      />
    </div>
  );
}

function TrustLogosHeaderAccent({ side }: { side: "left" | "right" }) {
  const line = <span className={TRUSTED_LOGOS_HEADER_LINE_CLASS} aria-hidden />;
  const sparkle = <TrustLogosSparkleIcon />;

  return (
    <span className="flex items-center gap-2 sm:gap-2.5" aria-hidden>
      {side === "left" ? (
        <>
          {line}
          {sparkle}
        </>
      ) : (
        <>
          {sparkle}
          {line}
        </>
      )}
    </span>
  );
}

function TrustLogosSparkleIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-2.5 shrink-0 text-[#8B5CF6] sm:size-3" aria-hidden>
      <path d="M6 0 7.4 4.6 12 6 7.4 7.4 6 12 4.6 7.4 0 6 4.6 4.6Z" fill="currentColor" />
    </svg>
  );
}
