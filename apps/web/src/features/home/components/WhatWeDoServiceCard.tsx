import type { WhatWeDoService } from "@/features/home/content/whatWeDoCopy";
import { WhatWeDoServiceIcon } from "@/features/home/components/WhatWeDoServiceIcon";
import {
  WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX,
  WHAT_WE_DO_CARD_HEIGHT_PX,
  WHAT_WE_DO_CARD_RADIUS_PX,
  WHAT_WE_DO_CARD_WIDTH_PX,
} from "@/shared/lib/constants";

const WHAT_WE_DO_ICON_WRAPPER_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-dark text-white";

type WhatWeDoServiceCardProps = {
  service: WhatWeDoService;
};

/** Service card with Figma Card 6 (165:692) inset glow frame. */
export function WhatWeDoServiceCard({ service }: WhatWeDoServiceCardProps) {
  return (
    <article
      className="relative flex flex-col justify-center overflow-hidden bg-white px-8 py-8 text-left"
      style={{
        width: WHAT_WE_DO_CARD_WIDTH_PX,
        minHeight: WHAT_WE_DO_CARD_HEIGHT_PX,
        borderRadius: WHAT_WE_DO_CARD_RADIUS_PX,
      }}
    >
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(${WHAT_WE_DO_CARD_CONTENT_OFFSET_Y_PX}px)`,
        }}
      >
        <div className={WHAT_WE_DO_ICON_WRAPPER_CLASS}>
          <WhatWeDoServiceIcon icon={service.icon} />
        </div>
        <h3 className="mt-7 text-xl font-bold text-foreground">{service.title}</h3>
        <p className="mt-2 text-base leading-relaxed text-muted-foreground">
          {service.description}
        </p>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          boxShadow: "var(--what-we-do-card-inset-shadow)",
        }}
      />
    </article>
  );
}
