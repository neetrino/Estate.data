import type { Metadata } from "next";
import { AdminPaymentsPage } from "@/features/admin/pages/AdminPaymentsPage";

export const metadata: Metadata = {
  title: "Payments — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoPaymentsPage() {
  return <AdminPaymentsPage />;
}
