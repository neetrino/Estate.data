import type { Metadata } from "next";
import { ResourcesPage } from "@/features/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Insights from the LA market — reports, articles, and answers to the questions we hear most.",
};

export default function ResourcesRoutePage() {
  return <ResourcesPage />;
}
