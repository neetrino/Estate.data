import Image from "next/image";
import { WhatWeDoNeonCardDecor } from "@/features/home/components/WhatWeDoNeonCardDecor";
import { WhatWeDoServiceIcon } from "@/features/home/components/WhatWeDoServiceIcon";
import {
  whatWeDoNeonCardClassName,
  whatWeDoNeonCardUsesCompactIcon,
} from "@/features/home/lib/whatWeDoCardAccent";
import type { WhatWeDoService } from "@/features/home/content/whatWeDoCopy";
import "@/features/home/styles/what-we-do-neon-card.css";
import { WHAT_WE_DO_ICON_SIZE_PX } from "@/shared/lib/constants";

const WHAT_WE_DO_ICON_SIZE_DEFAULT_PX = WHAT_WE_DO_ICON_SIZE_PX;
const WHAT_WE_DO_ICON_SIZE_COMPACT_PX = 40;

const WHAT_WE_DO_ICON_WRAPPER_CLASS =
  "flex size-11 shrink-0 items-center justify-center sm:size-12";

const WHAT_WE_DO_ICON_WRAPPER_COMPACT_CLASS =
  "flex size-9 shrink-0 items-center justify-center sm:size-10";

const WHAT_WE_DO_ICON_IMAGE_WHITE_CLASS =
  "size-11 object-contain brightness-0 invert sm:size-12";

const WHAT_WE_DO_ICON_IMAGE_WHITE_COMPACT_CLASS =
  "size-9 object-contain brightness-0 invert sm:size-10";

const WHAT_WE_DO_ICON_SVG_CLASS = "size-11 text-white sm:size-12";

const WHAT_WE_DO_ICON_SVG_COMPACT_CLASS = "size-9 text-white sm:size-10";

type WhatWeDoServiceCardProps = {
  service: WhatWeDoService;
};

export function WhatWeDoServiceCard({ service }: WhatWeDoServiceCardProps) {
  return (
    <article className={whatWeDoNeonCardClassName(service.id)}>
      <div className="what-we-do-neon-card__surface">
        <WhatWeDoNeonCardDecor />
        <WhatWeDoServiceIconBox service={service} className="what-we-do-neon-card__icon-slot" />
        <div className="what-we-do-neon-card__content">
          <h3 className="text-lg font-bold leading-snug text-white sm:text-xl">{service.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-what-we-do-card-description sm:text-base">
            {service.description}
          </p>
        </div>
      </div>
    </article>
  );
}

function WhatWeDoServiceIconBox({
  service,
  className,
}: {
  service: WhatWeDoService;
  className?: string;
}) {
  const isCompactIcon = whatWeDoNeonCardUsesCompactIcon(service.id);
  const iconSizePx = isCompactIcon ? WHAT_WE_DO_ICON_SIZE_COMPACT_PX : WHAT_WE_DO_ICON_SIZE_DEFAULT_PX;
  const wrapperClass = [
    isCompactIcon ? WHAT_WE_DO_ICON_WRAPPER_COMPACT_CLASS : WHAT_WE_DO_ICON_WRAPPER_CLASS,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (service.iconSrc) {
    return (
      <div className={wrapperClass}>
        <Image
          src={service.iconSrc}
          alt=""
          width={iconSizePx}
          height={iconSizePx}
          loading="lazy"
          className={
            isCompactIcon ? WHAT_WE_DO_ICON_IMAGE_WHITE_COMPACT_CLASS : WHAT_WE_DO_ICON_IMAGE_WHITE_CLASS
          }
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <WhatWeDoServiceIcon
        icon={service.icon}
        className={isCompactIcon ? WHAT_WE_DO_ICON_SVG_COMPACT_CLASS : WHAT_WE_DO_ICON_SVG_CLASS}
      />
    </div>
  );
}
