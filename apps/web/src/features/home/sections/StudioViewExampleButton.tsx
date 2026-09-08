"use client";

const BUTTON_CLASS = [
  "group inline-flex items-center gap-3 border-b border-studio-accent/50 pb-1",
  "text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-studio-accent",
  "transition-colors hover:border-studio-accent hover:text-studio-fg",
].join(" ");

const ARROW_CLASS = "inline-block transition-transform duration-500 group-hover:translate-x-1";

type StudioViewExampleButtonProps = {
  readonly label: string;
  readonly onOpen: () => void;
};

/** Underlined accent link that opens the service gallery. */
export function StudioViewExampleButton({ label, onOpen }: StudioViewExampleButtonProps) {
  return (
    <button type="button" onClick={onOpen} className={BUTTON_CLASS}>
      {label}
      <span aria-hidden className={ARROW_CLASS}>
        ↗
      </span>
    </button>
  );
}
