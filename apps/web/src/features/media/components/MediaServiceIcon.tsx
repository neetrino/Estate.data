import type { ReactNode } from "react";
import type { MediaServiceIconId } from "@/features/media/content/mediaServicesCopy";

const MEDIA_SERVICE_ICON_BOX_CLASS =
  "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-black/50 text-property-intelligence-accent ring-1 ring-property-intelligence-accent/50 shadow-[0_0_14px_rgba(22,192,218,0.4)]";

const MEDIA_SERVICE_ICON_SVG_CLASS = "size-6";

type MediaServiceIconProps = {
  icon: MediaServiceIconId;
};

export function MediaServiceIcon({ icon }: MediaServiceIconProps) {
  return (
    <span className={MEDIA_SERVICE_ICON_BOX_CLASS} aria-hidden>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={MEDIA_SERVICE_ICON_SVG_CLASS}
      >
        {ICON_PATHS[icon]}
      </svg>
    </span>
  );
}

const ICON_PATHS: Record<MediaServiceIconId, ReactNode> = {
  photography: (
    <>
      <path d="M4 8h4l2-2h4l2 2h4v10H4V8z" />
      <circle cx="12" cy="13" r="3" />
    </>
  ),
  "cinematic-video": (
    <>
      <rect x="3" y="7" width="14" height="10" rx="2" />
      <path d="M17 10l4-2v8l-4-2" />
    </>
  ),
  "drone-aerial": (
    <>
      <path d="M12 14v4" />
      <path d="M8 12l-4-2M16 12l4-2" />
      <path d="M6 10l2-4M18 10l-2-4" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  "tours-floorplans": (
    <>
      <path d="M12 4 4 8v8l8 4 8-4V8l-8-4z" />
      <path d="M4 8l8 4 8-4M12 12v8" />
    </>
  ),
  staging: (
    <>
      <path d="M12 3v3" />
      <path d="m8.5 8.5-2-2M15.5 8.5l2-2" />
      <path d="M6 14l-1 4h14l-1-4" />
      <path d="M9 14h6" />
    </>
  ),
  "listing-websites": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </>
  ),
};
