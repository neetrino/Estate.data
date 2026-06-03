import type { Metadata } from "next";
import { AdminSiteContentPage } from "@/features/admin/pages/AdminSiteContentPage";

export const metadata: Metadata = {
  title: "Site content — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoSiteContentPage() {
  return <AdminSiteContentPage />;
}
