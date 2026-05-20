import type { Metadata, Viewport } from "next";
import { SITE_DISPLAY_NAME } from "@/shared/components/navbar/navConfig";
import { SiteFooter } from "@/shared/components/footer";
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
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col overflow-x-hidden font-sans">
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
