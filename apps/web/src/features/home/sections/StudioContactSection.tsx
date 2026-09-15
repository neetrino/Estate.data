import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
import { ContactRequestForm } from "@/features/contact/components/ContactRequestForm";
import { StudioContactDetails } from "@/features/home/sections/StudioContactDetails";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import type { ContactMarketingCopy } from "@/server/features/site-copy/site-copy.schema";
import { HOME_SECTION_IDS, HOME_SECTION_SCROLL_MARGIN_CLASS } from "@/shared/lib/homeSectionIds";

const FORM_DELAY_MS = 100;

type StudioContactSectionProps = {
  readonly fields: readonly ContactFieldSetting[];
  readonly copy: ContactMarketingCopy;
};

export function StudioContactSection({ fields, copy }: StudioContactSectionProps) {
  return (
    <section id={HOME_SECTION_IDS.quote} className={STUDIO_MUTED_SECTION_CLASS}>
      <div
        id={HOME_SECTION_IDS.contact}
        className={`${HOME_SECTION_SCROLL_MARGIN_CLASS} ${STUDIO_CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-16`}
      >
        <StudioReveal className="lg:col-span-4">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{copy.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[40ch]">{copy.body}</p>
          <StudioContactDetails copy={copy} />
        </StudioReveal>
        <StudioReveal className="lg:col-span-8" delay={FORM_DELAY_MS}>
          <ContactRequestForm fields={fields} />
        </StudioReveal>
      </div>
    </section>
  );
}
