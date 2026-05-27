"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type SolutionsRevealListItemProps = {
  children: ReactNode;
  index: number;
};

function getRevealDelayClass(index: number): string {
  const delayClasses = [
    "solutions-role-reveal-delay-1",
    "solutions-role-reveal-delay-2",
    "solutions-role-reveal-delay-3",
    "solutions-role-reveal-delay-4",
    "solutions-role-reveal-delay-5",
  ] as const;

  return delayClasses[index] ?? delayClasses[delayClasses.length - 1];
}

export function SolutionsRevealListItem({ children, index }: SolutionsRevealListItemProps) {
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
      {
        root: null,
        rootMargin: "0px 0px 20% 0px",
        threshold: 0.08,
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [isVisible]);

  const revealClass = isVisible ? "is-visible" : "";

  return (
    <li
      ref={itemRef}
      className={`solutions-role-reveal-item min-w-0 ${getRevealDelayClass(index)} ${revealClass}`}
    >
      {children}
    </li>
  );
}
