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
    <article className="flex h-full w-full flex-col rounded-2xl bg-white p-6 shadow-[var(--client-voices-card-shadow)] sm:p-7">
      <ClientVoiceQuoteMark />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-black">
        {voice.quote}
      </blockquote>
      <footer className="mt-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-bold text-black">{voice.name}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{voice.role}</p>
        </div>
        <ClientVoiceStarRating
          className={`shrink-0 ${CLIENT_VOICES_STAR_LIFT_CLASS}`}
        />
      </footer>
    </article>
  );
}

const CLIENT_VOICE_QUOTE_PATH =
  "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z";

function ClientVoiceQuoteMark() {
  return (
    <div
      className="flex items-end gap-0 text-client-voices-accent"
      aria-hidden
    >
      <ClientVoiceQuoteBubble />
      <ClientVoiceQuoteBubble />
    </div>
  );
}

function ClientVoiceQuoteBubble() {
  return (
    <svg className="size-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d={CLIENT_VOICE_QUOTE_PATH} />
    </svg>
  );
}

type ClientVoiceStarRatingProps = {
  className?: string;
};

function ClientVoiceStarRating({ className }: ClientVoiceStarRatingProps) {
  const stars = Array.from({ length: CLIENT_VOICES_STAR_COUNT }, (_, index) => (
    <StarIcon key={index} />
  ));

  return (
    <div
      className={className}
      role="img"
      aria-label={`${CLIENT_VOICES_STAR_COUNT} out of ${CLIENT_VOICES_STAR_COUNT} stars`}
    >
      <ul className="flex gap-0.5">{stars}</ul>
    </div>
  );
}

function StarIcon() {
  return (
    <li aria-hidden>
      <svg
        className="size-4 text-client-voices-accent"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 1.5 12.472 7.236l6.364.925-4.604 4.486 1.086 6.338L10 15.773l-5.318 2.794 1.086-6.338-4.604-4.486 6.364-.925L10 1.5Z" />
      </svg>
    </li>
  );
}
