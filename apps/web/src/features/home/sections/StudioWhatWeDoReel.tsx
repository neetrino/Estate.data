"use client";

import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";

const REEL_FRAME_CLASS =
  "relative aspect-video w-full overflow-hidden border border-studio-border bg-studio-card";

const REEL_BADGE_CLASS =
  "absolute left-4 top-4 z-10 bg-studio-bg px-3 py-2 studio-label text-studio-fg";

type StudioWhatWeDoReelProps = {
  readonly label: string;
  readonly onOpen: () => void;
};

function bindReelAutoplay(node: HTMLVideoElement | null): void {
  if (!node) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    node.pause();
  }
}

export function StudioWhatWeDoReel({ label, onOpen }: StudioWhatWeDoReelProps) {
  return (
    <div className={REEL_FRAME_CLASS}>
      <video
        ref={bindReelAutoplay}
        className="absolute inset-0 size-full object-cover"
        src={STUDIO_MEDIA.promo}
        poster={STUDIO_MEDIA.landingPage}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-hidden
      />
      <button type="button" className="absolute inset-0" onClick={onOpen} aria-label={label}>
        <span className={REEL_BADGE_CLASS}>{label}</span>
      </button>
    </div>
  );
}
