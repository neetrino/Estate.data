import type { Metadata } from "next";
import { AdminArticlesPage } from "@/features/admin/pages/AdminArticlesPage";

export const metadata: Metadata = {
  title: "Articles — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoArticlesPage() {
  return <AdminArticlesPage />;
}
