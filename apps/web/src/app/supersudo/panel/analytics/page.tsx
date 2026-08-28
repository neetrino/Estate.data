import type { Metadata } from "next";
import { AdminAnalyticsPage } from "@/features/admin/pages/AdminAnalyticsPage";

export const metadata: Metadata = {
  title: "Analytics — Admin",
  robots: { index: false, follow: false },
};

export default function SupersudoAnalyticsPage() {
  return <AdminAnalyticsPage />;
}
