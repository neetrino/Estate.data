"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent } from "react";

const FRAME_CLASS = "relative aspect-[3/2] w-full touch-pan-y select-none overflow-hidden";

const IMAGE_CLASS = "object-cover";

const BADGE_CLASS = "studio-label absolute top-4 bg-studio-bg/75 px-2 py-1";

const HANDLE_CLASS = [
  "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2",
  "items-center justify-center border border-studio-accent bg-studio-bg",
  "text-xs text-studio-accent",
].join(" ");

const INITIAL_POSITION = 50;

const MIN_POSITION = 0;

const MAX_POSITION = 100;

const PRIMARY_BUTTON_MASK = 1;

type StudioCompareSliderProps = {
  readonly id: string;
  readonly beforeSrc: string;
  readonly afterSrc: string;
  readonly beforeAlt: string;
  readonly afterAlt: string;
  readonly sliderLabel: string;
  readonly beforeLabel: string;
  readonly afterLabel: string;
};

/** Drag or keyboard-driven before/after wipe. */
export function StudioCompareSlider({
  id,
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  sliderLabel,
  beforeLabel,
  afterLabel,
}: StudioCompareSliderProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(INITIAL_POSITION);

  const moveTo = (clientX: number): void => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    const ratio = ((clientX - bounds.left) / bounds.width) * MAX_POSITION;
    setPosition(Math.min(MAX_POSITION, Math.max(MIN_POSITION, ratio)));
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.buttons === PRIMARY_BUTTON_MASK) {
      moveTo(event.clientX);
    }
  };

  return (
    <div
      ref={frameRef}
      className={FRAME_CLASS}
      onPointerMove={handlePointerMove}
      onPointerDown={(event) => moveTo(event.clientX)}
    >
      <Image src={afterSrc} alt={afterAlt} fill className={IMAGE_CLASS} sizes="(max-width: 1024px) 100vw, 50vw" />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${MAX_POSITION - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          className={IMAGE_CLASS}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <span className={`${BADGE_CLASS} left-4`}>{beforeLabel}</span>
      </div>
      <span className={`${BADGE_CLASS} right-4 text-studio-accent`}>{afterLabel}</span>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-px bg-studio-accent"
        style={{ left: `${position}%` }}
      >
        <span className={HANDLE_CLASS}>↔</span>
      </div>
      <label className="sr-only" htmlFor={`studio-compare-${id}`}>
        {sliderLabel}
      </label>
      <input
        id={`studio-compare-${id}`}
        type="range"
        min={MIN_POSITION}
        max={MAX_POSITION}
        value={Math.round(position)}
        onChange={(event) => setPosition(Number(event.target.value))}
        className="absolute inset-x-0 bottom-0 w-full opacity-0"
      />
    </div>
  );
}
