import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import {
  STUDIO_BODY_CLASS,
  STUDIO_CONTAINER_CLASS,
  STUDIO_EYEBROW_CLASS,
  STUDIO_PAGE_CLASS,
  STUDIO_PRIMARY_BUTTON_CLASS,
  STUDIO_TITLE_CLASS,
} from "@/features/home/sections/studioSectionStyles";

export function WebPagesPlaceholderPage() {
  const copy = STUDIO_PAGE_COPY.webPages;

  return (
    <div className={`${STUDIO_PAGE_CLASS} min-h-[70dvh]`}>
      <main className={`${STUDIO_CONTAINER_CLASS} flex min-h-[70dvh] flex-col justify-center py-28`}>
        <p className={STUDIO_EYEBROW_CLASS}>{copy.eyebrow}</p>
        <h1 className={`${STUDIO_TITLE_CLASS} max-w-[16ch]`}>{copy.title}</h1>
        <p className={STUDIO_BODY_CLASS}>{copy.body}</p>
        <p className="studio-label mt-6 text-studio-accent">{copy.startingAt}</p>
        <div className="mt-10">
          <HomeSectionLink href={STUDIO_PAGE_COPY.contactHref} className={STUDIO_PRIMARY_BUTTON_CLASS}>
            {copy.ctaLabel}
            <span aria-hidden>→</span>
          </HomeSectionLink>
        </div>
      </main>
    </div>
  );
}
