import { PricingPackageSection } from "@/features/pricing/components/PricingPackageSection";
import { PRICING_ANALYTICS_COPY } from "@/features/pricing/content/pricingAnalyticsCopy";
import { PRICING_ANALYTICS_CTA_BUTTON_STYLE } from "@/shared/lib/constants";

export function PricingAnalyticsSubscriptions() {
  const { sectionTitle, priceSuffix, packages } = PRICING_ANALYTICS_COPY;

  return (
    <PricingPackageSection
      sectionId="analytics-subscriptions"
      sectionTitle={sectionTitle}
      priceSuffix={priceSuffix}
      packages={packages}
      ctaButtonStyle={PRICING_ANALYTICS_CTA_BUTTON_STYLE}
      pinCtaToBottom={false}
    />
  );
}
