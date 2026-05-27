import { AboutStorySection } from "@/features/about/components/AboutStorySection";
import { ABOUT_PAGE_COPY } from "@/features/about/content/aboutPageCopy";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import {
  ABOUT_PAGE_EYEBROW_CLASS,
  ABOUT_PAGE_SUBTITLE_CLASS,
  ABOUT_PAGE_TITLE_CLASS,
  INNER_PAGE_MAIN_SPACING_CLASS,
  SITE_PAGE_SHELL_CLASS,
} from "@/shared/lib/constants";

export function AboutPage() {
  const { eyebrow, title, subtitle } = ABOUT_PAGE_COPY;

  return (
    <main
      className={[
        INNER_PAGE_MAIN_SPACING_CLASS,
        "relative isolate overflow-x-hidden bg-[#f8f7ff]",
        "bg-[url('/images/solutions/solutions-page-bg-reference-v2.png')] bg-cover bg-center bg-no-repeat",
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[#f4f1fb]/65 to-[#f4f1fb]"
        aria-hidden
      />
      <div className={`${SITE_PAGE_SHELL_CLASS} relative z-20`}>
        <header>
          <p className={ABOUT_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
          <h1 className={ABOUT_PAGE_TITLE_CLASS}>{title}</h1>
          <p className={ABOUT_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
        </header>
        <AboutStorySection />
      </div>
      <FooterPageBridge from="surface" />
    </main>
  );
}
