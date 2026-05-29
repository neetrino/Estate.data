import type {
  ResourceArticle,
  ResourceFaqItem,
} from "@/features/resources/content/resourcesContentCopy";
import { ResourcesArticlesSection } from "@/features/resources/components/ResourcesArticlesSection";
import { ResourcesFaqPanel } from "@/features/resources/components/ResourcesFaqPanel";

const RESOURCES_BODY_SECTION_CLASS =
  "relative mt-14 grid grid-cols-1 items-start gap-10 sm:mt-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 xl:gap-16 [&>section]:relative [&>section:first-child]:z-30 [&>section:last-child]:z-10";

type ResourcesBodySectionProps = {
  articles: readonly ResourceArticle[];
  faqItems: readonly ResourceFaqItem[];
};

export function ResourcesBodySection({
  articles,
  faqItems,
}: ResourcesBodySectionProps) {
  return (
    <section className={RESOURCES_BODY_SECTION_CLASS} aria-label="Resources content">
      <ResourcesArticlesSection articles={articles} />
      <ResourcesFaqPanel faqItems={faqItems} />
    </section>
  );
}
