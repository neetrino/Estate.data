import { clientEnv } from "@/config/env";
import { apiClient, API_ROUTES } from "@/shared/api";
import type { PricingPackage } from "@/features/pricing/content/pricingPackageTypes";
import { PRICING_ANALYTICS_COPY } from "@/features/pricing/content/pricingAnalyticsCopy";
import { PRICING_MEDIA_PACKAGES_COPY } from "@/features/pricing/content/pricingMediaPackagesCopy";

export type PricingCategoryData = {
  sectionTitle: string;
  priceSuffix: string;
  packages: readonly PricingPackage[];
};

export type PricingPageData = {
  media: PricingCategoryData;
  analytics: PricingCategoryData;
};

function mockPricingPage(): PricingPageData {
  return {
    media: {
      sectionTitle: PRICING_MEDIA_PACKAGES_COPY.sectionTitle,
      priceSuffix: PRICING_MEDIA_PACKAGES_COPY.priceSuffix,
      packages: PRICING_MEDIA_PACKAGES_COPY.packages.map((pkg) => ({ ...pkg })),
    },
    analytics: {
      sectionTitle: PRICING_ANALYTICS_COPY.sectionTitle,
      priceSuffix: PRICING_ANALYTICS_COPY.priceSuffix,
      packages: PRICING_ANALYTICS_COPY.packages.map((pkg) => ({ ...pkg })),
    },
  };
}

/** Pricing page tiers — static mock or `GET /api/v1/pricing`. */
export async function fetchPricingPage(): Promise<PricingPageData> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return mockPricingPage();
  }

  return apiClient.get<PricingPageData>(API_ROUTES.pricing);
}
