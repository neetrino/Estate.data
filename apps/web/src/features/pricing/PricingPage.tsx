import { PricingAnalyticsSubscriptions } from "@/features/pricing/components/PricingAnalyticsSubscriptions";
import { PricingMediaPackages } from "@/features/pricing/components/PricingMediaPackages";
import { PRICING_PAGE_COPY } from "@/features/pricing/content/pricingCopy";
import { fetchPricingPage } from "@/features/pricing/services/fetchPricingPage";
import { FooterPageBridge } from "@/shared/components/footer/FooterPageBridge";
import {
  INNER_PAGE_MAIN_SPACING_CLASS,
  INNER_PAGE_TITLE_CLASS,
  SITE_PAGE_SHELL_CLASS,
  WHAT_WE_DO_PAGE_EYEBROW_CLASS,
} from "@/shared/lib/constants";

const PRICING_EYEBROW_CLASS = WHAT_WE_DO_PAGE_EYEBROW_CLASS;

const PRICING_SUBTITLE_CLASS = "mt-5 max-w-3xl text-lg leading-relaxed sm:text-xl";

const PRICING_SUBTITLE_SEGMENT_CLASS = {
  subtitle: "text-what-we-do-subtitle",
  title: "font-semibold text-what-we-do-title",
} as const;

export async function PricingPage() {
  const { eyebrow, title, subtitleSegments } = PRICING_PAGE_COPY;
  const pricing = await fetchPricingPage();

  return (
    <main
      className={[
        INNER_PAGE_MAIN_SPACING_CLASS,
        "relative isolate overflow-x-hidden bg-[#f8f7ff]",
        "bg-[url('/images/solutions/solutions-page-bg-reference-v2.png')] bg-cover bg-center bg-no-repeat",
      ].join(" ")}
    >
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-28 bg-gradient-to-b from-transparent via-[#f4f1fb]/65 to-[#f4f1fb]"
          aria-hidden
        />
        <div className={`${SITE_PAGE_SHELL_CLASS} relative z-20`}>
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
          <PricingMediaPackages category={pricing.media} />
          <PricingAnalyticsSubscriptions category={pricing.analytics} />
        </div>
        <FooterPageBridge from="surface" />
    </main>
  );
}
