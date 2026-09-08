import Image from "next/image";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { SITE_NAME } from "@/shared/components/navbar/navConfig";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioServiceAreaMap } from "@/features/home/sections/StudioServiceAreaMap";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const SPLIT_GRID_CLASS = "grid gap-12 lg:grid-cols-12 lg:gap-16";

const TAG_CLASS = "border border-studio-border px-3 py-1.5 text-xs text-studio-muted";

const STEP_DELAY_STEP_MS = 70;

const STATEMENT_DELAY_STEP_MS = 80;

const MEMBER_DELAY_STEP_MS = 60;

const MEDIA_DELAY_MS = 100;

function stepNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function StudioProcess() {
  const copy = STUDIO_PAGE_COPY.process;

  return (
    <section
      id={HOME_SECTION_IDS.process}
      className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}
    >
      <div className={STUDIO_CONTAINER_CLASS}>
        <StudioReveal>
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[16ch] text-studio-fg">{copy.title}</h2>
        </StudioReveal>
        <ol className="mt-16 grid gap-px bg-studio-border md:grid-cols-3 lg:grid-cols-5">
          {copy.steps.map((step, index) => (
            <StudioReveal
              key={step.title}
              as="li"
              delay={index * STEP_DELAY_STEP_MS}
              className="bg-studio-bg p-8"
            >
              <span className="font-display text-4xl text-studio-accent/70">
                {stepNumber(index)}
              </span>
              <h3 className="mt-8 font-display text-sm uppercase tracking-[0.24em]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-studio-muted">{step.body}</p>
            </StudioReveal>
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
      <div className={`${STUDIO_CONTAINER_CLASS} ${SPLIT_GRID_CLASS}`}>
        <StudioReveal className="lg:col-span-5">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{copy.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[44ch]">{copy.body}</p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {copy.tags.map((tag) => (
              <li key={tag} className={TAG_CLASS}>
                {tag}
              </li>
            ))}
          </ul>
        </StudioReveal>
        <div className="lg:col-span-7">
          {copy.points.map((point, index) => (
            <StudioReveal
              key={point}
              delay={index * STATEMENT_DELAY_STEP_MS}
              className="flex items-baseline gap-6 border-t border-studio-border py-6 first:border-t-0"
            >
              <span className="studio-label text-studio-accent">{stepNumber(index)}</span>
              <p className="font-display text-2xl uppercase tracking-tight md:text-4xl">{point}</p>
            </StudioReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StudioTeam() {
  const copy = STUDIO_PAGE_COPY.studio;

  return (
    <section
      id={HOME_SECTION_IDS.studio}
      className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}
    >
      <div className={STUDIO_CONTAINER_CLASS}>
        <div className={SPLIT_GRID_CLASS}>
          <StudioReveal className="lg:col-span-5">
            <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
            <h2 className="studio-display-lg mt-6 text-studio-fg">{copy.title}</h2>
            <p className="studio-body-lg mt-6 max-w-[46ch]">{copy.body}</p>
          </StudioReveal>
          <StudioReveal className="lg:col-span-7" delay={MEDIA_DELAY_MS}>
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={STUDIO_MEDIA.team}
                alt={`${SITE_NAME} production crew on location at a Los Angeles property shoot`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </StudioReveal>
        </div>
        <ul className="mt-16 grid gap-px bg-studio-border sm:grid-cols-2 lg:grid-cols-4">
          {STUDIO_PAGE_COPY.team.map((member, index) => (
            <StudioReveal
              key={member.name}
              as="li"
              delay={index * MEMBER_DELAY_STEP_MS}
              className="bg-studio-bg p-8"
            >
              <div className="flex h-16 w-16 items-center justify-center border border-studio-border font-display text-sm tracking-[0.18em] text-studio-accent">
                {member.initials}
              </div>
              <h3 className="mt-6 font-display text-lg">{member.name}</h3>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-studio-accent">
                {member.role}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-studio-muted">{member.bio}</p>
            </StudioReveal>
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
    <section id={HOME_SECTION_IDS.serviceArea} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={`${STUDIO_CONTAINER_CLASS} ${SPLIT_GRID_CLASS}`}>
        <StudioReveal className="lg:col-span-5">
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{copy.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[44ch]">{copy.body}</p>
          <ul className="mt-10 flex flex-wrap gap-2">
            {copy.cities.map((city) => (
              <li
                key={city}
                className={
                  city === surroundingLabel
                    ? "border border-studio-accent/50 px-3 py-1.5 text-xs text-studio-accent"
                    : TAG_CLASS
                }
              >
                {city}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-studio-muted">{copy.note}</p>
          <div className="mt-8">
            <StudioCta href={`/#${HOME_SECTION_IDS.contact}`} variant="outline">
              {copy.cta}
            </StudioCta>
          </div>
        </StudioReveal>
        <StudioReveal className="lg:col-span-7" delay={MEDIA_DELAY_MS}>
          <StudioServiceAreaMap />
        </StudioReveal>
      </div>
    </section>
  );
}
