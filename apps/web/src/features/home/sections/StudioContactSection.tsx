import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
import { ContactRequestForm } from "@/features/contact/components/ContactRequestForm";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const FORM_DELAY_MS = 100;

type StudioContactSectionProps = {
  readonly fields: readonly ContactFieldSetting[];
};

export function StudioContactSection({ fields }: StudioContactSectionProps) {
  const copy = STUDIO_PAGE_COPY.contact;

  return (
    <section id={HOME_SECTION_IDS.quote} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <StudioReveal className="lg:col-span-4">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{copy.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[40ch]">{copy.body}</p>
          <ul className="mt-10 space-y-2 text-sm text-studio-muted">
            <li>
              <a href={STUDIO_CONTACT.phone.href}>{STUDIO_CONTACT.phone.label}</a>
            </li>
            <li>
              <a href={STUDIO_CONTACT.email.href}>{STUDIO_CONTACT.email.label}</a>
            </li>
            <li>{STUDIO_CONTACT.hours}</li>
            <li>{STUDIO_CONTACT.address}</li>
          </ul>
        </StudioReveal>
        <StudioReveal className="lg:col-span-8" delay={FORM_DELAY_MS}>
          <ContactRequestForm fields={fields} />
        </StudioReveal>
      </div>
    </section>
  );
}
