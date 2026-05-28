import Link from "next/link";
import type { ArticleDetail } from "@/features/resources/content/resourcesContentCopy";
import "@/features/resources/styles/resources-page.css";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import { Navbar } from "@/shared/components/navbar";
import {
  ABOUT_PAGE_MAIN_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_PAGE_TITLE_CLASS,
} from "@/shared/lib/constants";

const ARTICLE_BODY_CLASS =
  "mt-8 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg";

const ARTICLE_META_CLASS = "mt-3 text-sm text-muted-foreground sm:text-base";

const ARTICLE_BACK_LINK_CLASS =
  "text-base font-medium text-what-we-do-subtitle transition-opacity hover:opacity-85";

type ArticleDetailPageProps = {
  article: ArticleDetail;
};

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  return (
    <>
      <Navbar />
      <main className={`${ABOUT_PAGE_MAIN_CLASS} relative isolate resources-page-background`}>
        <article className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <Link href="/resources" className={ARTICLE_BACK_LINK_CLASS}>
            ← Back to resources
          </Link>
          <header className="mt-6">
            <h1 className={WHAT_WE_DO_PAGE_TITLE_CLASS}>{article.title}</h1>
            <p className={ARTICLE_META_CLASS}>{article.readTimeLabel}</p>
          </header>
          <div className={ARTICLE_BODY_CLASS}>
            {article.body.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
        <FooterPageBridge from="surface" />
      </main>
    </>
  );
}
