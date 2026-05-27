"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import "@/shared/styles/scroll-reveal.css";

type ScrollRevealListItemProps = {
  children: ReactNode;
  index: number;
  className?: string;
};

const SCROLL_REVEAL_DELAY_CLASSES = [
  "scroll-reveal-delay-1",
  "scroll-reveal-delay-2",
  "scroll-reveal-delay-3",
  "scroll-reveal-delay-4",
  "scroll-reveal-delay-5",
  "scroll-reveal-delay-6",
] as const;

function delayClassForIndex(index: number): string {
  return SCROLL_REVEAL_DELAY_CLASSES[index] ?? SCROLL_REVEAL_DELAY_CLASSES.at(-1) ?? "";
}

export function ScrollRevealListItem({ children, index, className }: ScrollRevealListItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const target = itemRef.current;
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
    <li ref={itemRef} className={mergedClassName}>
      {children}
    </li>
  );
}
