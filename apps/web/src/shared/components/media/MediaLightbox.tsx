"use client";

import Image from "next/image";
import { useEffect } from "react";

type MediaLightboxProps = {
  readonly images: readonly string[];
  readonly startIndex?: number;
  readonly alt: string;
  readonly onClose: () => void;
  readonly onIndexChange?: (index: number) => void;
  readonly activeIndex: number;
};

const OVERLAY_CLASS =
  "fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-8";

/** Full-screen image gallery popup for View More / View Example. */
export function MediaLightbox({
  images,
  alt,
  onClose,
  onIndexChange,
  activeIndex,
}: MediaLightboxProps) {
  const image = images[activeIndex] ?? images[0];

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key === "ArrowRight") {
        onIndexChange?.(nextIndex(activeIndex, images.length));
      }
      if (event.key === "ArrowLeft") {
        onIndexChange?.(prevIndex(activeIndex, images.length));
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, images.length, onClose, onIndexChange]);

  if (!image) {
    return null;
  }

  return (
    <div className={OVERLAY_CLASS} role="dialog" aria-modal aria-label="Media gallery">
      <button
        type="button"
        className="absolute inset-0 cursor-zoom-out"
        aria-label="Close gallery"
        onClick={onClose}
      />
      <div className="relative z-10 flex w-full max-w-5xl flex-col gap-4">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
          <Image src={image} alt={alt} fill className="object-contain" sizes="100vw" />
        </div>
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="rounded-full bg-white/15 px-4 py-2 text-sm text-white"
            onClick={() => onIndexChange?.(prevIndex(activeIndex, images.length))}
          >
            Previous
          </button>
          <p className="text-sm text-white/80">
            {activeIndex + 1} / {images.length}
          </p>
          <button
            type="button"
            className="rounded-full bg-white/15 px-4 py-2 text-sm text-white"
            onClick={() => onIndexChange?.(nextIndex(activeIndex, images.length))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function nextIndex(current: number, length: number): number {
  return current === length - 1 ? 0 : current + 1;
}

function prevIndex(current: number, length: number): number {
  return current === 0 ? length - 1 : current - 1;
}
