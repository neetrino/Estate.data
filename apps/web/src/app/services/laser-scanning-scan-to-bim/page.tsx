import type { Metadata } from "next";
import { ServiceDetailPage, SERVICE_DETAIL_COPY } from "@/features/services/shared";

export const metadata: Metadata = {
  title: "Laser Scanning & Scan to BIM",
  description: SERVICE_DETAIL_COPY["laser-scanning-scan-to-bim"].description,
};

export default function ServicesLaserScanningPage() {
  return <ServiceDetailPage copy={SERVICE_DETAIL_COPY["laser-scanning-scan-to-bim"]} />;
}
