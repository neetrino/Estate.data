import type { Metadata } from "next";
import { WebPagesPlaceholderPage } from "@/features/web-pages/WebPagesPlaceholderPage";

export const metadata: Metadata = {
  title: "Web Pages",
  description:
    "A dedicated, high-converting property website that brings photos, video, drone, 3D tours and floor plans into one branded experience.",
};

export default function WebPagesRoute() {
  return <WebPagesPlaceholderPage />;
}
