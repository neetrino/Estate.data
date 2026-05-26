import { PricingPackageSection } from "@/features/pricing/components/PricingPackageSection";
import type { PricingCategoryData } from "@/features/pricing/services/fetchPricingPage";

type PricingAnalyticsSubscriptionsProps = {
  category: PricingCategoryData;
};

export function PricingAnalyticsSubscriptions({
  category,
}: PricingAnalyticsSubscriptionsProps) {
  const { sectionTitle, priceSuffix, packages } = category;

  return (
    <PricingPackageSection
      sectionId="analytics-subscriptions"
      sectionTitle={sectionTitle}
      priceSuffix={priceSuffix}
      packages={packages}
      pinCtaToBottom={false}
    />
  );
}
