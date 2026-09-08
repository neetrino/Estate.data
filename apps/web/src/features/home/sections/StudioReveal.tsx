"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

const REVEAL_BASE_CLASS =
  "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform";

const REVEAL_HIDDEN_CLASS = "translate-y-8 opacity-0";

const REVEAL_SHOWN_CLASS = "translate-y-0 opacity-100";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.05,
};

type StudioRevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly as?: ElementType;
};

/** Fades and lifts its children into view once, when the block reaches the viewport. */
export function StudioReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: StudioRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      });
    }, OBSERVER_OPTIONS);

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${REVEAL_BASE_CLASS} ${shown ? REVEAL_SHOWN_CLASS : REVEAL_HIDDEN_CLASS} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
