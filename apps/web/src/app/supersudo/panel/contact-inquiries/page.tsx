import type { Metadata } from "next";
import { AdminContactInquiriesPage } from "@/features/admin/pages/AdminContactInquiriesPage";

export const metadata: Metadata = {
  title: "Contact inquiries — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoContactInquiriesPage() {
  return <AdminContactInquiriesPage />;
}
