import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
import type { HomeHeroContentFields } from "@/features/home/content/heroCopy";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import type { PricingCategoryDto } from "@/server/features/pricing/pricing.schema";
import type { FaqItemDto } from "@/server/features/faq/faq.schema";
import type { MarketingCopyBundle } from "@/server/features/site-copy/site-copy.schema";
import { StudioHeroSection, type StudioHeroSlide } from "@/features/home/sections/StudioHeroSection";
import {
  StudioServicesSection,
  STUDIO_CORE_SERVICE_KEYS,
} from "@/features/home/sections/StudioServicesSection";
import { StudioAiMediaSection } from "@/features/home/sections/StudioAiMediaSection";
import { StudioDroneSection } from "@/features/home/sections/StudioDroneSection";
import { StudioMatterportSection } from "@/features/home/sections/StudioMatterportSection";
import { StudioFloorPlansSection } from "@/features/home/sections/StudioFloorPlansSection";
import { StudioScanToBimSection } from "@/features/home/sections/StudioScanToBimSection";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { StudioWhatWeDo } from "@/features/home/sections/StudioWhatWeDo";
import {
  StudioWebPagesTeaser,
  StudioOfferings,
} from "@/features/home/sections/StudioIntroSections";
import { StudioPackages } from "@/features/home/sections/StudioPackages";
import { StudioPackageCompare } from "@/features/home/sections/StudioPackageCompare";
import { StudioPortfolio } from "@/features/home/sections/StudioPortfolio";
import { StudioBeforeAfter } from "@/features/home/sections/StudioBeforeAfter";
import {
  StudioProcess,
  StudioServiceArea,
  StudioTeam,
  StudioWhyUs,
} from "@/features/home/sections/StudioStorySections";
import { StudioFaq } from "@/features/home/sections/StudioFaq";
import { StudioContactSection } from "@/features/home/sections/StudioContactSection";
import { StudioSectionViewTracker } from "@/features/home/sections/StudioSectionViewTracker";
import { STUDIO_PAGE_CLASS } from "@/features/home/sections/studioSectionStyles";

type HomeLandingPageProps = {
  readonly projects: readonly RecentWorkProject[];
  readonly hero: HomeHeroContentFields;
  readonly slides: readonly StudioHeroSlide[];
  readonly services: readonly StudioServiceContent[];
  readonly packages: PricingCategoryDto;
  readonly faq: readonly FaqItemDto[];
  readonly contactFields: readonly ContactFieldSetting[];
  readonly marketingCopy: MarketingCopyBundle;
};

export function HomeLandingPage({
  projects,
  hero,
  slides,
  services,
  packages,
  faq,
  contactFields,
  marketingCopy,
}: HomeLandingPageProps) {
  const coreServices = services.filter((service) =>
    STUDIO_CORE_SERVICE_KEYS.includes(service.sectionKey),
  );
  const findService = (sectionKey: string) =>
    services.find((service) => service.sectionKey === sectionKey);

  const aiMedia = findService(HOME_SECTION_IDS.aiMedia);
  const drone = findService(HOME_SECTION_IDS.drone);
  const matterport = findService(HOME_SECTION_IDS.tours);
  const scanToBim = findService(HOME_SECTION_IDS.scanToBim);

  return (
    <div className={STUDIO_PAGE_CLASS}>
      <main className="relative isolate overflow-x-clip">
        <StudioHeroSection hero={hero} slides={slides} />
        <StudioWhatWeDo copy={marketingCopy.whatWeDo} stats={marketingCopy.stats} />
        <StudioOfferings copy={marketingCopy.offerings} />
        <StudioServicesSection services={coreServices} />
        {aiMedia ? <StudioAiMediaSection service={aiMedia} /> : null}
        {drone ? <StudioDroneSection service={drone} /> : null}
        {matterport ? <StudioMatterportSection service={matterport} /> : null}
        {matterport ? (
          <StudioFloorPlansSection service={matterport} copy={marketingCopy.floorPlans} />
        ) : null}
        {scanToBim ? <StudioScanToBimSection service={scanToBim} /> : null}
        <StudioWebPagesTeaser copy={marketingCopy.webPages} />
        <StudioPackages category={packages} copy={marketingCopy.packagesIntro} />
        <StudioPackageCompare />
        <StudioPortfolio projects={projects} copy={marketingCopy.portfolioIntro} />
        <StudioBeforeAfter copy={marketingCopy.beforeAfter} />
        <StudioProcess copy={marketingCopy.process} />
        <StudioWhyUs copy={marketingCopy.whyUs} />
        <StudioTeam copy={marketingCopy.studio} />
        <StudioServiceArea copy={marketingCopy.serviceArea} />
        <StudioFaq items={faq} copy={marketingCopy.faqIntro} />
        <StudioContactSection fields={contactFields} copy={marketingCopy.contact} />
        <StudioSectionViewTracker />
      </main>
    </div>
  );
}
