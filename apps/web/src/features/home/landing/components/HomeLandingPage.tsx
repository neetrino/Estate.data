import { HomeClientVoices } from "@/features/home/components/HomeClientVoices";
import { HomeListingCta } from "@/features/home/components/HomeListingCta";
import { HomeLandingHero } from "@/features/home/landing/components/HomeLandingHero";
import { HomePropertyIntelligence } from "@/features/home/components/HomePropertyIntelligence";
import { HomeRecentWork } from "@/features/home/components/HomeRecentWork";
import { HomeStatsStrip } from "@/features/home/components/HomeStatsStrip";
import { HomeHowItWorks } from "@/features/home/components/HomeHowItWorks";
import { HomeWhatWeDo } from "@/features/home/components/HomeWhatWeDo";
import { LANDING_PAGE_CLASS } from "@/features/home/landing/lib/landingStyles";
import { Navbar } from "@/shared/components/navbar";

export function HomeLandingPage() {
  return (
    <>
      <Navbar />
      <div className={LANDING_PAGE_CLASS}>
        <main>
          <HomeLandingHero />
          <HomeWhatWeDo />
          <HomeHowItWorks />
          <HomeRecentWork />
          <HomeStatsStrip />
          <HomePropertyIntelligence />
          <HomeClientVoices />
          <HomeListingCta />
        </main>
      </div>
    </>
  );
}
