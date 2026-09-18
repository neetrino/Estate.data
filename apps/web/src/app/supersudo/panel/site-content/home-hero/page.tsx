import type { Metadata } from "next";
import { AdminHomeHeroPage } from "@/features/admin/pages/AdminHomeHeroPage";

export const metadata: Metadata = {
  title: "Slides — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoHomeHeroPage() {
  return <AdminHomeHeroPage />;
}
