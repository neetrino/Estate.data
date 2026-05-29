import { WhatWeDoNeonCardDecor } from "@/features/home/components/WhatWeDoNeonCardDecor";
import type { PricingPackage } from "@/features/pricing/content/pricingPackageTypes";
import {
  PRICING_ANALYTICS_CTA_WRAP_CLASS,
  PRICING_CARD_PADDING_CLASS,
  PRICING_MEDIA_CTA_BUTTON_CLASS,
  PRICING_MEDIA_CTA_WRAP_CLASS,
  PRICING_PACKAGE_CARD_MIN_HEIGHT_PX,
  PRICING_ANALYTICS_CTA_BUTTON_CLASS,
  type PricingMediaCardAccent,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";
import "@/features/home/styles/what-we-do-neon-card.css";

const PRICING_PACKAGE_CARD_BASE_CLASS = "relative flex w-full overflow-hidden text-left";

const PRICING_PACKAGE_FEATURES_GROW_CLASS = "mt-5 flex flex-1 flex-col gap-2";

const PRICING_PACKAGE_FEATURES_COMPACT_CLASS = "mt-5 flex flex-col gap-2";

const PRICING_PACKAGE_HIGHLIGHTED_CLASS =
  "ring-2 ring-what-we-do-subtitle ring-offset-2 ring-offset-what-we-do-surface";

const PRICING_PACKAGE_BADGE_CLASS =
  "mb-4 w-fit rounded-full bg-what-we-do-subtitle px-3 py-1 text-xs font-semibold text-white";

const PRICING_PACKAGE_NAME_CLASS = "text-xl font-bold text-white";

const PRICING_PACKAGE_PRICE_CLASS = "text-3xl font-bold tracking-tight text-white sm:text-4xl";

const PRICING_PACKAGE_PRICE_SUFFIX_CLASS = "text-base font-medium text-what-we-do-card-description";

const PRICING_PACKAGE_FEATURE_CLASS =
  "flex items-start gap-2.5 text-base leading-relaxed text-what-we-do-card-description";

const PRICING_PACKAGE_CHECK_ICON_BY_ACCENT: Record<PricingMediaCardAccent, string> = {
  blue: "text-property-intelligence-accent",
  purple: "text-what-we-do-subtitle",
  orange: "text-brand-orange",
};

const PRICING_PACKAGE_NEON_CARD_CLASS_BY_ACCENT: Record<PricingMediaCardAccent, string> = {
  blue: "what-we-do-neon-card what-we-do-neon-card--cyan",
  purple: "what-we-do-neon-card what-we-do-neon-card--purple",
  orange: "what-we-do-neon-card what-we-do-neon-card--sunset",
};

type PricingPackageCardProps = {
  package: PricingPackage;
  priceSuffix: string;
  ctaButtonClassName?: string;
  /** When true, flex-1 + min-height pin CTA to card bottom (media grid). */
  pinCtaToBottom?: boolean;
};

export function PricingPackageCard({
  package: pkg,
  priceSuffix,
  ctaButtonClassName,
  pinCtaToBottom = true,
}: PricingPackageCardProps) {
  const highlighted = pkg.highlighted === true;
  const resolvedPriceSuffix = pkg.priceSuffix ?? priceSuffix;
  const cardClassName = pinCtaToBottom
    ? `${PRICING_PACKAGE_CARD_BASE_CLASS} h-full`
    : PRICING_PACKAGE_CARD_BASE_CLASS;
  const featuresClassName = pinCtaToBottom
    ? PRICING_PACKAGE_FEATURES_GROW_CLASS
    : PRICING_PACKAGE_FEATURES_COMPACT_CLASS;
  const ctaWrapClassName = pinCtaToBottom
    ? PRICING_MEDIA_CTA_WRAP_CLASS
    : PRICING_ANALYTICS_CTA_WRAP_CLASS;
  const defaultCtaClassName = pinCtaToBottom
    ? PRICING_MEDIA_CTA_BUTTON_CLASS
    : PRICING_ANALYTICS_CTA_BUTTON_CLASS;
  const resolvedCtaClassName = [ctaButtonClassName ?? defaultCtaClassName, pkg.bookCtaExtraClassName]
    .filter(Boolean)
    .join(" ");
  const cardAccent = pkg.cardAccent ?? "purple";
  const neonCardClassName = PRICING_PACKAGE_NEON_CARD_CLASS_BY_ACCENT[cardAccent];
  const checkIconClassName = pkg.cardAccent
    ? PRICING_PACKAGE_CHECK_ICON_BY_ACCENT[pkg.cardAccent]
    : PRICING_PACKAGE_CHECK_ICON_BY_ACCENT.purple;

  return (
    <article
      className={`${neonCardClassName} ${cardClassName}${highlighted ? ` ${PRICING_PACKAGE_HIGHLIGHTED_CLASS}` : ""}`}
      style={{
        ...(pinCtaToBottom ? { minHeight: PRICING_PACKAGE_CARD_MIN_HEIGHT_PX } : {}),
      }}
    >
      <div className="what-we-do-neon-card__surface flex flex-1">
        <WhatWeDoNeonCardDecor showPlanet={false} />
        <div className={`relative z-[1] flex min-h-full flex-1 flex-col ${PRICING_CARD_PADDING_CLASS}`}>
          {pkg.badgeLabel ? <span className={PRICING_PACKAGE_BADGE_CLASS}>{pkg.badgeLabel}</span> : null}
          <h3 className={PRICING_PACKAGE_NAME_CLASS}>{pkg.name}</h3>
          <p className="mt-4">
            <span className={PRICING_PACKAGE_PRICE_CLASS}>{pkg.price}</span>
            {resolvedPriceSuffix ? (
              <span className={PRICING_PACKAGE_PRICE_SUFFIX_CLASS}> {resolvedPriceSuffix}</span>
            ) : null}
          </p>
          <ul className={featuresClassName}>
            {pkg.features.map((feature) => (
              <li key={feature} className={PRICING_PACKAGE_FEATURE_CLASS}>
                <PricingFeatureCheckIcon className={checkIconClassName} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <div className={ctaWrapClassName}>
            <EstatePillButtonLink
              href={pkg.bookHref}
              fullWidth
              className={resolvedCtaClassName}
              accent={pkg.cardAccent ?? "purple"}
            >
              {pkg.bookLabel}
            </EstatePillButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}

function PricingFeatureCheckIcon({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`mt-0.5 size-4 shrink-0 ${className}`}
      aria-hidden
    >
      <path
        d="M3 8.5 6.5 12 13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
