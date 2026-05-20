import type { Metadata } from "next";
import { SiteFooter } from "@/shared/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "LumenLA",
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
