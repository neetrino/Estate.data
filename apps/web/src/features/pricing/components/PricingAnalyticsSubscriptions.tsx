import { PricingPackageSection } from "@/features/pricing/components/PricingPackageSection";
import { PRICING_ANALYTICS_COPY } from "@/features/pricing/content/pricingAnalyticsCopy";
export function PricingAnalyticsSubscriptions() {
  const { sectionTitle, priceSuffix, packages } = PRICING_ANALYTICS_COPY;

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
