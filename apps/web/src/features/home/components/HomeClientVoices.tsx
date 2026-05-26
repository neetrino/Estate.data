import { ClientVoiceCard } from "@/features/home/components/ClientVoiceCard";
import { HOME_CLIENT_VOICES_COPY } from "@/features/home/content/clientVoicesCopy";
import { LandingSectionBlend } from "@/features/home/landing/components/LandingSectionBlend";
import { HOME_CLIENT_VOICES_BG_SOURCES } from "@/features/home/landing/lib/heroLandingAssets";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import "@/features/home/styles/home-client-voices-section.css";

const HOME_CLIENT_VOICES_SECTION_CLASS = [
  "home-client-voices relative isolate overflow-hidden",
  LANDING_SECTION_CLASS,
].join(" ");

export function HomeClientVoices() {
  const { eyebrow, title, subtitle, testimonials } = HOME_CLIENT_VOICES_COPY;

  return (
    <section
      className={HOME_CLIENT_VOICES_SECTION_CLASS}
      aria-labelledby="client-voices-heading"
    >
      <HomeClientVoicesBackground />

      <div className={`${LANDING_CONTAINER_CLASS} home-client-voices__content`}>
        <header className="text-center">
          <p className="home-client-voices__eyebrow">{eyebrow}</p>
          <h2 id="client-voices-heading" className="home-client-voices__title">
            {title}
          </h2>
          <ClientVoicesTitleDivider />
          <p className="home-client-voices__subtitle">{subtitle}</p>
        </header>

        <div className="home-client-voices__stage">
          <ul className="home-client-voices__grid" role="list">
            {testimonials.map((voice) => (
              <li key={voice.id} className="flex min-w-0">
                <ClientVoiceCard voice={voice} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ClientVoicesTitleDivider() {
  return (
    <div className="home-client-voices__title-divider" aria-hidden>
      <span className="home-client-voices__title-divider-line" />
      <span className="home-client-voices__title-divider-sparkle" />
      <span className="home-client-voices__title-divider-line" />
    </div>
  );
}

function HomeClientVoicesBackground() {
  return (
    <div
      className="home-client-voices-bg-layer pointer-events-none absolute inset-0 z-0 size-full min-h-full overflow-hidden"
      aria-hidden
    >
      <picture className="absolute inset-0 block size-full min-h-full">
        <source
          media="(min-width: 1280px)"
          srcSet={HOME_CLIENT_VOICES_BG_SOURCES.desktop}
          type="image/webp"
        />
        <source
          media="(min-width: 768px)"
          srcSet={HOME_CLIENT_VOICES_BG_SOURCES.tablet}
          type="image/webp"
        />
        <img
          src={HOME_CLIENT_VOICES_BG_SOURCES.mobile}
          alt=""
          width={2560}
          height={1440}
          decoding="async"
          className="home-client-voices-bg-image size-full min-h-full"
        />
      </picture>
      <LandingSectionBlend edge="top" tone="white" />
      <LandingSectionBlend edge="bottom" tone="white" />
      <div className="home-client-voices-photo-scrim absolute inset-0" />
    </div>
  );
}
