import { AboutStorySection } from "@/features/about/components/AboutStorySection";
import { ABOUT_PAGE_COPY } from "@/features/about/content/aboutPageCopy";
import { Navbar } from "@/shared/components/navbar";
import {
  ABOUT_PAGE_EYEBROW_CLASS,
  ABOUT_PAGE_SUBTITLE_CLASS,
  ABOUT_PAGE_TITLE_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_SECTION_SURFACE_CLASS,
} from "@/shared/lib/constants";

export function AboutPage() {
  const { eyebrow, title, subtitle } = ABOUT_PAGE_COPY;

  return (
    <>
      <Navbar />
      <main className={WHAT_WE_DO_SECTION_SURFACE_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={ABOUT_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={ABOUT_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={ABOUT_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <AboutStorySection />
        </div>
      </main>
    </>
  );
}
