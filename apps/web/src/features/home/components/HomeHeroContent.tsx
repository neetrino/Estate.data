import Link from "next/link";
import { HOME_HERO_COPY } from "@/features/home/content/heroCopy";
import {
  HERO_CONTENT_TOP_INSET_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
} from "@/shared/lib/constants";
import { AccentButtonLink } from "@/shared/ui/button";

const HERO_OVERLAY_CLASS = "bg-black/45";

export function HomeHeroOverlay() {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 ${HERO_OVERLAY_CLASS}`}
      aria-hidden
    />
  );
}

export function HomeHeroContent() {
  const {
    locationBadge,
    headlineLines,
    descriptionLines,
    primaryCta,
    secondaryCta,
  } = HOME_HERO_COPY;

  return (
    <section
      className={`absolute inset-x-0 bottom-0 z-10 flex items-center text-left ${HERO_CONTENT_TOP_INSET_CLASS}`}
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/70 px-4 py-1.5 text-sm font-medium text-white">
          <LocationPinIcon />
          {locationBadge}
        </p>

        <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {headlineLines.map((line) => (
            <span key={line.segments.map((s) => s.text).join("")} className="block">
              {line.segments.map((segment) => (
                <span
                  key={segment.text}
                  className={segment.accent ? "text-accent" : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
          {descriptionLines.map((line, index) => (
            <span key={line}>
              {line}
              {index < descriptionLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <AccentButtonLink
            href={primaryCta.href}
            className="h-12 justify-center px-6 text-base"
          >
            {primaryCta.label}
          </AccentButtonLink>
          <Link
            href={secondaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-button border border-white/80 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

function LocationPinIcon() {
  return (
    <svg
      width="16"
      height="16"
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
