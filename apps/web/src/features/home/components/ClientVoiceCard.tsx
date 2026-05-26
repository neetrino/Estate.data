import { ClientVoiceDecorIcon } from "@/features/home/components/ClientVoiceCardIcons";
import type { ClientVoice } from "@/features/home/content/clientVoicesCopy";
import {
  CLIENT_VOICES_STAR_COUNT,
  CLIENT_VOICES_STAR_LIFT_CLASS,
} from "@/shared/lib/constants";

type ClientVoiceCardProps = {
  voice: ClientVoice;
};

export function ClientVoiceCard({ voice }: ClientVoiceCardProps) {
  return (
    <article className="home-client-voice-card h-full">
      <div className="home-client-voice-card__top">
        <span className="home-client-voice-card__quote-mark" aria-hidden>
          &ldquo;
        </span>
        <ClientVoiceDecorIcon icon={voice.icon} className="home-client-voice-card__icon" />
      </div>

      <blockquote className="home-client-voice-card__quote">
        <p>{voice.quote}</p>
      </blockquote>

      <footer className="home-client-voice-card__footer">
        <div className="home-client-voice-card__author">
          <p className="home-client-voice-card__name">{voice.name}</p>
          <p className="home-client-voice-card__role">{voice.role}</p>
        </div>
        <ClientVoiceStarRating className={CLIENT_VOICES_STAR_LIFT_CLASS} />
      </footer>
    </article>
  );
}

type ClientVoiceStarRatingProps = {
  className?: string;
};

function ClientVoiceStarRating({ className }: ClientVoiceStarRatingProps) {
  return (
    <div
      className={["home-client-voice-card__stars", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={`${CLIENT_VOICES_STAR_COUNT} out of ${CLIENT_VOICES_STAR_COUNT} stars`}
    >
      {Array.from({ length: CLIENT_VOICES_STAR_COUNT }, (_, index) => (
        <StarIcon key={index} />
      ))}
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      className="home-client-voice-card__star size-4"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path d="M10 1.5 12.472 7.236l6.364.925-4.604 4.486 1.086 6.338L10 15.773l-5.318 2.794 1.086-6.338-4.604-4.486 6.364-.925L10 1.5Z" />
    </svg>
  );
}
