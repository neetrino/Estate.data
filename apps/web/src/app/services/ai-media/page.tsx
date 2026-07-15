import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "AI Media",
  description: SERVICE_DETAIL_COPY["ai-media"].description,
};

export default function ServicesAiMediaPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["ai-media"]} />;
}
