import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "Property Landing Pages",
  description: SERVICE_DETAIL_COPY["property-landing-pages"].description,
};

export default function ServicesPropertyLandingPagesPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["property-landing-pages"]} />;
}
