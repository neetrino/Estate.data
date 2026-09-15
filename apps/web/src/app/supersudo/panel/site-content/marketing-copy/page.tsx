import type { Metadata } from "next";
import { AdminMarketingCopyPage } from "@/features/admin/pages/AdminMarketingCopyPage";

export const metadata: Metadata = {
  title: "Marketing copy — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoMarketingCopyPage() {
  return <AdminMarketingCopyPage />;
}
