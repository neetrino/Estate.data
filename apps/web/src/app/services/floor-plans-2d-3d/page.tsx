import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "Floor Plans / 2D-3D",
  description: SERVICE_DETAIL_COPY["floor-plans-2d-3d"].description,
};

export default function ServicesFloorPlansPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["floor-plans-2d-3d"]} />;
}
