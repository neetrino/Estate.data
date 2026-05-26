import { PricingAnalyticsSubscriptions } from "@/features/pricing/components/PricingAnalyticsSubscriptions";
import { PricingMediaPackages } from "@/features/pricing/components/PricingMediaPackages";
import { PRICING_PAGE_COPY } from "@/features/pricing/content/pricingCopy";
import {
  INNER_PAGE_TITLE_CLASS,
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  INNER_PAGE_MAIN_CLASS,
  WHAT_WE_DO_PAGE_EYEBROW_CLASS,
} from "@/shared/lib/constants";

const PRICING_EYEBROW_CLASS = WHAT_WE_DO_PAGE_EYEBROW_CLASS;

const PRICING_SUBTITLE_CLASS = "mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl";

const PRICING_SUBTITLE_SEGMENT_CLASS = {
  subtitle: "text-what-we-do-subtitle",
  title: "font-semibold text-what-we-do-title",
} as const;

export function PricingPage() {
  const { eyebrow, title, subtitleSegments } = PRICING_PAGE_COPY;

  return (
    <main className={INNER_PAGE_MAIN_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={PRICING_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={INNER_PAGE_TITLE_CLASS}>{title}</h1>
            <p className={PRICING_SUBTITLE_CLASS}>
              {subtitleSegments.map((segment) => (
                <span
                  key={segment.text}
                  className={PRICING_SUBTITLE_SEGMENT_CLASS[segment.tone]}
                >
                  {segment.text}
                </span>
              ))}
            </p>
          </header>
          <PricingMediaPackages />
          <PricingAnalyticsSubscriptions />
        </div>
    </main>
  );
}
