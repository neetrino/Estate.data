"use client";

import { useEffect } from "react";
import { trackStudioEvent } from "@/shared/analytics/trackStudioEvent";

const SERVICE_VIEW_THRESHOLD = 0.4;

/** Fires `service_view` once per `[data-service-key]` block that enters the viewport. */
export function StudioSectionViewTracker() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-service-key]");
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }
          const key = entry.target.getAttribute("data-service-key");
          if (!key || seen.has(key)) {
            continue;
          }
          seen.add(key);
          trackStudioEvent("service_view", { service: key });
        }
      },
      { threshold: SERVICE_VIEW_THRESHOLD },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
