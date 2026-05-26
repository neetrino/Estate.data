import { ResourcesBodySection } from "@/features/resources/components/ResourcesBodySection";
import { RESOURCES_PAGE_COPY } from "@/features/resources/content/resourcesPageCopy";
import {
  ABOUT_PAGE_EYEBROW_CLASS,
  ABOUT_PAGE_MAIN_CLASS,
  ABOUT_PAGE_SUBTITLE_CLASS,
  ABOUT_PAGE_TITLE_CLASS,
  SITE_PAGE_SHELL_CLASS,
} from "@/shared/lib/constants";

export function ResourcesPage() {
  const { eyebrow, title, subtitle } = RESOURCES_PAGE_COPY;

  return (
    <main className={ABOUT_PAGE_MAIN_CLASS}>
        <div className={SITE_PAGE_SHELL_CLASS}>
          <header>
            <p className={ABOUT_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={ABOUT_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={ABOUT_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <ResourcesBodySection />
        </div>
    </main>
  );
}
