"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { STUDIO_HERO_SECONDARY_BUTTON_CLASS } from "@/features/home/sections/studioSectionStyles";

const OVERLAY_CLASS =
  "fixed inset-0 z-[300] flex items-center justify-center bg-studio-bg/90 p-6";
const BODY_LOCK_CLASS = "overflow-hidden";

type StudioReelDialogProps = {
  readonly onClose: () => void;
};

function subscribeNever(): () => void {
  return () => undefined;
}

function useIsClient(): boolean {
  return useSyncExternalStore(subscribeNever, () => true, () => false);
}

export function StudioReelDialog({ onClose }: StudioReelDialogProps) {
  const isClient = useIsClient();

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

  if (!isClient) {
    return null;
  }

  return createPortal(
    <div
      className={OVERLAY_CLASS}
      role="dialog"
      aria-modal
      aria-label="Watch the reel"
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          className={`${STUDIO_HERO_SECONDARY_BUTTON_CLASS} absolute -top-14 right-0`}
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
    </div>,
    document.body,
  );
}
