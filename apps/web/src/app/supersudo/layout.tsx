import { AdminAuthProvider } from "@/features/admin/providers/AdminAuthProvider";

type SupersudoLayoutProps = {
  readonly children: React.ReactNode;
};

export default function SupersudoLayout({ children }: SupersudoLayoutProps) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
