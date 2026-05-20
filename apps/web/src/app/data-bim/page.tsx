import type { Metadata } from "next";
import { DataServicesPage } from "@/features/services/data";

export const metadata: Metadata = {
  title: "Data & BIM | LumenLA",
  description:
    "Scan to BIM, LiDAR captures, and live market dashboards — the data layer behind every confident deal in Los Angeles.",
};

/** Canonical Data & BIM page — navbar “Data & BIM” active state. */
export default function DataBimRoutePage() {
  return <DataServicesPage />;
}
