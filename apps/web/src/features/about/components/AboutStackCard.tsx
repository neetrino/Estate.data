import { ABOUT_STACK_COPY } from "@/features/about/content/aboutStackCopy";
import { SOLUTIONS_ROLE_CARD_SHELL_CLASS } from "@/shared/lib/constants";

const ABOUT_STACK_CARD_CLASS =
  "mt-4 w-full px-5 py-5 sm:px-6 sm:py-5 lg:mt-6 lg:w-fit lg:max-w-72 lg:shrink-0 lg:px-5 lg:py-4";

const ABOUT_STACK_TITLE_CLASS =
  "text-lg font-bold text-client-voices-accent lg:text-base";

const ABOUT_STACK_LIST_CLASS = "mt-4 flex flex-col gap-2.5 lg:mt-3 lg:gap-2";

const ABOUT_STACK_ITEM_CLASS =
  "flex items-start gap-2.5 text-base leading-snug text-foreground lg:gap-2 lg:text-sm";

function AboutStackCheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 size-5 shrink-0 text-home-listing-cta-book lg:size-4"
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
