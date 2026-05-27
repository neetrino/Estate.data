import { PRICING_PATH } from "@/shared/lib/routes";

export const HOME_LISTING_CTA_COPY = {
  title: "Ready to elevate your next listing?",
  titleLines: ["Ready to elevate", "your next listing?"] as const,
  description:
    "Get a tailored quote in under 24 hours — media, data, or both.",
  descriptionLines: [
    "Get a tailored quote in under 24 hours —",
    "media, data, or both.",
  ] as const,
  primaryLabel: "Book a Shoot",
  primaryHref: "/contact",
  secondaryLabel: "View Pricing",
  secondaryHref: PRICING_PATH,
} as const;
