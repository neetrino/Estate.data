import type { Metadata } from "next";
import { AdminSiteCopyPage } from "@/features/admin/pages/AdminSiteCopyPage";

export const metadata: Metadata = {
  title: "Site copy — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoSiteCopyPage() {
  return <AdminSiteCopyPage />;
}
