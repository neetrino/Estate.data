import { HomeLandingHero } from "@/features/home/landing/components/HomeLandingHero";
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
      <Navbar />
      <div className={LANDING_PAGE_CLASS}>
        <main>
          <HomeLandingHero />
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
