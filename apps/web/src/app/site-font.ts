import { Montserrat } from "next/font/google";

/** Self-hosted via next/font — geometric sans similar to Proxima Nova. */
export const siteFont = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-site",
  display: "swap",
});
