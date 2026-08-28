import type { Metadata } from "next";
import { AdminHeroSlidesPage } from "@/features/admin/pages/AdminHeroSlidesPage";

export const metadata: Metadata = {
  title: "Hero slides — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoHeroSlidesPage() {
  return <AdminHeroSlidesPage />;
}
