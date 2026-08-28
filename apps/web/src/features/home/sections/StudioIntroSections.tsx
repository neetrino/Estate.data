"use client";

import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import {
  STUDIO_BODY_CLASS,
  STUDIO_CONTAINER_CLASS,
  STUDIO_DARK_SECTION_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
  STUDIO_PRIMARY_BUTTON_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";
import Image from "next/image";
import Link from "next/link";

export function StudioStats() {
  return (
    <section className="border-y border-studio-border bg-studio-card py-16">
      <div className={`${STUDIO_CONTAINER_CLASS} grid gap-10 sm:grid-cols-2 lg:grid-cols-5`}>
        {STUDIO_PAGE_COPY.stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-4xl font-bold tracking-tight text-studio-fg md:text-5xl">
              {stat.value}
            </p>
            <p className="studio-label mt-3 text-studio-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function StudioOfferings() {
  const copy = STUDIO_PAGE_COPY.offerings;

  return (
    <section className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h2 className={`${STUDIO_TITLE_CLASS} max-w-[16ch]`}>{copy.title}</h2>
        <ul className="mt-14 grid gap-px bg-studio-border sm:grid-cols-2 lg:grid-cols-4">
          {copy.items.map((item) => (
            <li key={item.id} className="bg-studio-card p-8">
              <p className="studio-label text-studio-accent">{item.id}</p>
              <h3 className="mt-6 font-display text-2xl font-bold text-studio-fg">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-studio-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function StudioWebPagesTeaser() {
  const copy = STUDIO_PAGE_COPY.webPages;

  return (
    <section id={HOME_SECTION_IDS.webPagesTeaser} className={STUDIO_DARK_SECTION_CLASS}>
      <div className={`${STUDIO_CONTAINER_CLASS} grid items-center gap-10 lg:grid-cols-2`}>
        <div>
          <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
          <h2 className={`${STUDIO_TITLE_CLASS} max-w-[16ch]`}>{copy.title}</h2>
          <p className={STUDIO_BODY_CLASS}>{copy.body}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {copy.included.map((item) => (
            <li key={item} className="text-sm text-studio-muted">
              {item}
            </li>
          ))}
        </ul>
        <dl className="mt-6 max-w-xl space-y-2">
          {copy.pricing.map((row) => (
            <div key={row.label} className="flex justify-between gap-4 text-sm">
              <dt className="text-studio-muted">{row.label}</dt>
              <dd className="font-semibold text-studio-fg">{row.price}</dd>
            </div>
          ))}
        </dl>
        <p className="studio-label mt-6 text-studio-accent">{copy.startingAt}</p>
          <Link href={copy.href} className={`${STUDIO_PRIMARY_BUTTON_CLASS} mt-10`}>
            {copy.ctaLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={STUDIO_MEDIA.landingPage}
            alt="Single-property real estate landing page shown on a laptop and phone"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
