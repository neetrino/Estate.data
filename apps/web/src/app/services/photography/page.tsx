import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "Photography",
  description: SERVICE_DETAIL_COPY.photography.description,
};

export default function ServicesPhotographyPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY.photography} />;
}
