"use client";

import { useState } from "react";
import type { FaqItemDto } from "@/server/features/faq/faq.schema";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

type StudioFaqProps = {
  readonly items: readonly FaqItemDto[];
};

export function StudioFaq({ items }: StudioFaqProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section id={HOME_SECTION_IDS.faq} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{STUDIO_PAGE_COPY.faq.eyebrow}</p>
        <h2 className={STUDIO_TITLE_CLASS}>{STUDIO_PAGE_COPY.faq.title}</h2>
        <ul className="mt-10 divide-y divide-studio-border border border-studio-border bg-studio-card">
          {items.map((item) => {
            const open = openId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : item.id)}
                >
                  <span className="font-semibold text-studio-fg">{item.question}</span>
                  <span aria-hidden>{open ? "−" : "+"}</span>
                </button>
                {open ? (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-studio-muted">
                    {item.answer}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
