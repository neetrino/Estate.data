import Image from "next/image";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { StudioServiceAreaMap } from "@/features/home/sections/StudioServiceAreaMap";
import {
  STUDIO_BODY_CLASS,
  STUDIO_CONTAINER_CLASS,
  STUDIO_DARK_SECTION_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
  STUDIO_SECONDARY_BUTTON_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

export function StudioProcess() {
  const copy = STUDIO_PAGE_COPY.process;

  return (
    <section id={HOME_SECTION_IDS.process} className={STUDIO_LIGHT_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h2 className={STUDIO_TITLE_CLASS}>{copy.title}</h2>
        <ol className="mt-14 grid gap-px bg-studio-border sm:grid-cols-2 lg:grid-cols-5">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="bg-studio-bg p-6">
              <p className="studio-label text-studio-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-studio-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StudioWhyUs() {
  const copy = STUDIO_PAGE_COPY.whyUs;

  return (
    <section id={HOME_SECTION_IDS.whyUs} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h2 className={`${STUDIO_TITLE_CLASS} max-w-[14ch]`}>{copy.title}</h2>
        <p className={STUDIO_BODY_CLASS}>{copy.body}</p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {copy.tags.map((tag) => (
            <li
              key={tag}
              className="border border-studio-border px-4 py-2 text-xs uppercase tracking-[0.16em] text-studio-muted"
            >
              {tag}
            </li>
          ))}
        </ul>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {copy.points.map((point, index) => (
            <li key={point}>
              <p className="studio-label text-studio-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 text-sm text-studio-fg">{point}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function StudioTeam() {
  const copy = STUDIO_PAGE_COPY.studio;

  return (
    <section id={HOME_SECTION_IDS.studio} className={STUDIO_DARK_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h2 className={STUDIO_TITLE_CLASS}>{copy.title}</h2>
        <p className={STUDIO_BODY_CLASS}>{copy.body}</p>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden">
          <Image
            src={STUDIO_MEDIA.team}
            alt="ESTATEDATA.CLOUD production crew on location at a Los Angeles property shoot"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <ul className="mt-14 grid gap-px bg-studio-border sm:grid-cols-2 lg:grid-cols-3">
          {STUDIO_PAGE_COPY.team.map((member) => (
            <li key={member.name} className="bg-studio-card p-8">
              <p className="studio-label text-studio-accent">{member.initials}</p>
              <h3 className="mt-6 font-display text-xl font-bold">{member.name}</h3>
              <p className="mt-2 text-sm text-studio-accent">{member.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-studio-muted">{member.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StudioServiceArea() {
  const copy = STUDIO_PAGE_COPY.serviceArea;
  const surroundingLabel = copy.cities[copy.cities.length - 1];

  return (
    <section id={HOME_SECTION_IDS.serviceArea} className={STUDIO_LIGHT_SECTION_CLASS}>
      <div
        className={`${STUDIO_CONTAINER_CLASS} grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-16`}
      >
        <div>
          <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
          <h2 className={STUDIO_TITLE_CLASS}>{copy.title}</h2>
          <p className={STUDIO_BODY_CLASS}>{copy.body}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {copy.cities.map((city) => (
              <li
                key={city}
                className={`border px-4 py-2 text-sm text-studio-fg ${
                  city === surroundingLabel ? "border-studio-accent" : "border-studio-border"
                }`}
              >
                {city}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-studio-muted">{copy.note}</p>
          <HomeSectionLink
            href={`/#${HOME_SECTION_IDS.contact}`}
            className={`${STUDIO_SECONDARY_BUTTON_CLASS} mt-8`}
          >
            {copy.cta}
            <span aria-hidden>→</span>
          </HomeSectionLink>
        </div>
        <StudioServiceAreaMap />
      </div>
    </section>
  );
}
