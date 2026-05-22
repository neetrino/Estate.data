import { STUDIO_CONTACT, studioMapEmbedUrl } from "@/shared/lib/studioContact";

const CONTACT_MAP_FRAME_CLASS =
  "min-h-[14rem] w-full overflow-hidden rounded-2xl border border-foreground/10 shadow-[var(--client-voices-card-shadow)] max-lg:aspect-[4/3] sm:min-h-[16rem] lg:min-h-0 lg:flex-1";

export function ContactStudioMap() {
  const { address } = STUDIO_CONTACT;
  const embedUrl = studioMapEmbedUrl();

  return (
    <div className={CONTACT_MAP_FRAME_CLASS}>
      <iframe
        title={`Map: ${address}`}
        src={embedUrl}
        className="size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
