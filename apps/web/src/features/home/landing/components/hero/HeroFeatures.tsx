import { HOME_FEATURE_HIGHLIGHTS_COPY } from "@/features/home/content/featureHighlightsCopy";
import type { FeatureHighlight } from "@/features/home/content/featureHighlightsCopy";
import {
  HERO_FEATURES_ITEM_CLASS,
  HERO_FEATURES_ROOT_CLASS,
  HERO_FEATURES_SUBTITLE_CLASS,
  HERO_FEATURES_TITLE_CLASS,
  heroFeaturesIconBubbleClass,
} from "@/features/home/landing/lib/heroFeaturesStyles";

export function HeroFeatures() {
  return (
    <ul className={HERO_FEATURES_ROOT_CLASS}>
      {HOME_FEATURE_HIGHLIGHTS_COPY.items.map((item) => (
        <li key={item.id} className={HERO_FEATURES_ITEM_CLASS}>
          <span className={heroFeaturesIconBubbleClass(item.accent)} aria-hidden>
            <FeatureIcon type={item.icon} />
          </span>
          <div className="min-w-0 pt-1">
            <p className={HERO_FEATURES_TITLE_CLASS}>{item.title}</p>
            <p className={HERO_FEATURES_SUBTITLE_CLASS}>{item.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function FeatureIcon({ type }: { type: FeatureHighlight["icon"] }) {
  if (type === "camera") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path
          d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="4" />
      </svg>
    );
  }

  if (type === "chart") {
    return (
      <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M21.21 15.89A10 10 0 1 1 12 2v10z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4.5 16.5c7-7 8.5-11 15.5-11-1 4 1 7.5 4.5 10.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15l3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 18l-2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19l2-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
