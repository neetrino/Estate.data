import type { Metadata } from "next";
import { AdminStudioServiceEditPage } from "@/features/admin/pages/AdminStudioServiceEditPage";

type StudioServiceEditRouteProps = {
  readonly params: Promise<{ sectionKey: string }>;
};

export const metadata: Metadata = {
  title: "Edit service — Admin",
  robots: { index: false, follow: false },
};

export default async function SupersudoStudioServiceEditRoute({
  params,
}: StudioServiceEditRouteProps) {
  const { sectionKey } = await params;
  return <AdminStudioServiceEditPage sectionKey={decodeURIComponent(sectionKey)} />;
}
