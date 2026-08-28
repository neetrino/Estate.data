import { Archivo, Manrope } from "next/font/google";

/** Lovable public site body — Manrope. */
export const siteFont = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-site",
  display: "swap",
});

/** Lovable display headlines — Archivo. */
export const displayFont = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});
