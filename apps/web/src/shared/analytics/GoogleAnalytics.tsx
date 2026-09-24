import Script from "next/script";
import { resolveGaMeasurementId } from "@/shared/analytics/gaConfig";

/** Loads the Google tag (gtag.js) on every page. */
export function GoogleAnalytics() {
  const measurementId = resolveGaMeasurementId();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${measurementId}');
      `}</Script>
    </>
  );
}
