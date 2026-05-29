import { ResourcesBodySection } from "@/features/resources/components/ResourcesBodySection";
import { RESOURCES_PAGE_COPY } from "@/features/resources/content/resourcesPageCopy";
import { fetchResourcesArticles } from "@/features/resources/services/fetchResourcesArticles";
import { fetchResourcesFaqItems } from "@/features/resources/services/fetchResourcesFaqItems";
import "@/features/resources/styles/resources-page.css";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import {
  ABOUT_PAGE_MAIN_CLASS,
  ABOUT_PAGE_TITLE_CLASS,
  SITE_PAGE_SHELL_CLASS,
} from "@/shared/lib/constants";

const RESOURCES_EYEBROW_CLASS =
  "text-sm font-bold uppercase tracking-[0.28em] text-[#8B5CF6] sm:text-base";

const RESOURCES_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-[#5D5A7C] sm:text-xl";

const RESOURCES_TITLE_CLASS =
  `${ABOUT_PAGE_TITLE_CLASS} whitespace-nowrap text-[2rem] sm:text-[2.35rem] md:text-[2.8rem] lg:text-[2.95rem]`;

export async function ResourcesPage() {
  const { eyebrow, title, subtitle } = RESOURCES_PAGE_COPY;
  const [articles, faqItems] = await Promise.all([
    fetchResourcesArticles(),
    fetchResourcesFaqItems(),
  ]);

  return (
    <main className={`${ABOUT_PAGE_MAIN_CLASS} relative isolate resources-page-background`}>
      <div className={`${SITE_PAGE_SHELL_CLASS} relative z-20`}>
        <header>
          <p className={RESOURCES_EYEBROW_CLASS}>{eyebrow}</p>
          <h1 className={RESOURCES_TITLE_CLASS}>{title}</h1>
          <p className={RESOURCES_SUBTITLE_CLASS}>{subtitle}</p>
        </header>
        <ResourcesBodySection articles={articles} faqItems={faqItems} />
      </div>
      <FooterPageBridge from="surface" />
    </main>
  );
}
