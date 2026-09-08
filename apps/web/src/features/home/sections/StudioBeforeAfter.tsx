import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { StudioCompareSlider } from "@/features/home/sections/StudioCompareSlider";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const ITEM_DELAY_STEP_MS = 100;

export function StudioBeforeAfter() {
  const copy = STUDIO_PAGE_COPY.beforeAfter;

  return (
    <section id={HOME_SECTION_IDS.beforeAfter} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <StudioReveal>
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{copy.title}</h2>
          <p className="studio-body-lg mt-6 max-w-[52ch]">{copy.body}</p>
        </StudioReveal>
        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {copy.items.map((item, index) => (
            <StudioReveal key={item.id} delay={index * ITEM_DELAY_STEP_MS}>
              <StudioCompareSlider
                id={item.id}
                beforeSrc={item.beforeSrc}
                afterSrc={item.afterSrc}
                beforeAlt={item.beforeAlt}
                afterAlt={item.afterAlt}
                sliderLabel={copy.sliderLabel}
                beforeLabel={copy.beforeLabel}
                afterLabel={copy.afterLabel}
              />
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-studio-muted">
                {item.label}
              </p>
            </StudioReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
