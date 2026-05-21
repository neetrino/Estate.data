import { PricingAnalyticsSubscriptions } from "@/features/pricing/components/PricingAnalyticsSubscriptions";
import { PricingMediaPackages } from "@/features/pricing/components/PricingMediaPackages";
import { PRICING_PAGE_COPY } from "@/features/pricing/content/pricingCopy";
import { Navbar } from "@/shared/components/navbar";
import {
  PAGE_CONTAINER_CLASS,
  PAGE_GUTTER_CLASS,
  INNER_PAGE_MAIN_CLASS,
} from "@/shared/lib/constants";

const PRICING_EYEBROW_CLASS =
  "text-sm font-semibold uppercase tracking-[0.2em] text-what-we-do-subtitle sm:text-base";

const PRICING_TITLE_CLASS =
  "mt-3 text-3xl font-bold tracking-tight text-what-we-do-title sm:text-4xl md:text-5xl lg:text-[3rem]";

const PRICING_SUBTITLE_CLASS = "mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl";

const PRICING_SUBTITLE_SEGMENT_CLASS = {
  subtitle: "text-what-we-do-subtitle",
  title: "font-semibold text-what-we-do-title",
} as const;

export function PricingPage() {
  const { eyebrow, title, subtitleSegments } = PRICING_PAGE_COPY;

  return (
    <>
      <Navbar />
      <main className={INNER_PAGE_MAIN_CLASS}>
        <div className={`${PAGE_CONTAINER_CLASS} ${PAGE_GUTTER_CLASS}`}>
          <header>
            <p className={PRICING_EYEBROW_CLASS}>{eyebrow}</p>
            <h1 className={PRICING_TITLE_CLASS}>{title}</h1>
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
    </>
  );
}
