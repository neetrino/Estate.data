import type { Metadata } from "next";
import { AdminStudioServicesPage } from "@/features/admin/pages/AdminStudioServicesPage";

export const metadata: Metadata = {
  title: "Studio services — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoStudioServicesPage() {
  return <AdminStudioServicesPage />;
}
