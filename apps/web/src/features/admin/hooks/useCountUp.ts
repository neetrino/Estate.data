"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const COUNT_UP_DURATION_MS = 900;

/**
 * Animates an integer from 0 to `target` on mount.
 * Skips animation when the user prefers reduced motion.
 */
export function useCountUp(target: number): number {
  const reduceMotion = useReducedMotion();
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    if (reduceMotion || target === 0) {
      return;
    }

    let frameId = 0;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / COUNT_UP_DURATION_MS);
      const eased = 1 - (1 - progress) ** 3;
      setAnimated(Math.round(target * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [target, reduceMotion]);

  if (reduceMotion || target === 0) {
    return target;
  }

  return animated;
}
