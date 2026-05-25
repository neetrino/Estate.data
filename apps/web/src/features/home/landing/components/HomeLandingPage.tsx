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
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import { Navbar } from "@/shared/components/navbar";

type HomeLandingPageProps = {
  projects: readonly RecentWorkProject[];
};

export function HomeLandingPage({ projects }: HomeLandingPageProps) {
  return (
    <>
      <Navbar />
      <div className={LANDING_PAGE_CLASS}>
        <main>
          <HomeLandingHero />
          <LazyHomeWhatWeDo />
          <LazyHomeHowItWorks />
          <LazyHomeRecentWork projects={projects} />
          <LazyHomeStatsStrip />
          <LazyHomePropertyIntelligence />
          <LazyHomeClientVoices />
          <LazyHomeListingCta />
        </main>
      </div>
    </>
  );
}
