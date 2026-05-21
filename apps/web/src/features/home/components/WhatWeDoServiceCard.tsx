import Image from "next/image";
import type { WhatWeDoService } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceIcon } from "@/features/home/components/WhatWeDoServiceIcon";
import {
  LANDING_GLASS_CARD_CLASS,
  landingIconSurfaceClass,
  type LandingAccent,
} from "@/features/home/landing/lib/landingStyles";
import { WHAT_WE_DO_ICON_SIZE_PX } from "@/shared/lib/constants";

const WHAT_WE_DO_ICON_IMAGE_CLASS = "size-10 object-contain";

type WhatWeDoServiceCardProps = {
  service: WhatWeDoService;
  accent: LandingAccent;
};

export function WhatWeDoServiceCard({ service, accent }: WhatWeDoServiceCardProps) {
  return (
    <article className={`${LANDING_GLASS_CARD_CLASS} flex h-full flex-col p-5 sm:p-6`}>
      <WhatWeDoServiceIconBox service={service} accent={accent} />
      <h3 className="mt-4 text-lg font-bold text-brand-navy sm:text-xl">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {service.description}
      </p>
    </article>
  );
}

function WhatWeDoServiceIconBox({
  service,
  accent,
}: {
  service: WhatWeDoService;
  accent: LandingAccent;
}) {
  return (
    <span className={landingIconSurfaceClass(accent)}>
      {service.iconSrc ? (
        <Image
          src={service.iconSrc}
          alt=""
          width={WHAT_WE_DO_ICON_SIZE_PX}
          height={WHAT_WE_DO_ICON_SIZE_PX}
          className={WHAT_WE_DO_ICON_IMAGE_CLASS}
        />
      ) : (
        <WhatWeDoServiceIcon icon={service.icon} className="size-6" />
      )}
    </span>
  );
}
