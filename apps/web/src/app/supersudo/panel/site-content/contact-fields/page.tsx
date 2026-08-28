import type { Metadata } from "next";
import { AdminContactFieldsPage } from "@/features/admin/pages/AdminContactFieldsPage";

export const metadata: Metadata = {
  title: "Contact fields — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoContactFieldsPage() {
  return <AdminContactFieldsPage />;
}
