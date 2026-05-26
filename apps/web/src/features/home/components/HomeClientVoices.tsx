import { ClientVoiceCard } from "@/features/home/components/ClientVoiceCard";
import { HOME_CLIENT_VOICES_COPY } from "@/features/home/content/clientVoicesCopy";
import {
  LANDING_CONTAINER_CLASS,
  LANDING_EYEBROW_CLASS,
  LANDING_SECTION_ENTER_FROM_WHITE_CLASS,
  LANDING_SECTION_TITLE_CLASS,
  LANDING_SECTION_WHITE_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import { WHAT_WE_DO_CARD_GRID_GAP_CLASS } from "@/shared/lib/constants";

export function HomeClientVoices() {
  const { eyebrow, title, testimonials } = HOME_CLIENT_VOICES_COPY;

  return (
    <section
      className={`${LANDING_SECTION_WHITE_CLASS} ${LANDING_SECTION_ENTER_FROM_WHITE_CLASS}`}
      aria-labelledby="client-voices-heading"
    >
      <div className={LANDING_CONTAINER_CLASS}>
        <header className="text-center">
          <p className={LANDING_EYEBROW_CLASS}>{eyebrow}</p>
          <h2 id="client-voices-heading" className={`mt-3 ${LANDING_SECTION_TITLE_CLASS}`}>
            {title}
          </h2>
        </header>

        <ul
          className={`mt-10 grid grid-cols-1 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`}
        >
          {testimonials.map((voice) => (
            <li key={voice.id} className="flex h-full min-w-0">
              <ClientVoiceCard voice={voice} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
