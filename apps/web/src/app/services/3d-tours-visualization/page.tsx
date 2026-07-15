import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "3D Tours & Visualization",
  description: SERVICE_DETAIL_COPY["3d-tours-visualization"].description,
};

export default function Services3dToursVisualizationPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["3d-tours-visualization"]} />;
}
