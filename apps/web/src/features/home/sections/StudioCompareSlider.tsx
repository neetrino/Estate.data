"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

const FRAME_CLASS = [
  "relative aspect-[3/2] w-full cursor-ew-resize touch-none select-none overflow-hidden",
  "outline-none focus-visible:ring-2 focus-visible:ring-studio-accent/50",
].join(" ");

const IMAGE_CLASS = "pointer-events-none object-cover";

const BADGE_CLASS = "studio-label pointer-events-none absolute top-4 bg-studio-bg/75 px-2 py-1";

const HANDLE_CLASS = [
  "pointer-events-none absolute left-1/2 top-1/2 flex h-10 w-10",
  "-translate-x-1/2 -translate-y-1/2 items-center justify-center",
  "border border-studio-accent bg-studio-bg text-xs text-studio-accent",
].join(" ");

const INITIAL_POSITION = 50;

const MIN_POSITION = 0;

const MAX_POSITION = 100;

const KEYBOARD_STEP = 2;

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
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(INITIAL_POSITION);

  const clampPosition = useCallback((value: number): number => {
    return Math.min(MAX_POSITION, Math.max(MIN_POSITION, value));
  }, []);

  const moveTo = useCallback(
    (clientX: number): void => {
      const frame = frameRef.current;
      if (!frame) {
        return;
      }

      const bounds = frame.getBoundingClientRect();
      if (bounds.width <= 0) {
        return;
      }

      const ratio = ((clientX - bounds.left) / bounds.width) * MAX_POSITION;
      setPosition(clampPosition(ratio));
    },
    [clampPosition],
  );

  const stopDrag = useCallback((event: PointerEvent<HTMLDivElement>): void => {
    if (!draggingRef.current) {
      return;
    }

    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    if (!draggingRef.current) {
      return;
    }

    moveTo(event.clientX);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((current) => clampPosition(current - KEYBOARD_STEP));
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => clampPosition(current + KEYBOARD_STEP));
    }
  };

  return (
    <div
      ref={frameRef}
      role="slider"
      aria-label={sliderLabel}
      aria-valuemin={MIN_POSITION}
      aria-valuemax={MAX_POSITION}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      className={FRAME_CLASS}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrag}
      onPointerCancel={stopDrag}
      onKeyDown={handleKeyDown}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        draggable={false}
        className={IMAGE_CLASS}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${MAX_POSITION - position}% 0 0)` }}
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          draggable={false}
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
      <span id={`studio-compare-${id}`} className="sr-only">
        {sliderLabel}
      </span>
    </div>
  );
}
