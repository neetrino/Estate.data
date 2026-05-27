"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type MediaRevealListItemProps = {
  children: ReactNode;
  index: number;
};

function getRevealDelayClass(index: number): string {
  const delayClasses = [
    "media-services-reveal-delay-1",
    "media-services-reveal-delay-2",
    "media-services-reveal-delay-3",
    "media-services-reveal-delay-4",
    "media-services-reveal-delay-5",
    "media-services-reveal-delay-6",
  ] as const;

  return delayClasses[index] ?? delayClasses[delayClasses.length - 1];
}

export function MediaRevealListItem({ children, index }: MediaRevealListItemProps) {
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
      { root: null, rootMargin: "0px 0px 15% 0px", threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [isVisible]);

  const revealClass = isVisible ? "is-visible" : "";

  return (
    <li
      ref={itemRef}
      className={`media-services-section__grid-item media-services-reveal-item ${getRevealDelayClass(index)} ${revealClass}`}
    >
      {children}
    </li>
  );
}
