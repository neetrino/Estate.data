import type { Metadata } from "next";
import { MediaPage } from "@/features/media";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Real estate media for the LA market — photography, video, drone, twilight, and 3D tours engineered to sell the story.",
};

export default function ServicesRoutePage() {
  return <MediaPage />;
}
