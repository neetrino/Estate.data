import { ClientVoiceCard } from "@/features/home/components/ClientVoiceCard";
import { HOME_CLIENT_VOICES_COPY } from "@/features/home/content/clientVoicesCopy";
import {
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  WHAT_WE_DO_CARD_GRID_GAP_CLASS,
} from "@/shared/lib/constants";

const CLIENT_VOICES_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-client-voices-accent sm:text-base";

const CLIENT_VOICES_TITLE_CLASS =
  "mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl lg:text-[3rem]";

export function HomeClientVoices() {
  const { eyebrow, title, testimonials } = HOME_CLIENT_VOICES_COPY;

  return (
    <section
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="client-voices-heading"
    >
      <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
        <header className="text-center">
          <p className={CLIENT_VOICES_EYEBROW_CLASS}>{eyebrow}</p>
          <h2 id="client-voices-heading" className={CLIENT_VOICES_TITLE_CLASS}>
            {title}
          </h2>
        </header>

        <ul
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 ${WHAT_WE_DO_CARD_GRID_GAP_CLASS}`}
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
