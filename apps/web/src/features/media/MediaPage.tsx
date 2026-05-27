import { MediaPageBackground } from "@/features/media/components/MediaPageBackground";
import { MediaServicesSection } from "@/features/media/components/MediaServicesSection";
import "@/features/media/styles/media-page.css";
import { MEDIA_PAGE_MAIN_CLASS, SITE_PAGE_SHELL_CLASS } from "@/shared/lib/constants";

export function MediaPage() {
  return (
    <main className={MEDIA_PAGE_MAIN_CLASS}>
      <MediaPageBackground />

      <div className={`${SITE_PAGE_SHELL_CLASS} media-page__content`}>
        <MediaServicesSection />
      </div>
    </main>
  );
}
