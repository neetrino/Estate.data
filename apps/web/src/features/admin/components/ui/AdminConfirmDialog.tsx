"use client";

import { AdminButton } from "@/features/admin/components/ui/AdminButton";

type AdminConfirmDialogProps = {
  readonly open: boolean;
  readonly title: string;
  readonly message: string;
  readonly confirmLabel?: string;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly busy?: boolean;
};

export function AdminConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  busy,
}: AdminConfirmDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-confirm-title"
    >
      <div className="w-full max-w-md rounded-xl border border-foreground/10 bg-white p-5 shadow-lg">
        <h2 id="admin-confirm-title" className="text-lg font-semibold text-brand-navy">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <AdminButton variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </AdminButton>
          <AdminButton variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? "Working…" : confirmLabel}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}
