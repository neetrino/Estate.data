import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { StudioCta } from "@/features/home/sections/StudioCta";
import { StudioSectionLabel } from "@/features/home/sections/StudioSectionLabel";
import { StudioStartingAt } from "@/features/home/sections/StudioStartingAt";
import {
  STUDIO_CONTAINER_CLASS,
  STUDIO_PAGE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

export function WebPagesPlaceholderPage() {
  const copy = STUDIO_PAGE_COPY.webPages;

  return (
    <div className={`${STUDIO_PAGE_CLASS} min-h-[70dvh]`}>
      <main className={`${STUDIO_CONTAINER_CLASS} flex min-h-[70dvh] flex-col justify-center py-28`}>
        <StudioSectionLabel>{copy.eyebrow}</StudioSectionLabel>
        <h1 className="studio-display-lg mt-6 max-w-[18ch] text-studio-fg">{copy.title}</h1>
        <p className="studio-body-lg mt-6 max-w-[50ch]">{copy.body}</p>
        <StudioStartingAt price={copy.startingPrice} className="mt-6" />
        <div className="mt-10">
          <StudioCta href={STUDIO_PAGE_COPY.contactHref}>{copy.ctaLabel}</StudioCta>
        </div>
      </main>
    </div>
  );
}
