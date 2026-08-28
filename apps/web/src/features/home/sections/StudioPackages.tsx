"use client";

import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import type { PricingCategoryDto } from "@/server/features/pricing/pricing.schema";
import { StudioPackageCompare } from "@/features/home/sections/StudioPackageCompare";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
  STUDIO_PRIMARY_BUTTON_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

type StudioPackagesProps = {
  readonly category: PricingCategoryDto;
};

export function StudioPackages({ category }: StudioPackagesProps) {
  const copy = STUDIO_PAGE_COPY.packages;

  return (
    <section id={HOME_SECTION_IDS.packages} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h2 className={STUDIO_TITLE_CLASS}>{copy.title}</h2>
        <div className="mt-14 grid gap-px bg-studio-border md:grid-cols-2 xl:grid-cols-5">
          {category.packages.map((pkg) => (
            <article key={pkg.id} className="flex h-full flex-col bg-studio-card p-8">
              {pkg.badgeLabel ? (
                <p className="studio-label text-studio-accent">{pkg.badgeLabel}</p>
              ) : null}
              <h3 className="mt-4 font-display text-2xl font-bold">{pkg.name}</h3>
              {pkg.price !== "Custom" ? (
                <p className="studio-label mt-3 text-studio-muted">{copy.startingAt}</p>
              ) : null}
              <p className="mt-2 font-display text-4xl font-bold">{pkg.price}</p>
              <ul className="mt-8 flex-1 space-y-2 text-sm text-studio-muted">
                {pkg.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <HomeSectionLink
                href={pkg.bookHref}
                className={`${STUDIO_PRIMARY_BUTTON_CLASS} mt-8`}
              >
                {pkg.bookLabel}
                <span aria-hidden>→</span>
              </HomeSectionLink>
            </article>
          ))}
        </div>
        <StudioPackageCompare />
      </div>
    </section>
  );
}
