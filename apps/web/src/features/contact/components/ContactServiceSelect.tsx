"use client";

import {
  CONTACT_FORM_SERVICE_OPTIONS,
} from "@/features/contact/content/contactFormCopy";
import { useEffect, useId, useRef, useState } from "react";

const CONTACT_SERVICE_TRIGGER_CLASS =
  "relative flex w-full cursor-pointer items-center rounded-xl border border-foreground/15 bg-white py-3 pl-4 pr-11 text-left text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-client-voices-accent/40";

const CONTACT_SERVICE_PLACEHOLDER_CLASS = "text-muted-foreground";

const CONTACT_SERVICE_CHEVRON_CLASS =
  "absolute right-5 top-1/2 size-4 -translate-y-1/2 text-black transition-transform duration-200";

const CONTACT_SERVICE_LIST_CLASS =
  "absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl border border-foreground/15 bg-white py-1 shadow-[var(--client-voices-card-shadow)]";

const CONTACT_SERVICE_OPTION_CLASS =
  "block w-full cursor-pointer px-4 py-2.5 text-left text-base text-black transition-colors hover:bg-what-we-do-surface";

type ContactServiceSelectProps = {
  id: string;
  placeholder: string;
};

export function ContactServiceSelect({ id, placeholder }: ContactServiceSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const selectedOption = CONTACT_FORM_SERVICE_OPTIONS.find(
    (option) => option.value === value,
  );
  const displayLabel = selectedOption?.label ?? placeholder;

  useEffect(() => {
    if (!open) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function selectOption(nextValue: string) {
    setValue(nextValue);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name="service" value={value} required />

      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className={CONTACT_SERVICE_TRIGGER_CLASS}
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span
          className={selectedOption ? undefined : CONTACT_SERVICE_PLACEHOLDER_CLASS}
        >
          {displayLabel}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className={CONTACT_SERVICE_LIST_CLASS}
        >
          {CONTACT_FORM_SERVICE_OPTIONS.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className="w-full"
            >
              <button
                type="button"
                className={CONTACT_SERVICE_OPTION_CLASS}
                onClick={() => selectOption(option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

type ChevronIconProps = {
  open: boolean;
};

function ChevronIcon({ open }: ChevronIconProps) {
  return (
    <svg
      className={`${CONTACT_SERVICE_CHEVRON_CLASS} ${open ? "rotate-180" : ""}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}
