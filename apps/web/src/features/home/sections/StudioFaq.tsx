"use client";

import { useState } from "react";
import type { FaqItemDto } from "@/server/features/faq/faq.schema";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_LIGHT_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const ITEM_CLASS = "border-b border-studio-border";

const ITEM_OPEN_CLASS = "border border-studio-accent/70 bg-transparent";

const TRIGGER_CLASS = [
  "flex w-full items-center justify-between gap-4 px-0 py-5 text-left",
  "font-display text-base tracking-tight text-studio-fg",
  "transition-colors hover:text-studio-accent",
].join(" ");

const TRIGGER_OPEN_CLASS = "px-4";

const ANSWER_CLASS = "max-w-[70ch] px-4 pb-6 text-sm leading-relaxed text-studio-muted";

const CHEVRON_CLASS = "shrink-0 text-sm text-studio-muted transition-transform duration-200";

const LIST_DELAY_MS = 80;

type StudioFaqProps = {
  readonly items: readonly FaqItemDto[];
};

/** Home FAQ accordion — published items from Admin → FAQ. */
export function StudioFaq({ items }: StudioFaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      id={HOME_SECTION_IDS.faq}
      className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}
    >
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <StudioReveal className="lg:col-span-4">
          <StudioSectionLabel>{STUDIO_PAGE_COPY.faq.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[12ch] text-studio-fg">
            {STUDIO_PAGE_COPY.faq.title}
          </h2>
        </StudioReveal>
        <StudioReveal className="lg:col-span-8" delay={LIST_DELAY_MS}>
          <ul className="w-full">
            {items.map((item) => {
              const open = openId === item.id;
              return (
                <li key={item.id} className={open ? ITEM_OPEN_CLASS : ITEM_CLASS}>
                  <button
                    type="button"
                    className={`${TRIGGER_CLASS} ${open ? TRIGGER_OPEN_CLASS : ""}`}
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span
                      aria-hidden
                      className={`${CHEVRON_CLASS} ${open ? "rotate-180 text-studio-accent" : ""}`}
                    >
                      ▾
                    </span>
                  </button>
                  {open ? <p className={ANSWER_CLASS}>{item.answer}</p> : null}
                </li>
              );
            })}
          </ul>
        </StudioReveal>
      </div>
    </section>
  );
}
