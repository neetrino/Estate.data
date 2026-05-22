import { ResourcesArticleCard } from "@/features/resources/components/ResourcesArticleCard";
import {
  RESOURCES_ARTICLES,
  RESOURCES_ARTICLES_SECTION_TITLE,
} from "@/features/resources/content/resourcesContentCopy";
import {
  RESOURCES_SECTION_CONTENT_OFFSET_CLASS,
  RESOURCES_SECTION_TITLE_CLASS,
} from "@/features/resources/content/resourcesLayout";

const RESOURCES_ARTICLES_LIST_CLASS = `flex flex-col gap-4 sm:gap-5 ${RESOURCES_SECTION_CONTENT_OFFSET_CLASS}`;

export function ResourcesArticlesSection() {
  return (
    <section aria-labelledby="resources-articles-heading">
      <h2 id="resources-articles-heading" className={RESOURCES_SECTION_TITLE_CLASS}>
        {RESOURCES_ARTICLES_SECTION_TITLE}
      </h2>
      <ul className={RESOURCES_ARTICLES_LIST_CLASS}>
        {RESOURCES_ARTICLES.map((article) => (
          <ResourcesArticleCard key={article.id} article={article} />
        ))}
      </ul>
    </section>
  );
}
