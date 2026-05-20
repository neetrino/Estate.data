import { ClientVoiceCard } from "@/features/home/components/ClientVoiceCard";
import { HOME_CLIENT_VOICES_COPY } from "@/features/home/content/clientVoicesCopy";
import {
  CLIENT_VOICES_EYEBROW_CLASS,
  CLIENT_VOICES_SECTION_SURFACE_CLASS,
  CLIENT_VOICES_SECTION_TITLE_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_CARD_GRID_GAP_CLASS,
} from "@/shared/lib/constants";

export function HomeClientVoices() {
  const { eyebrow, title, testimonials } = HOME_CLIENT_VOICES_COPY;

  return (
    <section
      className={CLIENT_VOICES_SECTION_SURFACE_CLASS}
      aria-labelledby="client-voices-heading"
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <header className="text-center">
          <p className={CLIENT_VOICES_EYEBROW_CLASS}>{eyebrow}</p>
          <h2
            id="client-voices-heading"
            className={CLIENT_VOICES_SECTION_TITLE_CLASS}
          >
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
