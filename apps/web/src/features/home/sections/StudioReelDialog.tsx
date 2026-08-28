"use client";

import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { STUDIO_SECONDARY_BUTTON_CLASS } from "@/features/home/sections/studioSectionStyles";

type StudioReelDialogProps = {
  readonly onClose: () => void;
};

export function StudioReelDialog({ onClose }: StudioReelDialogProps) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-studio-bg/90 p-6">
      <div className="relative w-full max-w-5xl">
        <button
          type="button"
          className={`${STUDIO_SECONDARY_BUTTON_CLASS} absolute -top-14 right-0`}
          onClick={onClose}
        >
          Close
        </button>
        <video
          className="w-full border border-studio-border"
          src={STUDIO_MEDIA.promo}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>
  );
}
