import { PricingPackageSection } from "@/features/pricing/components/PricingPackageSection";
import type { PricingCategoryData } from "@/features/pricing/services/fetchPricingPage";

type PricingMediaPackagesProps = {
  category: PricingCategoryData;
};

export function PricingMediaPackages({ category }: PricingMediaPackagesProps) {
  const { sectionTitle, priceSuffix, packages } = category;

  return (
    <PricingPackageSection
      sectionId="media-packages"
      sectionTitle={sectionTitle}
      priceSuffix={priceSuffix}
      packages={packages}
      afterPageHeader
    />
  );
}
