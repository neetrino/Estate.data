import { lazyNamed } from "@/shared/lib/lazy-component";
import { LandingSectionPlaceholder } from "@/shared/ui/landing-section-placeholder";

const sectionLoading = () => <LandingSectionPlaceholder />;
const mutedSectionLoading = () => <LandingSectionPlaceholder variant="muted" />;

export const LazyHomeWhatWeDo = lazyNamed(
  () => import("@/features/home/components/HomeWhatWeDo"),
  "HomeWhatWeDo",
  { loading: sectionLoading },
);

export const LazyHomeHowItWorks = lazyNamed(
  () => import("@/features/home/components/HomeHowItWorks"),
  "HomeHowItWorks",
  { loading: sectionLoading },
);

export const LazyHomeRecentWork = lazyNamed(
  () => import("@/features/home/components/HomeRecentWork"),
  "HomeRecentWork",
  { loading: sectionLoading },
);

export const LazyHomeStatsStrip = lazyNamed(
  () => import("@/features/home/components/HomeStatsStrip"),
  "HomeStatsStrip",
  { loading: sectionLoading },
);

export const LazyHomePropertyIntelligence = lazyNamed(
  () => import("@/features/home/components/HomePropertyIntelligence"),
  "HomePropertyIntelligence",
  { loading: mutedSectionLoading },
);

export const LazyHomeClientVoices = lazyNamed(
  () => import("@/features/home/components/HomeClientVoices"),
  "HomeClientVoices",
  { loading: sectionLoading },
);

export const LazyHomeListingCta = lazyNamed(
  () => import("@/features/home/components/HomeListingCta"),
  "HomeListingCta",
  { loading: mutedSectionLoading },
);
