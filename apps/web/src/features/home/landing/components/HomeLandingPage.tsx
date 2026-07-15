import { HeroSection } from "@/features/home/landing/components/hero/HeroSection";
import { HomeMediaShowcase } from "@/features/home/components/HomeMediaShowcase";
import { HomeClientVoicesCtaShell } from "@/features/home/landing/components/HomeClientVoicesCtaShell";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import type { HomeHeroContentFields } from "@/features/home/content/heroCopy";
import {
  LazyHomeClientVoices,
  LazyHomeHowItWorks,
  LazyHomeListingCta,
  LazyHomeRecentWork,
  LazyHomeStatsStrip,
  LazyHomeWhatWeDo,
} from "@/features/home/landing/lib/lazyHomeSections";
import { LANDING_PAGE_CLASS } from "@/features/home/landing/lib/landingStyles";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";

type HomeLandingPageProps = {
  projects: readonly RecentWorkProject[];
  hero: HomeHeroContentFields;
};

export function HomeLandingPage({ projects, hero }: HomeLandingPageProps) {
  return (
    <div className={LANDING_PAGE_CLASS}>
      <main className="relative isolate overflow-x-clip">
        <HeroSection hero={hero} />
        <LazyHomeWhatWeDo />
        <LazyHomeHowItWorks />
        <LazyHomeRecentWork projects={projects} />
        <HomeMediaShowcase />
        <LazyHomeStatsStrip />
        <HomeClientVoicesCtaShell
          clientVoices={<LazyHomeClientVoices />}
          listingCta={<LazyHomeListingCta />}
        />
        <FooterPageBridge from="surface" />
      </main>
    </div>
  );
}
