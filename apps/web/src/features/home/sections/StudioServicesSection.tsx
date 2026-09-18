import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioServiceBlock } from "@/features/home/sections/StudioServiceBlock";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import type { ServicesIntroCopy } from "@/server/features/site-copy/site-copy.schema";

const BLOCK_STACK_CLASS = "mt-20 space-y-24 lg:space-y-32";

/** Services rendered inside the shared intro section; the rest get bespoke layouts. */
export const STUDIO_CORE_SERVICE_KEYS: readonly string[] = [
  HOME_SECTION_IDS.photography,
  HOME_SECTION_IDS.editing,
  HOME_SECTION_IDS.video,
];

type StudioServicesSectionProps = {
  readonly services: readonly StudioServiceContent[];
  readonly copy: ServicesIntroCopy;
};

/** Services intro heading followed by the alternating service blocks. */
export function StudioServicesSection({ services, copy }: StudioServicesSectionProps) {

  return (
    <section id={HOME_SECTION_IDS.services} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <StudioReveal>
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[20ch] text-studio-fg">{copy.title}</h2>
        </StudioReveal>
        <div className={BLOCK_STACK_CLASS}>
          {services.map((service, index) => (
            <StudioServiceBlock
              key={service.sectionKey}
              service={service}
              imageOnRight={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
