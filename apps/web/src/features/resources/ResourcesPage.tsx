import { ResourcesBodySection } from "@/features/resources/components/ResourcesBodySection";
import { RESOURCES_PAGE_COPY } from "@/features/resources/content/resourcesPageCopy";
import { fetchResourcesArticles } from "@/features/resources/services/fetchResourcesArticles";
import { fetchResourcesFaqItems } from "@/features/resources/services/fetchResourcesFaqItems";
import { Navbar } from "@/shared/components/navbar";
import {
  ABOUT_PAGE_EYEBROW_CLASS,
  ABOUT_PAGE_MAIN_CLASS,
  ABOUT_PAGE_SUBTITLE_CLASS,
  ABOUT_PAGE_TITLE_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";

export async function ResourcesPage() {
  const { eyebrow, title, subtitle } = RESOURCES_PAGE_COPY;
  const [articles, faqItems] = await Promise.all([
    fetchResourcesArticles(),
    fetchResourcesFaqItems(),
  ]);

  return (
    <>
      <Navbar />
      <main className={ABOUT_PAGE_MAIN_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={ABOUT_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={ABOUT_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={ABOUT_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <ResourcesBodySection articles={articles} faqItems={faqItems} />
        </div>
      </main>
    </>
  );
}
