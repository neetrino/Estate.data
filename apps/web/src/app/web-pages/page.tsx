import type { Metadata } from "next";
import { WebPagesPage } from "@/features/web-pages/WebPagesPage";
import { getMarketingCopy } from "@/server/features/site-copy/get-site-copy";

export const metadata: Metadata = {
  title: "Web Pages",
  description:
    "A dedicated, high-converting property website that brings photos, video, drone, 3D tours and floor plans into one branded experience.",
};

export default async function WebPagesRoute() {
  const { webPages } = await getMarketingCopy();
  return <WebPagesPage copy={webPages} />;
}
