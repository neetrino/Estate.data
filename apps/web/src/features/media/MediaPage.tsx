import { MediaServicesSection } from "@/features/media/components/MediaServicesSection";
import { MEDIA_PAGE_COPY } from "@/features/media/content/mediaPageCopy";
import {
  SITE_PAGE_SHELL_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS,
  PROPERTY_INTELLIGENCE_PAGE_MAIN_CLASS,
} from "@/shared/lib/constants";

export function MediaPage() {
  const { eyebrow, title, subtitle } = MEDIA_PAGE_COPY;

  return (
    <main className={PROPERTY_INTELLIGENCE_PAGE_MAIN_CLASS}>
        <div className={SITE_PAGE_SHELL_CLASS}>
          <header>
            <p className={PROPERTY_INTELLIGENCE_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={PROPERTY_INTELLIGENCE_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={PROPERTY_INTELLIGENCE_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <MediaServicesSection />
        </div>
    </main>
  );
}
