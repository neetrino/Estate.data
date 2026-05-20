import type { CSSProperties } from "react";
import type { PricingPackage } from "@/features/pricing/content/pricingPackageTypes";
import {
  PRICING_ANALYTICS_CTA_BUTTON_STYLE,
  PRICING_MEDIA_CTA_BUTTON_STYLE,
  PRICING_PACKAGE_CARD_MIN_HEIGHT_PX,
  PRICING_PACKAGE_CTA_BUTTON_CLASS,
  WHAT_WE_DO_CARD_SURFACE_STYLE,
} from "@/shared/lib/constants";
import { EstatePillButtonLink } from "@/shared/ui/button";

const PRICING_PACKAGE_CARD_BASE_CLASS =
  "relative flex w-full flex-col overflow-hidden px-8 py-7 text-left";

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

type PricingPackageCardProps = {
  package: PricingPackage;
  priceSuffix: string;
  ctaButtonClassName?: string;
  ctaButtonStyle?: CSSProperties;
  /** When true, flex-1 + min-height pin CTA to card bottom (media grid). */
  pinCtaToBottom?: boolean;
};

export function PricingPackageCard({
  package: pkg,
  priceSuffix,
  ctaButtonClassName = PRICING_PACKAGE_CTA_BUTTON_CLASS,
  ctaButtonStyle,
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
  const resolvedCtaStyle =
    ctaButtonStyle ?? (pinCtaToBottom ? PRICING_MEDIA_CTA_BUTTON_STYLE : PRICING_ANALYTICS_CTA_BUTTON_STYLE);

  return (
    <article
      className={`${cardClassName}${highlighted ? ` ${PRICING_PACKAGE_HIGHLIGHTED_CLASS}` : ""}`}
      style={{
        ...(pinCtaToBottom ? { minHeight: PRICING_PACKAGE_CARD_MIN_HEIGHT_PX } : {}),
        ...WHAT_WE_DO_CARD_SURFACE_STYLE,
      }}
    >
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
            <PricingFeatureCheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <EstatePillButtonLink
        href={pkg.bookHref}
        className={ctaButtonClassName}
        style={resolvedCtaStyle}
      >
        {pkg.bookLabel}
      </EstatePillButtonLink>
    </article>
  );
}

function PricingFeatureCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 size-4 shrink-0 text-what-we-do-subtitle"
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
