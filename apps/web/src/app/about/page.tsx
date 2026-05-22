import type { Metadata } from "next";
import { AboutPage } from "@/features/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "An LA studio pairing cinematic real estate media with data — built for teams moving properties faster.",
};

export default function AboutRoutePage() {
  return <AboutPage />;
}
