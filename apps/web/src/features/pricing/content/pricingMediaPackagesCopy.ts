import type { PricingPackage } from "@/features/pricing/content/pricingPackageTypes";

export const PRICING_MEDIA_PACKAGES_COPY = {
  sectionTitle: "Media packages",
  priceSuffix: "/listing",
  packages: [
    {
      id: "essential",
      name: "Essential",
      price: "$549",
      features: [
        "25 HDR photos",
        "Basic floorplan",
        "48-hour delivery",
        "Listing website",
      ],
      bookLabel: "Book Essential",
      bookHref: "/contact",
    },
    {
      id: "signature",
      name: "Signature",
      price: "$1,249",
      highlighted: true,
      badgeLabel: "Most popular",
      features: [
        "40 HDR photos + twilight",
        "Drone aerials",
        "Cinematic 60s reel",
        "3D Matterport tour",
        "Listing website",
      ],
      bookLabel: "Book Signature",
      bookHref: "/contact",
    },
    {
      id: "cinematic-plus",
      name: "Cinematic+",
      price: "$2,499",
      features: [
        "Full photo set",
        "2-min cinematic film",
        "Drone + neighborhood B-roll",
        "3D tour + floorplan",
        "Comps & market brief",
      ],
      bookLabel: "Book Cinematic+",
      bookHref: "/contact",
    },
  ] as const satisfies readonly PricingPackage[],
} as const;
