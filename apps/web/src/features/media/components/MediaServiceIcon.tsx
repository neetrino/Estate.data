import Image from "next/image";
import type { MediaServiceIconId } from "@/features/media/content/mediaServicesCopy";
import { MEDIA_SERVICE_ASSETS } from "@/features/media/lib/mediaServiceAssets";

const MEDIA_SERVICE_ICON_SIZE_PX = 72;

type MediaServiceIconProps = {
  icon: MediaServiceIconId;
};

export function MediaServiceIcon({ icon }: MediaServiceIconProps) {
  const { iconSrc } = MEDIA_SERVICE_ASSETS[icon];

  return (
    <span className="media-service-card__icon-slot" aria-hidden>
      <Image
        src={iconSrc}
        alt=""
        width={MEDIA_SERVICE_ICON_SIZE_PX}
        height={MEDIA_SERVICE_ICON_SIZE_PX}
        className="media-service-card__icon"
      />
    </span>
  );
}
