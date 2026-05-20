import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a shoot or request a market report. Tell us about the property — we'll respond within 24 hours.",
};

export default function ContactRoutePage() {
  return <ContactPage />;
}
