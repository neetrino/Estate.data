import { PricingPackageCard } from "@/features/pricing/components/PricingPackageCard";
import type { PricingPackage } from "@/features/pricing/content/pricingPackageTypes";
import {
  PRICING_PACKAGE_GRID_CLASS,
  PRICING_SECTION_AFTER_HEADER_CLASS,
  PRICING_SECTION_MARGIN_TOP_CLASS,
  WHAT_WE_DO_CARD_GRID_GAP_CLASS,
} from "@/shared/lib/constants";
import { ScrollRevealListItem } from "@/shared/components/reveal/ScrollRevealListItem";

const PRICING_SECTION_TITLE_CLASS =
  "text-2xl font-bold tracking-tight text-[#A855F7] sm:text-3xl";

type PricingPackageSectionProps = {
  sectionId: string;
  sectionTitle: string;
  priceSuffix: string;
  packages: readonly PricingPackage[];
  ctaButtonClassName?: string;
  pinCtaToBottom?: boolean;
  /** Tighter top gap when placed directly under the page title. */
  afterPageHeader?: boolean;
};

export function PricingPackageSection({
  sectionId,
  sectionTitle,
  priceSuffix,
  packages,
  ctaButtonClassName,
  pinCtaToBottom = true,
  afterPageHeader = false,
}: PricingPackageSectionProps) {
  const headingId = `${sectionId}-heading`;
  const gridAlignClass = pinCtaToBottom ? "items-stretch" : "items-start";
  const sectionTopClass = afterPageHeader
    ? PRICING_SECTION_AFTER_HEADER_CLASS
    : PRICING_SECTION_MARGIN_TOP_CLASS;
  const hasOddCardCount = packages.length % 2 !== 0;

  return (
    <section className={sectionTopClass} aria-labelledby={headingId}>
      <h2 id={headingId} className={PRICING_SECTION_TITLE_CLASS}>
        {sectionTitle}
      </h2>
      <ul
        className={`mt-8 ${PRICING_PACKAGE_GRID_CLASS} ${gridAlignClass} ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`}
      >
        {packages.map((pkg, index) => {
          const isLastOddCard = hasOddCardCount && index === packages.length - 1;
          const itemClassName = isLastOddCard
            ? "min-w-0 md:max-[1399px]:col-span-2 md:max-[1399px]:mx-auto md:max-[1399px]:w-full md:max-[1399px]:max-w-[32rem]"
            : "min-w-0";

          return (
            <ScrollRevealListItem key={pkg.id} index={index} className={itemClassName}>
            <PricingPackageCard
              package={pkg}
              priceSuffix={priceSuffix}
              ctaButtonClassName={ctaButtonClassName}
              pinCtaToBottom={pinCtaToBottom}
            />
            </ScrollRevealListItem>
          );
        })}
      </ul>
    </section>
  );
}
