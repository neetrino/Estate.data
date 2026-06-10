import { HOME_HERO_COPY, splitHomeHeroTitleLines } from "@/features/home/content/heroCopy";
import {
  HERO_COPY_BADGE_CLASS,
  HERO_COPY_HEADLINE_CLASS,
  HERO_COPY_ROOT_CLASS,
  HERO_COPY_SUBTITLE_CLASS,
} from "@/features/home/landing/lib/heroCopyStyles";

type HeroCopyProps = {
  readonly title: string;
  readonly description: string;
};

export function HeroCopy({ title, description }: HeroCopyProps) {
  const { locationBadge } = HOME_HERO_COPY;
  const titleLines = splitHomeHeroTitleLines(title);

  return (
    <div className={HERO_COPY_ROOT_CLASS}>
      <p className={HERO_COPY_BADGE_CLASS}>
        <LocationPinIcon />
        {locationBadge}
      </p>

      <h1 className={HERO_COPY_HEADLINE_CLASS}>
        {titleLines.map((line, index) => {
          const isAccentLine = titleLines.length >= 2 && index === 1;
          return (
            <span
              key={`${index}-${line}`}
              className={isAccentLine ? "block whitespace-nowrap" : "block [overflow-wrap:anywhere]"}
            >
              <span className={isAccentLine ? "hero-headline-gradient" : undefined}>{line}</span>
            </span>
          );
        })}
      </h1>

      <p className={HERO_COPY_SUBTITLE_CLASS}>{description}</p>
    </div>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
