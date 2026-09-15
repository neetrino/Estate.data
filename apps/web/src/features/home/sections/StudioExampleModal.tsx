"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { requestContactService } from "@/features/contact/lib/contactServicePrefill";
import { STUDIO_EXAMPLE_MODAL_COPY } from "@/features/home/content/studioPageCopy";
import { studioServiceExample } from "@/features/home/content/studioServiceExamples";
import type { StudioServiceContent } from "@/features/home/content/studioServicesCopy";
import { studioServiceContactValue } from "@/features/home/lib/studioServiceContactValue";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { homeSectionHref, HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";
import "./studio-example-modal.css";

function subscribeNever(): () => void {
  return () => undefined;
}

function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

const OVERLAY_CLASS = "fixed inset-0 z-[200] bg-black/80";

/**
 * Dialog box size is fixed (max-w-3xl + 16/10 media slot).
 * Only the editing loft portrait is fitted with contain so the full photo shows.
 */
const PANEL_CLASS = [
  "fixed left-1/2 top-1/2 z-[201] flex w-[min(100%-1.5rem,48rem)] max-h-[90vh]",
  "-translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden",
  "border border-studio-border bg-studio-bg p-0 shadow-lg sm:rounded-lg",
].join(" ");

const MEDIA_CLASS = "studio-example-modal__media";

const MEDIA_IMAGE_COVER_CLASS = "studio-example-modal__img--cover";

/** Editing loft only: full portrait inside the fixed media slot. */
const MEDIA_IMAGE_CONTAIN_CLASS = "studio-example-modal__img--contain";

const CLOSE_BUTTON_CLASS = [
  "absolute right-3 top-3 z-20 flex size-7 items-center justify-center sm:right-4 sm:top-4",
  "rounded-sm bg-studio-accent text-studio-accent-fg",
  "opacity-90 transition-opacity hover:opacity-100",
  "focus:outline-none focus:ring-2 focus:ring-studio-accent focus:ring-offset-2 focus:ring-offset-studio-bg",
].join(" ");

const BODY_CLASS = "shrink-0 px-6 pb-6 pt-5 md:px-10 md:pb-8";

const TITLE_CLASS = [
  "font-display text-[clamp(1.35rem,2.2vw,1.875rem)] font-bold",
  "leading-snug tracking-tight text-studio-fg",
].join(" ");

const SUMMARY_CLASS = "mt-2.5 text-sm leading-relaxed text-studio-muted";

const HIGHLIGHT_LIST_CLASS = "mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2";

const HIGHLIGHT_ITEM_CLASS = "flex gap-3 text-sm text-studio-muted";

const HIGHLIGHT_DASH_CLASS = "mt-2.5 h-px w-3 shrink-0 bg-studio-accent/70";

const CTA_CLASS = [
  "mt-7 inline-flex items-center gap-3 bg-studio-accent px-7 py-3.5",
  "text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-studio-accent-fg",
  "transition-colors hover:bg-studio-accent/85",
].join(" ");

const BODY_LOCK_CLASS = "overflow-hidden";

const DEFAULT_CTA_HREF = homeSectionHref(HOME_SECTION_IDS.quote);

function isEditingLoftExample(sectionKey: string, imageUrl: string): boolean {
  return sectionKey === HOME_SECTION_IDS.editing || imageUrl.includes("portfolio-3");
}

type StudioExampleModalProps = {
  readonly service: Pick<
    StudioServiceContent,
    "sectionKey" | "eyebrow" | "title" | "description" | "imageUrl" | "included" | "primaryCtaHref"
  >;
  readonly onClose: () => void;
};

/** Service example popup — editing loft shows the full portrait inside the fixed box. */
export function StudioExampleModal({ service, onClose }: StudioExampleModalProps) {
  const example = studioServiceExample(service.sectionKey, service);
  const isClient = useIsClient();
  const ctaHref = service.primaryCtaHref || DEFAULT_CTA_HREF;
  const imageSrc = normalizePublicAssetUrl(example.imageUrl);
  const showFullImage = isEditingLoftExample(service.sectionKey, example.imageUrl);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.classList.add(BODY_LOCK_CLASS);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove(BODY_LOCK_CLASS);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  function handleCtaNavigate() {
    requestContactService(studioServiceContactValue(service.sectionKey));
    onClose();
  }

  if (!isClient) {
    return null;
  }

  return createPortal(
    <>
      <button
        type="button"
        className={OVERLAY_CLASS}
        aria-label={STUDIO_EXAMPLE_MODAL_COPY.closeLabel}
        onClick={onClose}
      />

      <div role="dialog" aria-modal aria-label={example.title} className={PANEL_CLASS}>
        <button
          type="button"
          className={CLOSE_BUTTON_CLASS}
          aria-label={STUDIO_EXAMPLE_MODAL_COPY.closeLabel}
          onClick={onClose}
        >
          <X className="h-4 w-4" strokeWidth={2} aria-hidden />
        </button>

        <div className={MEDIA_CLASS}>
          {example.embedUrl ? (
            <iframe
              title={example.title}
              src={example.embedUrl}
              loading="lazy"
              allow="xr-spatial-tracking; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element -- portal dialog matches master <img>
            <img
              src={imageSrc}
              alt={example.title}
              width={showFullImage ? 1200 : 1400}
              height={showFullImage ? 1500 : 875}
              loading="lazy"
              className={showFullImage ? MEDIA_IMAGE_CONTAIN_CLASS : MEDIA_IMAGE_COVER_CLASS}
            />
          )}
        </div>

        <div className={BODY_CLASS}>
          <h3 className={TITLE_CLASS}>{example.title}</h3>
          <p className={SUMMARY_CLASS}>{example.summary}</p>

          <ul className={HIGHLIGHT_LIST_CLASS}>
            {example.highlights.map((highlight) => (
              <li key={highlight} className={HIGHLIGHT_ITEM_CLASS}>
                <span aria-hidden className={HIGHLIGHT_DASH_CLASS} />
                {highlight}
              </li>
            ))}
          </ul>

          <HomeSectionLink href={ctaHref} className={CTA_CLASS} onNavigate={handleCtaNavigate}>
            {STUDIO_EXAMPLE_MODAL_COPY.ctaLabel}
            <span aria-hidden>→</span>
          </HomeSectionLink>
        </div>
      </div>
    </>,
    document.body,
  );
}
