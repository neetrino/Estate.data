import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import type { PricingCategoryDto, PricingPackageDto } from "@/server/features/pricing/pricing.schema";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioReveal } from "@/features/home/sections/StudioReveal";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_MUTED_SECTION_CLASS,
} from "@/features/home/sections/studioSectionStyles";

const CUSTOM_PRICE_LABEL = "Custom";

const CARD_DELAY_STEP_MS = 80;

const CARD_BASE_CLASS =
  "flex flex-col bg-studio-card p-8 transition-colors duration-500 hover:bg-studio-bg";

const FEATURE_ITEM_CLASS = "flex gap-3 text-sm text-studio-muted";

const FEATURE_DASH_CLASS = "mt-2 h-px w-3 shrink-0 bg-studio-accent/70";

const TAG_CLASS = "border border-studio-border px-4 py-2 text-xs text-studio-muted";

type StudioPackagesProps = {
  readonly category: PricingCategoryDto;
};

function PackageCard({ pkg, delay }: { readonly pkg: PricingPackageDto; readonly delay: number }) {
  const copy = STUDIO_PAGE_COPY.packages;

  return (
    <StudioReveal
      as="article"
      delay={delay}
      className={`${CARD_BASE_CLASS} ${pkg.highlighted ? "bg-studio-bg" : ""}`.trim()}
    >
      {pkg.badgeLabel ? (
        <span className="studio-label mb-6 text-studio-accent">{pkg.badgeLabel}</span>
      ) : null}
      <h3 className="font-display text-sm uppercase tracking-[0.26em]">{pkg.name}</h3>
      <p className="mt-6 text-xs uppercase tracking-[0.2em] text-studio-muted">{copy.startingAt}</p>
      <p className="font-display text-5xl tracking-tight">{pkg.price}</p>
      <ul className="mt-8 flex-1 space-y-2.5">
        {pkg.features.map((feature) => (
          <li key={feature} className={FEATURE_ITEM_CLASS}>
            <span aria-hidden className={FEATURE_DASH_CLASS} />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-10">
        <StudioCta
          href={pkg.bookHref}
          variant={pkg.highlighted ? "solid" : "outline"}
          className="w-full"
        >
          {pkg.bookLabel}
        </StudioCta>
      </div>
    </StudioReveal>
  );
}

function CustomPackageCard({ pkg }: { readonly pkg: PricingPackageDto }) {
  const copy = STUDIO_PAGE_COPY.packages;

  return (
    <StudioReveal className="mt-px grid gap-8 bg-studio-bg p-8 lg:grid-cols-12 lg:p-12">
      <div className="lg:col-span-5">
        <h3 className="font-display text-sm uppercase tracking-[0.26em]">{pkg.name}</h3>
        <p className="mt-6 font-display text-5xl">{pkg.price}</p>
        <p className="mt-6 max-w-[38ch] text-sm text-studio-muted">{copy.customDescription}</p>
        <div className="mt-8">
          <StudioCta href={pkg.bookHref}>{pkg.bookLabel}</StudioCta>
        </div>
      </div>
      <div className="lg:col-span-7">
        <p className="studio-label mb-5 text-studio-muted">{copy.builtForLabel}</p>
        <ul className="flex flex-wrap gap-2">
          {pkg.features.map((feature) => (
            <li key={feature} className={TAG_CLASS}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </StudioReveal>
  );
}

export function StudioPackages({ category }: StudioPackagesProps) {
  const copy = STUDIO_PAGE_COPY.packages;
  const standardPackages = category.packages.filter((pkg) => pkg.price !== CUSTOM_PRICE_LABEL);
  const customPackage = category.packages.find((pkg) => pkg.price === CUSTOM_PRICE_LABEL);

  return (
    <section id={HOME_SECTION_IDS.packages} className={STUDIO_MUTED_SECTION_CLASS}>
      <div className={STUDIO_CONTAINER_CLASS}>
        <StudioReveal>
          <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
          <h2 className="studio-display-lg mt-6 max-w-[18ch] text-studio-fg">{copy.title}</h2>
        </StudioReveal>
        <div className="mt-16 grid gap-px bg-studio-border md:grid-cols-2 xl:grid-cols-4">
          {standardPackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} delay={index * CARD_DELAY_STEP_MS} />
          ))}
        </div>
        {customPackage ? <CustomPackageCard pkg={customPackage} /> : null}
      </div>
    </section>
  );
}
