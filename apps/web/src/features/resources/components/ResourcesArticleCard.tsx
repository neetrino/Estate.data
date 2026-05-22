import Link from "next/link";
import type { ResourceArticle } from "@/features/resources/content/resourcesContentCopy";
import { SOLUTIONS_ROLE_CARD_SHELL_CLASS } from "@/shared/lib/constants";

const RESOURCES_ARTICLE_CARD_CLASS = [
  "group flex w-full items-center justify-between gap-4",
  "px-6 py-5 text-left transition-opacity hover:opacity-95 sm:px-7 sm:py-6",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-what-we-do-subtitle/40 focus-visible:ring-offset-2",
].join(" ");

const RESOURCES_ARTICLE_TITLE_CLASS =
  "text-lg font-bold leading-snug text-what-we-do-title sm:text-xl";

const RESOURCES_ARTICLE_READ_TIME_CLASS =
  "mt-1.5 text-sm text-muted-foreground sm:text-base";

const RESOURCES_ARTICLE_ARROW_CLASS = [
  "flex size-10 shrink-0 items-center justify-center rounded-full",
  "bg-what-we-do-subtitle text-white transition-transform group-hover:translate-x-0.5",
  "sm:size-11",
].join(" ");

type ResourcesArticleCardProps = {
  article: ResourceArticle;
};

export function ResourcesArticleCard({ article }: ResourcesArticleCardProps) {
  return (
    <li>
      <Link
        href={article.href}
        className={`${SOLUTIONS_ROLE_CARD_SHELL_CLASS} ${RESOURCES_ARTICLE_CARD_CLASS}`}
      >
        <div className="min-w-0 flex-1">
          <p className={RESOURCES_ARTICLE_TITLE_CLASS}>{article.title}</p>
          <p className={RESOURCES_ARTICLE_READ_TIME_CLASS}>{article.readTimeLabel}</p>
        </div>
        <span className={RESOURCES_ARTICLE_ARROW_CLASS} aria-hidden>
          <ResourcesArticleArrowIcon />
        </span>
      </Link>
    </li>
  );
}

function ResourcesArticleArrowIcon() {
  return (
    <svg
      className="size-4 sm:size-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}
