import Link from "next/link";
import {
  RESOURCES_ASK_QUESTION_CTA,
  RESOURCES_FAQ_ITEMS,
  RESOURCES_FAQ_SECTION_TITLE,
} from "@/features/resources/content/resourcesContentCopy";
import {
  RESOURCES_SECTION_CONTENT_OFFSET_CLASS,
  RESOURCES_SECTION_TITLE_CLASS,
} from "@/features/resources/content/resourcesLayout";
import { SOLUTIONS_ROLE_CARD_SHELL_CLASS } from "@/shared/lib/constants";

const RESOURCES_FAQ_CARD_CLASS = "flex w-full flex-col px-6 py-6 sm:px-7 sm:py-7";

const RESOURCES_FAQ_LIST_CLASS = "flex flex-col gap-6 sm:gap-7";

const RESOURCES_FAQ_QUESTION_CLASS =
  "text-base font-bold text-what-we-do-title sm:text-lg";

const RESOURCES_FAQ_ANSWER_CLASS =
  "mt-2 text-base leading-relaxed text-muted-foreground sm:text-lg";

const RESOURCES_ASK_QUESTION_LINK_CLASS = [
  "mt-8 inline-flex items-center gap-1.5 text-base font-semibold text-what-we-do-subtitle",
  "transition-colors hover:text-what-we-do-title sm:text-lg",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-what-we-do-subtitle/40 focus-visible:ring-offset-2",
].join(" ");

export function ResourcesFaqPanel() {
  return (
    <section aria-labelledby="resources-faq-heading">
      <h2 id="resources-faq-heading" className={RESOURCES_SECTION_TITLE_CLASS}>
        {RESOURCES_FAQ_SECTION_TITLE}
      </h2>
      <article
        className={`${RESOURCES_SECTION_CONTENT_OFFSET_CLASS} ${SOLUTIONS_ROLE_CARD_SHELL_CLASS} ${RESOURCES_FAQ_CARD_CLASS}`}
      >
        <dl className={RESOURCES_FAQ_LIST_CLASS}>
          {RESOURCES_FAQ_ITEMS.map((item) => (
            <div key={item.id}>
              <dt className={RESOURCES_FAQ_QUESTION_CLASS}>{item.question}</dt>
              <dd className={RESOURCES_FAQ_ANSWER_CLASS}>{item.answer}</dd>
            </div>
          ))}
        </dl>
        <Link href={RESOURCES_ASK_QUESTION_CTA.href} className={RESOURCES_ASK_QUESTION_LINK_CLASS}>
          {RESOURCES_ASK_QUESTION_CTA.label}
          <span aria-hidden>→</span>
        </Link>
      </article>
    </section>
  );
}
