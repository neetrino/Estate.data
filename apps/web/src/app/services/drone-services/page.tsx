import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "Drone Services",
  description: SERVICE_DETAIL_COPY["drone-services"].description,
};

export default function ServicesDroneServicesPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["drone-services"]} />;
}
