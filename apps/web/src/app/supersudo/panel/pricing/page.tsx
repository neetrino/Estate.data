import type { Metadata } from "next";
import { AdminPricingPage } from "@/features/admin/pages/AdminPricingPage";

export const metadata: Metadata = {
  title: "Pricing — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoPricingPage() {
  return <AdminPricingPage />;
}
