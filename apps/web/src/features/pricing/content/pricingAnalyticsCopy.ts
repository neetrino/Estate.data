import type { PricingPackage } from "@/features/pricing/content/pricingPackageTypes";

export const PRICING_ANALYTICS_COPY = {
  sectionTitle: "Analytics subscriptions",
  priceSuffix: "/mo",
  packages: [
    {
      id: "insights",
      name: "Insights",
      price: "$199",
      features: ["Neighborhood reports", "Listing analytics", "Email digest"],
      bookLabel: "Talk to sales",
      bookHref: "/contact",
    },
    {
      id: "pro-data",
      name: "Pro Data",
      price: "$499",
      features: ["MLS/IDX integration", "Custom dashboard", "CRM sync"],
      bookLabel: "Talk to sales",
      bookHref: "/contact",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Custom",
      priceSuffix: "",
      features: ["BIM workflows", "API access", "Dedicated success mgr"],
      bookLabel: "Talk to sales",
      bookHref: "/contact",
    },
  ] as const satisfies readonly PricingPackage[],
} as const;
