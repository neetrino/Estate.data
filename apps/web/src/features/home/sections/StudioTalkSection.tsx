import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS, HOME_SECTION_SCROLL_MARGIN_CLASS } from "@/shared/lib/homeSectionIds";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioTalkForm } from "@/features/home/sections/StudioTalkForm";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_DARK_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const FORM_DELAY_MS = 100;

const DETAIL_LABEL_CLASS = "studio-label text-studio-muted";

const DETAIL_VALUE_CLASS = "mt-1 text-sm text-studio-fg";

const SOCIAL_LINK_CLASS = [
  "studio-label text-studio-fg transition-colors",
  "hover:text-studio-accent",
].join(" ");

const CONTACT_DETAILS = [
  {
    key: "phone",
    labelKey: "phoneLabel" as const,
    content: (
      <a href={STUDIO_CONTACT.phone.href} className="transition-colors hover:text-studio-accent">
        {STUDIO_CONTACT.phone.label}
      </a>
    ),
  },
  {
    key: "email",
    labelKey: "emailLabel" as const,
    content: (
      <a href={STUDIO_CONTACT.email.href} className="transition-colors hover:text-studio-accent">
        {STUDIO_CONTACT.email.label}
      </a>
    ),
  },
  {
    key: "hours",
    labelKey: "hoursLabel" as const,
    content: STUDIO_CONTACT.hours,
  },
  {
    key: "area",
    labelKey: "areaLabel" as const,
    content: STUDIO_CONTACT.address,
  },
] as const;

/** Master-aligned Contact section — Talk to the studio + compact form. */
export function StudioTalkSection() {
  const copy = STUDIO_PAGE_COPY.talk;

  return (
    <section
      id={HOME_SECTION_IDS.contact}
      className={`${STUDIO_DARK_SECTION_CLASS} ${HOME_SECTION_SCROLL_MARGIN_CLASS}`}
    >
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-14 lg:grid-cols-12 lg:gap-16`}>
        <StudioReveal className="lg:col-span-5">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[12ch] text-studio-fg">{copy.title}</h2>

          <dl className="mt-12 space-y-7">
            {CONTACT_DETAILS.map((detail) => (
              <div key={detail.key}>
                <dt className={DETAIL_LABEL_CLASS}>{copy[detail.labelKey]}</dt>
                <dd className={DETAIL_VALUE_CLASS}>{detail.content}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
            {STUDIO_CONTACT.social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={SOCIAL_LINK_CLASS}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </StudioReveal>

        <StudioReveal className="lg:col-span-7" delay={FORM_DELAY_MS}>
          <StudioTalkForm />
        </StudioReveal>
      </div>
    </section>
  );
}
