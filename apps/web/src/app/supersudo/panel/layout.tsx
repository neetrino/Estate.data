import { AdminAuthGuard } from "@/features/admin/components/AdminAuthGuard";
import { AdminLayout } from "@/features/admin/components/layout/AdminLayout";

type PanelLayoutProps = {
  readonly children: React.ReactNode;
};

export default function SupersudoPanelLayout({ children }: PanelLayoutProps) {
  return (
    <AdminAuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthGuard>
  );
}
