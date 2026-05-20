import type { CSSProperties } from "react";
import { PricingPackageCard } from "@/features/pricing/components/PricingPackageCard";
import type { PricingPackage } from "@/features/pricing/content/pricingPackageTypes";
import { WHAT_WE_DO_CARD_GRID_GAP_CLASS } from "@/shared/lib/constants";

const PRICING_SECTION_TITLE_CLASS =
  "text-2xl font-bold tracking-tight text-what-we-do-title sm:text-3xl";

type PricingPackageSectionProps = {
  sectionId: string;
  sectionTitle: string;
  priceSuffix: string;
  packages: readonly PricingPackage[];
  ctaButtonClassName?: string;
  ctaButtonStyle?: CSSProperties;
  pinCtaToBottom?: boolean;
};

export function PricingPackageSection({
  sectionId,
  sectionTitle,
  priceSuffix,
  packages,
  ctaButtonClassName,
  ctaButtonStyle,
  pinCtaToBottom = true,
}: PricingPackageSectionProps) {
  const headingId = `${sectionId}-heading`;
  const gridAlignClass = pinCtaToBottom ? "items-stretch" : "items-start";

  return (
    <section className="mt-14 sm:mt-16 lg:mt-20" aria-labelledby={headingId}>
      <h2 id={headingId} className={PRICING_SECTION_TITLE_CLASS}>
        {sectionTitle}
      </h2>
      <ul
        className={`mt-8 grid grid-cols-1 md:grid-cols-3 ${gridAlignClass} ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`}
      >
        {packages.map((pkg) => (
          <li key={pkg.id} className="min-w-0">
            <PricingPackageCard
              package={pkg}
              priceSuffix={priceSuffix}
              ctaButtonClassName={ctaButtonClassName}
              ctaButtonStyle={ctaButtonStyle}
              pinCtaToBottom={pinCtaToBottom}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
