import type { Metadata } from "next";
import { SolutionsPage } from "@/features/solutions";

export const metadata: Metadata = {
  title: "Solutions | ESTATEDATA",
  description:
    "Tailored real estate media and data deliverables for every role in the deal — built around how you win in Los Angeles.",
};

export default function SolutionsRoutePage() {
  return <SolutionsPage />;
}
