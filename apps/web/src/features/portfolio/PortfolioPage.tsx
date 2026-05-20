import { PortfolioWorkSection } from "@/features/portfolio/components/PortfolioWorkSection";
import { PORTFOLIO_PAGE_COPY } from "@/features/portfolio/content/portfolioCopy";
import { Navbar } from "@/shared/components/navbar";
import {
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_SECTION_SURFACE_CLASS,
} from "@/shared/lib/constants";

const PORTFOLIO_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-what-we-do-subtitle sm:text-base";

const PORTFOLIO_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-what-we-do-title sm:text-4xl md:text-5xl lg:text-[3rem]";

const PORTFOLIO_SUBTITLE_CLASS =
  "mt-5 max-w-3xl text-lg leading-relaxed text-what-we-do-subtitle sm:text-xl";

export function PortfolioPage() {
  const { eyebrow, title, subtitle } = PORTFOLIO_PAGE_COPY;

  return (
    <>
      <Navbar />
      <main className={WHAT_WE_DO_SECTION_SURFACE_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={PORTFOLIO_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={PORTFOLIO_TITLE_CLASS}>{title}</h1>
            <p className={PORTFOLIO_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <PortfolioWorkSection />
        </div>
      </main>
    </>
  );
}
