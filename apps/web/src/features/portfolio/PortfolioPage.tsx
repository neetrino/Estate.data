import { LazyPortfolioWorkSection } from "@/features/portfolio/lib/lazyPortfolioComponents";
import { PORTFOLIO_PAGE_COPY } from "@/features/portfolio/content/portfolioCopy";
import { fetchPortfolioProjects } from "@/features/portfolio/services/fetchPortfolioProjects";
import { Navbar } from "@/shared/components/navbar";
import {
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_PAGE_EYEBROW_CLASS,
  WHAT_WE_DO_PAGE_SUBTITLE_CLASS,
  WHAT_WE_DO_PAGE_TITLE_CLASS,
  INNER_PAGE_MAIN_CLASS,
} from "@/shared/lib/constants";

export async function PortfolioPage() {
  const { eyebrow, title, subtitle } = PORTFOLIO_PAGE_COPY;
  const projects = await fetchPortfolioProjects();

  return (
    <>
      <Navbar />
      <main className={INNER_PAGE_MAIN_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={WHAT_WE_DO_PAGE_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={WHAT_WE_DO_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={WHAT_WE_DO_PAGE_SUBTITLE_CLASS}>{subtitle}</p>
          </header>
          <LazyPortfolioWorkSection projects={projects} />
        </div>
      </main>
    </>
  );
}
