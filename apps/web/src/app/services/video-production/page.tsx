import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "Video Production",
  description: SERVICE_DETAIL_COPY["video-production"].description,
};

export default function ServicesVideoProductionPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["video-production"]} />;
}
