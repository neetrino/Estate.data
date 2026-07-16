import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "MLS Solutions",
  description: SERVICE_DETAIL_COPY["mls-solutions"].description,
};

export default function ServicesMlsSolutionsPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["mls-solutions"]} />;
}
