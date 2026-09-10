"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

type AdminModalProps = {
  readonly open: boolean;
  readonly title: string;
  readonly onClose: () => void;
  readonly children: React.ReactNode;
  readonly footer?: React.ReactNode;
};

const OVERLAY_CLASS = [
  "admin-sheet-overlay fixed inset-0 z-50",
  "bg-brand-navy/45 backdrop-blur-[3px]",
].join(" ");

const SHEET_CLASS = [
  "admin-sheet fixed inset-y-0 right-0 z-50 flex w-[min(100%,42rem)] flex-col",
  "rounded-l-3xl border-l border-white/60 bg-gradient-to-b from-white via-white to-neutral-50/90",
  "shadow-[-24px_0_60px_rgba(46,72,115,0.18)]",
].join(" ");

const HEADER_CLASS = [
  "flex shrink-0 items-start justify-between gap-4",
  "border-b border-foreground/8 px-8 pb-6 pt-7",
].join(" ");

const TITLE_CLASS = "text-[1.35rem] font-semibold tracking-tight text-brand-navy";

const SUBTITLE_CLASS = "mt-1 text-sm text-muted-foreground";

const BODY_CLASS = "admin-scrollbar min-h-0 flex-1 overflow-y-auto px-8 py-7";

const FOOTER_CLASS = [
  "flex shrink-0 items-center justify-end gap-3",
  "border-t border-foreground/8 bg-white/90 px-8 py-5 backdrop-blur-sm",
].join(" ");

const CLOSE_BUTTON_CLASS = [
  "inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-xl",
  "border border-foreground/10 bg-white text-muted-foreground shadow-sm",
  "transition-colors hover:border-brand-purple/25 hover:bg-brand-purple/5 hover:text-brand-navy",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/35",
].join(" ");

const BODY_LOCK_CLASS = "overflow-hidden";

/**
 * Admin edit UI — large right-side sheet.
 * Shared by Portfolio / FAQ / Pricing editors.
 */
export function AdminModal({ open, title, onClose, children, footer }: AdminModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.classList.add(BODY_LOCK_CLASS);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove(BODY_LOCK_CLASS);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <>
      <button type="button" className={OVERLAY_CLASS} aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-sheet-title"
        className={SHEET_CLASS}
      >
        <div className={HEADER_CLASS}>
          <div className="min-w-0 pr-2">
            <p className={SUBTITLE_CLASS}>Admin editor</p>
            <h2 id="admin-sheet-title" className={TITLE_CLASS}>
              {title}
            </h2>
          </div>
          <button type="button" onClick={onClose} className={CLOSE_BUTTON_CLASS} aria-label="Close">
            <X className="size-5" strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className={BODY_CLASS}>{children}</div>
        {footer ? <div className={FOOTER_CLASS}>{footer}</div> : null}
      </div>
    </>
  );
}
