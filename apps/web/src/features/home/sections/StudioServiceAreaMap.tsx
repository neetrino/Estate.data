import { STUDIO_CONTACT, studioServiceAreaMapEmbedUrl } from "@/shared/lib/studioContact";

const SERVICE_AREA_MAP_FRAME_CLASS =
  "studio-service-map h-full min-h-[22rem] w-full overflow-hidden border border-studio-border lg:min-h-[32rem]";

export function StudioServiceAreaMap() {
  const embedUrl = studioServiceAreaMapEmbedUrl();

  return (
    <div className={SERVICE_AREA_MAP_FRAME_CLASS}>
      <iframe
        title={`Service area map: ${STUDIO_CONTACT.address}`}
        src={embedUrl}
        className="size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
