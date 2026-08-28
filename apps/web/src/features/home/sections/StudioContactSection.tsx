import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
import { ContactRequestForm } from "@/features/contact/components/ContactRequestForm";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";
import {
  STUDIO_BODY_CLASS,
  STUDIO_CONTAINER_CLASS,
  STUDIO_DARK_SECTION_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

type StudioContactSectionProps = {
  readonly fields: readonly ContactFieldSetting[];
};

export function StudioContactSection({ fields }: StudioContactSectionProps) {
  const copy = STUDIO_PAGE_COPY.contact;

  return (
    <section id={HOME_SECTION_IDS.contact} className={STUDIO_DARK_SECTION_CLASS}>
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-10 lg:grid-cols-2 lg:items-start`}>
        <div>
          <p className="studio-label text-studio-accent">{copy.eyebrow}</p>
          <h2 className={STUDIO_TITLE_CLASS}>{copy.title}</h2>
          <p className={`${STUDIO_BODY_CLASS} text-studio-muted`}>{copy.body}</p>
          <ul className="mt-8 space-y-3 text-studio-fg/85">
            <li>
              <a href={STUDIO_CONTACT.phone.href}>{STUDIO_CONTACT.phone.label}</a>
            </li>
            <li>
              <a href={STUDIO_CONTACT.email.href}>{STUDIO_CONTACT.email.label}</a>
            </li>
            <li>{STUDIO_CONTACT.hours}</li>
            <li>{STUDIO_CONTACT.address}</li>
          </ul>
        </div>
        <ContactRequestForm fields={fields} />
      </div>
    </section>
  );
}
