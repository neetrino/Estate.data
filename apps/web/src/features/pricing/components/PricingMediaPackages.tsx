import { PricingPackageSection } from "@/features/pricing/components/PricingPackageSection";
import { PRICING_MEDIA_PACKAGES_COPY } from "@/features/pricing/content/pricingMediaPackagesCopy";

export function PricingMediaPackages() {
  const { sectionTitle, priceSuffix, packages } = PRICING_MEDIA_PACKAGES_COPY;

  return (
    <PricingPackageSection
      sectionId="media-packages"
      sectionTitle={sectionTitle}
      priceSuffix={priceSuffix}
      packages={packages}
    />
  );
}
