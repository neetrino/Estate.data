import { ResourcesArticlesSection } from "@/features/resources/components/ResourcesArticlesSection";
import { ResourcesFaqPanel } from "@/features/resources/components/ResourcesFaqPanel";

const RESOURCES_BODY_SECTION_CLASS =
  "mt-14 grid grid-cols-1 items-start gap-10 sm:mt-16 lg:grid-cols-2 lg:gap-12 xl:gap-16";

export function ResourcesBodySection() {
  return (
    <section className={RESOURCES_BODY_SECTION_CLASS} aria-label="Resources content">
      <ResourcesArticlesSection />
      <ResourcesFaqPanel />
    </section>
  );
}
