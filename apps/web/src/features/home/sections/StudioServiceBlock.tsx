"use client";

import Image from "next/image";
import { useState } from "react";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import {
  HOME_SECTION_SCROLL_MARGIN_CLASS,
} from "@/shared/lib/homeSectionIds";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { MediaLightbox } from "@/shared/components/media/MediaLightbox";
import {
  STUDIO_BODY_CLASS,
  STUDIO_CONTAINER_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_PRIMARY_BUTTON_CLASS,
  STUDIO_SECONDARY_BUTTON_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

type StudioServiceBlockProps = {
  readonly service: StudioServiceContent;
  readonly imageOnRight?: boolean;
};

export function StudioServiceBlock({ service, imageOnRight = false }: StudioServiceBlockProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  return (
    <section
      id={service.sectionKey}
      className={`relative isolate border-t border-studio-border bg-studio-bg py-20 md:py-32 ${HOME_SECTION_SCROLL_MARGIN_CLASS}`}
    >
      <div
        className={`${STUDIO_CONTAINER_CLASS} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
      >
        <div className={imageOnRight ? "lg:order-1" : "lg:order-2"}>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={service.imageUrl}
              alt={service.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <div className={imageOnRight ? "lg:order-2" : "lg:order-1"}>
          <p className={STUDIO_EYEBROW_CLASS}>{service.eyebrow}</p>
          <h2 className={STUDIO_TITLE_CLASS}>{service.title}</h2>
          <p className={STUDIO_BODY_CLASS}>{service.description}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {service.included.map((item) => (
              <li key={item} className="text-sm text-studio-muted">
                {item}
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2">
            {service.pricing.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 text-sm">
                <dt className="text-studio-muted">{row.label}</dt>
                <dd className="font-semibold text-studio-fg">{row.price}</dd>
              </div>
            ))}
          </dl>
          {service.startingAt ? (
            <p className="studio-label mt-6 text-studio-accent">{service.startingAt}</p>
          ) : null}
          {service.footnote ? (
            <p className="mt-4 max-w-[50ch] text-xs leading-relaxed text-studio-muted">
              {service.footnote}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <HomeSectionLink
              href={service.primaryCtaHref}
              className={STUDIO_PRIMARY_BUTTON_CLASS}
            >
              {service.primaryCtaLabel}
              <span aria-hidden>→</span>
            </HomeSectionLink>
            <button
              type="button"
              className={STUDIO_SECONDARY_BUTTON_CLASS}
              onClick={() => {
                setGalleryIndex(0);
                setGalleryOpen(true);
              }}
            >
              {service.secondaryCtaLabel}↗
            </button>
          </div>
        </div>
      </div>

      {galleryOpen ? (
        <MediaLightbox
          images={service.galleryUrls}
          alt={service.title}
          activeIndex={galleryIndex}
          onIndexChange={setGalleryIndex}
          onClose={() => setGalleryOpen(false)}
        />
      ) : null}
    </section>
  );
}
