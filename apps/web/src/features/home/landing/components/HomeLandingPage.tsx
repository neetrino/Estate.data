import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
import type { HomeHeroContentFields } from "@/features/home/content/heroCopy";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import type { PricingCategoryDto } from "@/server/features/pricing/pricing.schema";
import type { FaqItemDto } from "@/server/features/faq/faq.schema";
import { StudioHeroSection, type StudioHeroSlide } from "@/features/home/sections/StudioHeroSection";
import { StudioServiceBlock } from "@/features/home/sections/StudioServiceBlock";
import { StudioWhatWeDo } from "@/features/home/sections/StudioWhatWeDo";
import {
  StudioStats,
  StudioWebPagesTeaser,
  StudioOfferings,
} from "@/features/home/sections/StudioIntroSections";
import { StudioPackages } from "@/features/home/sections/StudioPackages";
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
import { STUDIO_PAGE_CLASS } from "@/features/home/sections/studioSectionStyles";

type HomeLandingPageProps = {
  readonly projects: readonly RecentWorkProject[];
  readonly hero: HomeHeroContentFields;
  readonly slides: readonly StudioHeroSlide[];
  readonly services: readonly StudioServiceContent[];
  readonly packages: PricingCategoryDto;
  readonly faq: readonly FaqItemDto[];
  readonly contactFields: readonly ContactFieldSetting[];
};

export function HomeLandingPage({
  projects,
  hero,
  slides,
  services,
  packages,
  faq,
  contactFields,
}: HomeLandingPageProps) {
  return (
    <div className={STUDIO_PAGE_CLASS}>
      <main className="relative isolate overflow-x-clip">
        <StudioHeroSection hero={hero} slides={slides} />
        <StudioWhatWeDo />
        <StudioStats />
        <StudioOfferings />
        {services.map((service, index) => (
          <StudioServiceBlock
            key={service.sectionKey}
            service={service}
            imageOnRight={index % 2 === 1}
          />
        ))}
        <StudioWebPagesTeaser />
        <StudioPackages category={packages} />
        <StudioPortfolio projects={projects} />
        <StudioBeforeAfter />
        <StudioProcess />
        <StudioWhyUs />
        <StudioTeam />
        <StudioServiceArea />
        <StudioFaq items={faq} />
        <StudioContactSection fields={contactFields} />
      </main>
    </div>
  );
}
