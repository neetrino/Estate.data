import type { Metadata } from "next";
import { PortfolioPage } from "@/features/portfolio";

export const metadata: Metadata = {
  title: "Portfolio | LumenLA",
  description:
    "Selected real estate media work across Los Angeles — photography, video, drone, and 3D tours.",
};

export default function PortfolioRoutePage() {
  return <PortfolioPage />;
}
