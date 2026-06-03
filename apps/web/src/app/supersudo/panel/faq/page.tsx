import type { Metadata } from "next";
import { AdminFaqPage } from "@/features/admin/pages/AdminFaqPage";

export const metadata: Metadata = {
  title: "FAQ — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoFaqPage() {
  return <AdminFaqPage />;
}
