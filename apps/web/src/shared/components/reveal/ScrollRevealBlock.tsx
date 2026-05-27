"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import "@/shared/styles/scroll-reveal.css";

type ScrollRevealBlockProps = {
  children: ReactNode;
  index?: number;
  className?: string;
};

function delayClassForIndex(index: number): string {
  const clampedIndex = Math.min(Math.max(index + 1, 1), 6);
  return `scroll-reveal-delay-${clampedIndex}`;
}

export function ScrollRevealBlock({ children, index = 0, className }: ScrollRevealBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const blockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const target = blockRef.current;
    if (!target || isVisible) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "0px 0px 16% 0px", threshold: 0.08 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isVisible]);

  const revealStateClass = isVisible ? "is-visible" : "";
  const mergedClassName = ["scroll-reveal-item", delayClassForIndex(index), revealStateClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={blockRef} className={mergedClassName}>
      {children}
    </div>
  );
}
