import { ResourcesArticleCard } from "@/features/resources/components/ResourcesArticleCard";
import {
  RESOURCES_ARTICLES_SECTION_TITLE,
  type ResourceArticle,
} from "@/features/resources/content/resourcesContentCopy";
import {
  RESOURCES_SECTION_CONTENT_OFFSET_CLASS,
  RESOURCES_SECTION_TITLE_CLASS,
} from "@/features/resources/content/resourcesLayout";

const RESOURCES_ARTICLES_LIST_CLASS = [
  `relative z-20 flex flex-col gap-4 sm:gap-5 ${RESOURCES_SECTION_CONTENT_OFFSET_CLASS}`,
  "[&>li]:relative [&>li]:z-0 [&>li:last-child]:z-30",
  "[&>li:last-child>a]:relative [&>li:last-child>a]:z-30",
].join(" ");

type ResourcesArticlesSectionProps = {
  articles: readonly ResourceArticle[];
};

export function ResourcesArticlesSection({ articles }: ResourcesArticlesSectionProps) {
  return (
    <section aria-labelledby="resources-articles-heading">
      <h2 id="resources-articles-heading" className={RESOURCES_SECTION_TITLE_CLASS}>
        {RESOURCES_ARTICLES_SECTION_TITLE}
      </h2>
      <ul className={RESOURCES_ARTICLES_LIST_CLASS}>
        {articles.map((article) => (
          <ResourcesArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </section>
  );
}
