import type { Metadata } from "next";
import { ContactPage } from "@/features/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book now or schedule a consultation. Tell us about the property — we'll respond within 24 hours.",
};

export default function ContactRoutePage() {
  return <ContactPage />;
}
