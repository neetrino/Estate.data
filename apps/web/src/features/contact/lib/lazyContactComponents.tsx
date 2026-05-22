import { lazyNamed } from "@/shared/lib/lazy-component";
import { LandingSectionPlaceholder } from "@/shared/ui/landing-section-placeholder";

const formLoading = () => (
  <LandingSectionPlaceholder variant="white" />
);

export const LazyContactRequestForm = lazyNamed(
  () => import("@/features/contact/components/ContactRequestForm"),
  "ContactRequestForm",
  { loading: formLoading },
);

export const LazyContactStudioMap = lazyNamed(
  () => import("@/features/contact/components/ContactStudioMap"),
  "ContactStudioMap",
  { loading: formLoading, ssr: false },
);
