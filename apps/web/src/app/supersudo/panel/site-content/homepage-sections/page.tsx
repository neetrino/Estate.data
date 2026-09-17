import type { Metadata } from "next";
import { AdminHomepageCopyPage } from "@/features/admin/pages/AdminHomepageCopyPage";

export const metadata: Metadata = {
  title: "Homepage sections — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoHomepageCopyPage() {
  return <AdminHomepageCopyPage />;
}
