import type { Metadata, Viewport } from "next";
import { SITE_DISPLAY_NAME } from "@/shared/components/navbar/navConfig";
import { ConditionalSiteFooter } from "@/shared/components/layout/ConditionalSiteFooter";
import { SiteChrome } from "@/shared/components/navbar";
import { SiteFooterGate } from "@/shared/components/footer/SiteFooterGate";
import { siteFont } from "./site-font";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: SITE_DISPLAY_NAME,
    template: `%s | ${SITE_DISPLAY_NAME}`,
  },
  description: "Real estate media, data, and BIM solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${siteFont.variable} h-full antialiased [color-scheme:light]`}
    >
      <body className="flex min-h-full flex-col bg-white font-sans text-foreground">
        <SiteChrome>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </SiteChrome>
        <SiteFooterGate />
        <ConditionalSiteFooter />
      </body>
    </html>
  );
}
