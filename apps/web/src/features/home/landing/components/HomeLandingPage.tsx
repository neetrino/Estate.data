import { HeroSection } from "@/features/home/landing/components/hero/HeroSection";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import {
  LazyHomeClientVoices,
  LazyHomeHowItWorks,
  LazyHomeListingCta,
  LazyHomePropertyIntelligence,
  LazyHomeRecentWork,
  LazyHomeStatsStrip,
  LazyHomeWhatWeDo,
} from "@/features/home/landing/lib/lazyHomeSections";
import { LANDING_PAGE_CLASS } from "@/features/home/landing/lib/landingStyles";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";

type HomeLandingPageProps = {
  projects: readonly RecentWorkProject[];
};

export function HomeLandingPage({ projects }: HomeLandingPageProps) {
  return (
    <div className={LANDING_PAGE_CLASS}>
      <main className="relative isolate">
        <HeroSection />
        <LazyHomeWhatWeDo />
        <LazyHomeHowItWorks />
        <LazyHomeRecentWork projects={projects} />
        <LazyHomeStatsStrip />
        <LazyHomePropertyIntelligence />
        <LazyHomeClientVoices />
        <LazyHomeListingCta />
        <FooterPageBridge from="surface" />
      </main>
    </div>
  );
}
