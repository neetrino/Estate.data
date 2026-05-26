import { AboutStorySection } from "@/features/about/components/AboutStorySection";
import { ABOUT_PAGE_COPY } from "@/features/about/content/aboutPageCopy";
import {
  ABOUT_PAGE_EYEBROW_CLASS,
  ABOUT_PAGE_SUBTITLE_CLASS,
  ABOUT_PAGE_TITLE_CLASS,
  ABOUT_PAGE_MAIN_CLASS,
  SITE_PAGE_SHELL_CLASS,
} from "@/shared/lib/constants";

export function AboutPage() {
  const { eyebrow, title, subtitle } = ABOUT_PAGE_COPY;

  return (
    <main className={ABOUT_PAGE_MAIN_CLASS}>
        <div className={SITE_PAGE_SHELL_CLASS}>
          <header>
            <p className={ABOUT_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={ABOUT_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={ABOUT_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <AboutStorySection />
        </div>
    </main>
  );
}
