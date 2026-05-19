import type { Metadata } from "next";
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
      <body className="min-h-full overflow-x-hidden font-sans">{children}</body>
    </html>
  );
}
