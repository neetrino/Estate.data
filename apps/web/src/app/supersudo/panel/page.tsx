import type { Metadata } from "next";
import { AdminPanelPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Admin panel",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupersudoPanelRoutePage() {
  return <AdminPanelPage />;
}
