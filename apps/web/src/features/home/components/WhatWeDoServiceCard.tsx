import Image from "next/image";
import type { WhatWeDoService } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceIcon } from "@/features/home/components/WhatWeDoServiceIcon";
import {
  GRADIENT_CARD_PADDING_CLASS,
  WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX,
  WHAT_WE_DO_CARD_HEIGHT_PX,
  WHAT_WE_DO_CARD_SURFACE_STYLE,
  WHAT_WE_DO_ICON_SIZE_PX,
} from "@/shared/lib/constants";

const WHAT_WE_DO_ICON_WRAPPER_CLASS =
  "flex size-12 shrink-0 items-center justify-center";

const WHAT_WE_DO_ICON_IMAGE_WHITE_CLASS = "size-12 object-contain brightness-0 invert";

const WHAT_WE_DO_ICON_SVG_CLASS = "size-12 text-white";

type WhatWeDoServiceCardProps = {
  service: WhatWeDoService;
};

export function WhatWeDoServiceCard({ service }: WhatWeDoServiceCardProps) {
  return (
    <article
      className={`relative flex w-full flex-col justify-center overflow-hidden text-left ${GRADIENT_CARD_PADDING_CLASS}`}
      style={{
        minHeight: WHAT_WE_DO_CARD_HEIGHT_PX,
        ...WHAT_WE_DO_CARD_SURFACE_STYLE,
      }}
    >
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(${WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX}px)`,
        }}
      >
        <WhatWeDoServiceIconBox service={service} />
        <h3 className="mt-7 text-xl font-bold text-white">{service.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-what-we-do-card-description">
          {service.description}
        </p>
      </div>
    </article>
  );
}

function WhatWeDoServiceIconBox({ service }: { service: WhatWeDoService }) {
  if (service.iconSrc) {
    return (
      <div className={WHAT_WE_DO_ICON_WRAPPER_CLASS}>
        <Image
          src={service.iconSrc}
          alt=""
          width={WHAT_WE_DO_ICON_SIZE_PX}
          height={WHAT_WE_DO_ICON_SIZE_PX}
          className={WHAT_WE_DO_ICON_IMAGE_WHITE_CLASS}
        />
      </div>
    );
  }

  return (
    <div className={WHAT_WE_DO_ICON_WRAPPER_CLASS}>
      <WhatWeDoServiceIcon icon={service.icon} className={WHAT_WE_DO_ICON_SVG_CLASS} />
    </div>
  );
}
