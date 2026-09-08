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

const TRIGGER_CLASS = [
  "flex w-full items-center justify-between gap-4 py-5 text-left",
  "font-display text-base tracking-tight text-studio-fg",
].join(" ");

const ANSWER_CLASS = "max-w-[70ch] pb-6 text-sm leading-relaxed text-studio-muted";

const LIST_DELAY_MS = 80;

type StudioFaqProps = {
  readonly items: readonly FaqItemDto[];
};

export function StudioFaq({ items }: StudioFaqProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id={HOME_SECTION_IDS.faq}
      className={`${STUDIO_LIGHT_SECTION_CLASS} border-t border-studio-border`}
    >
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
        <StudioReveal className="lg:col-span-4">
          <StudioSectionLabel>{STUDIO_PAGE_COPY.faq.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 text-studio-fg">{STUDIO_PAGE_COPY.faq.title}</h2>
        </StudioReveal>
        <StudioReveal className="lg:col-span-8" delay={LIST_DELAY_MS}>
          <ul className="w-full">
            {items.map((item) => {
              const open = openId === item.id;
              return (
                <li key={item.id} className="border-b border-studio-border">
                  <button
                    type="button"
                    className={TRIGGER_CLASS}
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    {item.question}
                    <span aria-hidden className="text-studio-accent">
                      {open ? "−" : "+"}
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
