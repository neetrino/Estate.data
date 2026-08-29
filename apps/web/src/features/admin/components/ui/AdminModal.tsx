"use client";

type AdminModalProps = {
  readonly open: boolean;
  readonly title: string;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
  readonly footer?: React.ReactNode;
};

export function AdminModal({ open, title, onClose, children, footer }: AdminModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
    >
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-xl border border-foreground/10 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-foreground/10 px-5 py-4">
          <h2 id="admin-modal-title" className="text-lg font-semibold text-brand-navy">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg px-2 py-1 text-sm text-muted-foreground hover:bg-neutral-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="admin-scrollbar overflow-y-auto px-5 py-4">{children}</div>
        {footer ? (
          <div className="flex justify-end gap-2 border-t border-foreground/10 px-5 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
