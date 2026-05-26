import { HeroSection } from "@/features/home/landing/components/hero/HeroSection";
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
import { Navbar } from "@/shared/components/navbar";

export function HomeLandingPage() {
  return (
    <>
      <Navbar overlay landingPill />
      <div className={LANDING_PAGE_CLASS}>
        <main>
          <HeroSection />
          <LazyHomeWhatWeDo />
          <LazyHomeHowItWorks />
          <LazyHomeRecentWork />
          <LazyHomeStatsStrip />
          <LazyHomePropertyIntelligence />
          <LazyHomeClientVoices />
          <LazyHomeListingCta />
        </main>
      </div>
    </>
  );
}
