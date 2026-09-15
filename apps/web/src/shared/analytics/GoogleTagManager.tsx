import Script from "next/script";
import { resolveGtmId } from "@/shared/analytics/gtmConfig";

/** Loads Google Tag Manager when `NEXT_PUBLIC_GTM_ID` is set. */
export function GoogleTagManager() {
  const gtmId = resolveGtmId();
  if (!gtmId) {
    return null;
  }

  return (
    <Script id="google-tag-manager" strategy="afterInteractive">{`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `}</Script>
  );
}

/** GTM noscript fallback — place immediately after `<body>`. */
export function GoogleTagManagerNoscript() {
  const gtmId = resolveGtmId();
  if (!gtmId) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height={0}
        width={0}
        className="hidden h-0 w-0"
        title="Google Tag Manager"
      />
    </noscript>
  );
}
