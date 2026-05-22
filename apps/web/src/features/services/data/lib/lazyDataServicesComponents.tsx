import { lazyNamed } from "@/shared/lib/lazy-component";
import { LandingSectionPlaceholder } from "@/shared/ui/landing-section-placeholder";

export const LazyScanToBimBuildingAnimation = lazyNamed(
  () => import("@/features/home/components/ScanToBimBuildingAnimation"),
  "ScanToBimBuildingAnimation",
  { loading: () => <LandingSectionPlaceholder variant="muted" /> },
);
