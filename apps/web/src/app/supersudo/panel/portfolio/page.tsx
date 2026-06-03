import type { Metadata } from "next";
import { AdminPortfolioPage } from "@/features/admin/pages/AdminPortfolioPage";

export const metadata: Metadata = {
  title: "Portfolio — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoPortfolioPage() {
  return <AdminPortfolioPage />;
}
