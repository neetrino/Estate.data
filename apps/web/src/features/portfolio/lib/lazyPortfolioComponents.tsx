import { lazyNamed } from "@/shared/lib/lazy-component";
import { LandingSectionPlaceholder } from "@/shared/ui/landing-section-placeholder";

export const LazyPortfolioWorkSection = lazyNamed(
  () => import("@/features/portfolio/components/PortfolioWorkSection"),
  "PortfolioWorkSection",
  { loading: () => <LandingSectionPlaceholder /> },
);
