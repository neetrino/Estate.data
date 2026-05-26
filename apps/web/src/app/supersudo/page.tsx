import type { Metadata } from "next";
import { AdminLoginPage } from "@/features/admin";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SupersudoLoginRoutePage() {
  return <AdminLoginPage />;
}
