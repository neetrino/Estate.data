import { PortfolioWorkSection } from "@/features/portfolio/components/PortfolioWorkSection";
import { PORTFOLIO_PAGE_COPY } from "@/features/portfolio/content/portfolioCopy";
import { fetchPortfolioProjects } from "@/features/portfolio/services/fetchPortfolioProjects";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import {
  SITE_PAGE_SHELL_CLASS,
  WHAT_WE_DO_PAGE_EYEBROW_CLASS,
  WHAT_WE_DO_PAGE_SUBTITLE_CLASS,
  WHAT_WE_DO_PAGE_TITLE_CLASS,
  INNER_PAGE_MAIN_SPACING_CLASS,
  MOBILE_INNER_PAGES_BACKGROUND_CLASS,
} from "@/shared/lib/constants";

export async function PortfolioPage() {
  const { eyebrow, title, subtitle } = PORTFOLIO_PAGE_COPY;
  const projects = await fetchPortfolioProjects();

  return (
    <main
      className={[
        INNER_PAGE_MAIN_SPACING_CLASS,
        MOBILE_INNER_PAGES_BACKGROUND_CLASS,
        "relative isolate overflow-x-hidden bg-[#f8f7ff]",
        "bg-[url('/assets/hero-villa-BcD5T4f7.webp')] bg-cover bg-center bg-no-repeat",
      ].join(" ")}
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[#f4f1fb]/65 to-[#f4f1fb]"
        aria-hidden
      />
      <div className={`${SITE_PAGE_SHELL_CLASS} relative z-20`}>
        <header>
          <p className={WHAT_WE_DO_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
          <h1 className={WHAT_WE_DO_PAGE_TITLE_CLASS}>{title}</h1>
          <p className={WHAT_WE_DO_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
        </header>
        <PortfolioWorkSection projects={projects} />
      </div>
      <FooterPageBridge from="surface" />
    </main>
  );
}
