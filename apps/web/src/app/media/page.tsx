import type { Metadata } from "next";
import { MediaPage } from "@/features/media";

export const metadata: Metadata = {
  title: "Media Services | ESTATEDATA",
  description:
    "Real estate media for the LA market — photography, video, drone, twilight, and 3D tours engineered to sell the story.",
};

export default function MediaRoutePage() {
  return <MediaPage />;
}
