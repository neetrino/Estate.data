import { ADMIN_CARD_CLASS, ADMIN_TABLE_CLASS } from "@/features/admin/styles/admin-panel-classes";

type AdminTableProps = {
  readonly children: React.ReactNode;
};

export function AdminTable({ children }: AdminTableProps) {
  return (
    <div className={`${ADMIN_CARD_CLASS} overflow-x-auto p-0`}>
      <table className={ADMIN_TABLE_CLASS}>{children}</table>
    </div>
  );
}
