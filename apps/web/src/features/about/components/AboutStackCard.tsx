import { ABOUT_STACK_COPY } from "@/features/about/content/aboutStackCopy";
import { SOLUTIONS_ROLE_CARD_SHELL_CLASS } from "@/shared/lib/constants";

const ABOUT_STACK_CARD_CLASS =
  "mt-4 w-fit max-w-60 shrink-0 px-4 py-3 sm:max-w-72 sm:px-5 sm:py-4 lg:mt-6";

const ABOUT_STACK_TITLE_CLASS = "text-base font-bold text-client-voices-accent";

const ABOUT_STACK_LIST_CLASS = "mt-3 flex flex-col gap-2";

const ABOUT_STACK_ITEM_CLASS = "flex items-start gap-2 text-sm leading-snug text-foreground";

function AboutStackCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 size-4 shrink-0 text-home-listing-cta-book"
      aria-hidden
    >
      <path
        d="M3 8.5 6.5 12 13 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AboutStackCard() {
  const { title, items } = ABOUT_STACK_COPY;

  return (
    <article className={`${SOLUTIONS_ROLE_CARD_SHELL_CLASS} ${ABOUT_STACK_CARD_CLASS}`}>
      <h3 className={ABOUT_STACK_TITLE_CLASS}>{title}</h3>
      <ul className={ABOUT_STACK_LIST_CLASS}>
        {items.map((item) => (
          <li key={item} className={ABOUT_STACK_ITEM_CLASS}>
            <AboutStackCheckIcon />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
