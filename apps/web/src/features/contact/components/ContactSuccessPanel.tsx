import { CONTACT_FORM_COPY } from "@/features/contact/content/contactFormCopy";

const CONTACT_SUCCESS_PANEL_CLASS = "border border-studio-accent/50 p-10 outline-none";

const CONTACT_SUCCESS_MESSAGE_CLASS = "studio-display-md mt-6 max-w-[24ch] text-studio-fg";

type ContactSuccessPanelProps = {
  readonly panelRef: (node: HTMLElement | null) => void;
};

/** Replaces the form once an inquiry is accepted. */
export function ContactSuccessPanel({ panelRef }: ContactSuccessPanelProps) {
  const { successEyebrow, successMessage } = CONTACT_FORM_COPY;

  return (
    <div ref={panelRef} tabIndex={-1} role="status" className={CONTACT_SUCCESS_PANEL_CLASS}>
      <p className="studio-label text-studio-accent">{successEyebrow}</p>
      <p className={CONTACT_SUCCESS_MESSAGE_CLASS}>{successMessage}</p>
    </div>
  );
}
