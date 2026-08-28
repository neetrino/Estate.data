"use client";

import Image from "next/image";
import { useState } from "react";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { MediaLightbox } from "@/shared/components/media/MediaLightbox";
import {
  STUDIO_BODY_CLASS,
  STUDIO_CONTAINER_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
  STUDIO_SECONDARY_BUTTON_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

export function StudioBeforeAfter() {
  const copy = STUDIO_PAGE_COPY.beforeAfter;
  const [openId, setOpenId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const active = copy.items.find((item) => item.id === openId);

  return (
    <section id={HOME_SECTION_IDS.beforeAfter} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h2 className={`${STUDIO_TITLE_CLASS} max-w-[16ch]`}>{copy.title}</h2>
        <p className={STUDIO_BODY_CLASS}>{copy.body}</p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {copy.items.map((item) => (
            <article key={item.id} className="overflow-hidden border border-studio-border bg-studio-card">
              <div className="grid grid-cols-2">
                <div className="relative aspect-[4/3]">
                  <Image src={item.beforeSrc} alt="" fill className="object-cover" sizes="50vw" />
                </div>
                <div className="relative aspect-[4/3]">
                  <Image src={item.afterSrc} alt="" fill className="object-cover" sizes="50vw" />
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <p className="font-semibold text-studio-fg">{item.label}</p>
                <button
                  type="button"
                  className={STUDIO_SECONDARY_BUTTON_CLASS}
                  onClick={() => {
                    setOpenId(item.id);
                    setIndex(0);
                  }}
                >
                  View More
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      {active ? (
        <MediaLightbox
          images={[active.beforeSrc, active.afterSrc]}
          alt={active.label}
          activeIndex={index}
          onIndexChange={setIndex}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </section>
  );
}
