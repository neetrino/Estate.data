import type { Metadata } from "next";
import { PricingPage } from "@/features/pricing";

export const metadata: Metadata = {
  title: "Pricing | ESTATEDATA",
  description:
    "Clear packages with no surprises. Media tiers ship in 48 hours — add analytics anytime.",
};

export default function PricingRoutePage() {
  return <PricingPage />;
}
