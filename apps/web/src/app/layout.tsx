import type { Metadata, Viewport } from "next";
import { SITE_DISPLAY_NAME } from "@/shared/components/navbar/navConfig";
import { SiteFooterGate } from "@/shared/components/footer/SiteFooterGate";
import { SiteChrome } from "@/shared/components/navbar";
import { displayFont, siteFont } from "./site-font";
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
  description:
    "Premium Los Angeles real estate media: photography, cinematic video, drone, AI media, Matterport 3D tours and Scan-to-BIM. Book a shoot from $249.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${siteFont.variable} ${displayFont.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto [color-scheme:dark]`}
    >
      <body className="flex min-h-full flex-col bg-studio-bg font-sans text-studio-fg">
        <SiteChrome>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </SiteChrome>
        <SiteFooterGate />
      </body>
    </html>
  );
}
