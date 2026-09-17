import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { STUDIO_MATTERPORT_DEMO } from "@/features/home/content/studioPageCopy";
import type { FloorPlansCopy } from "@/server/features/site-copy/site-copy.schema";
import { StudioFeatureList } from "@/features/home/sections/StudioFeatureList";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioServiceActions } from "@/features/home/sections/StudioServiceActions";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";

const MEDIA_DELAY_MS = 120;

type StudioFloorPlansSectionProps = {
  readonly service: StudioServiceContent;
  readonly copy: FloorPlansCopy;
};

/** Dedicated Floor Plans / 2D–3D block — same capture as the Matterport tour. */
export function StudioFloorPlansSection({ service, copy }: StudioFloorPlansSectionProps) {
  const actionsService: StudioServiceContent = {
    ...service,
    sectionKey: HOME_SECTION_IDS.floorPlans,
  };

  return (
    <section
      id={HOME_SECTION_IDS.floorPlans}
      data-service-key={HOME_SECTION_IDS.floorPlans}
      className={STUDIO_LIGHT_SECTION_CLASS}
    >
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <StudioReveal className="lg:col-span-6">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{copy.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[50ch]">{copy.body}</p>
          <div className="mt-10">
            <StudioFeatureList items={copy.included} />
          </div>
        </StudioReveal>
        <StudioReveal className="lg:col-span-6" delay={MEDIA_DELAY_MS}>
          <div className="relative aspect-[4/3] overflow-hidden bg-studio-bg">
            <PublicAssetImage
              src={service.imageUrl}
              alt={STUDIO_MATTERPORT_DEMO.imageAlt}
              fill
              loading="lazy"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <StudioServiceActions service={actionsService} className="mt-8" />
        </StudioReveal>
      </div>
    </section>
  );
}
