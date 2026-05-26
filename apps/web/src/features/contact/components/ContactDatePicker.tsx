"use client";

import {
  addCalendarMonths,
  buildContactCalendarDays,
  CONTACT_DATE_WEEKDAY_LABELS,
  formatContactDateLabel,
  formatContactMonthYear,
  isDateBeforeMin,
  isSameCalendarDay,
  startOfDay,
  toIsoDateString,
} from "@/features/contact/lib/contactDatePickerUtils";
import { CONTACT_FORM_CONTROL_FOCUS_CLASS } from "@/shared/lib/constants";
import { useEffect, useId, useRef, useState } from "react";

const CONTACT_DATE_TRIGGER_CLASS = [
  "relative flex w-full cursor-pointer items-center rounded-xl border border-foreground/15 bg-white py-3 pl-4 pr-11 text-left text-base transition-colors",
  "focus-visible:outline-none focus-visible:ring-2",
  CONTACT_FORM_CONTROL_FOCUS_CLASS,
].join(" ");

const CONTACT_DATE_PLACEHOLDER_CLASS = "text-muted-foreground";

const CONTACT_DATE_ICON_CLASS =
  "absolute right-5 top-1/2 size-4 -translate-y-1/2 text-black";

const CONTACT_DATE_POPOVER_CLASS =
  "absolute inset-x-0 z-20 mt-1 box-border w-full max-w-full min-w-0 rounded-xl border border-foreground/15 bg-white p-2.5 shadow-[var(--client-voices-card-shadow)] sm:p-3";

const CONTACT_DATE_NAV_BUTTON_CLASS =
  "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-black transition-colors hover:bg-what-we-do-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-what-we-do-subtitle/40 sm:size-8";

const CONTACT_DATE_WEEKDAY_CLASS =
  "flex aspect-square w-full items-center justify-center text-[0.625rem] font-semibold uppercase tracking-wide text-muted-foreground sm:text-xs";

const CONTACT_DATE_DAY_BASE_CLASS =
  "flex aspect-square w-full min-w-0 items-center justify-center rounded-md text-xs font-medium sm:rounded-lg sm:text-sm";

const CONTACT_DATE_DAY_INTERACTIVE_CLASS =
  "cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-what-we-do-subtitle/40";

const CONTACT_DATE_DAY_SELECTED_CLASS =
  "bg-brand-purple-light text-white ring-0 hover:bg-brand-purple-light hover:opacity-90 focus-visible:ring-0";

const CONTACT_DATE_DAY_DISABLED_CLASS = "cursor-default text-muted-foreground";

type ContactDatePickerProps = {
  id: string;
  placeholder: string;
  disabled?: boolean;
};

export function ContactDatePicker({
  id,
  placeholder,
  disabled = false,
}: ContactDatePickerProps) {
  const calendarId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const minDate = startOfDay(new Date());
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Date | null>(null);
  const [viewMonth, setViewMonth] = useState(() => startOfDay(new Date()));

  const displayLabel = value ? formatContactDateLabel(value) : placeholder;
  const calendarDays = buildContactCalendarDays(viewMonth);

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

  function selectDate(nextValue: Date) {
    setValue(nextValue);
    setViewMonth(startOfDay(new Date(nextValue.getFullYear(), nextValue.getMonth(), 1)));
    setOpen(false);
  }

  function goToPreviousMonth() {
    setViewMonth((current) => addCalendarMonths(current, -1));
  }

  function goToNextMonth() {
    setViewMonth((current) => addCalendarMonths(current, 1));
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <input
        type="hidden"
        name="preferredDate"
        value={value ? toIsoDateString(value) : ""}
      />

      <button
        type="button"
        id={id}
        disabled={disabled}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? calendarId : undefined}
        className={CONTACT_DATE_TRIGGER_CLASS}
        onClick={() => {
          if (!disabled) {
            setOpen((isOpen) => !isOpen);
          }
        }}
      >
        <span className={value ? undefined : CONTACT_DATE_PLACEHOLDER_CLASS}>
          {displayLabel}
        </span>
        <CalendarIcon />
      </button>

      {open ? (
        <div
          id={calendarId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={id}
          className={CONTACT_DATE_POPOVER_CLASS}
        >
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              className={CONTACT_DATE_NAV_BUTTON_CLASS}
              aria-label="Previous month"
              onClick={goToPreviousMonth}
            >
              <ChevronLeftIcon />
            </button>
            <p className="truncate px-1 text-center text-xs font-semibold text-black sm:text-sm">
              {formatContactMonthYear(viewMonth)}
            </p>
            <button
              type="button"
              className={CONTACT_DATE_NAV_BUTTON_CLASS}
              aria-label="Next month"
              onClick={goToNextMonth}
            >
              <ChevronRightIcon />
            </button>
          </div>

          <div className="mt-2 grid grid-cols-7 gap-0.5 sm:mt-3 sm:gap-1">
            {CONTACT_DATE_WEEKDAY_LABELS.map((label) => (
              <span key={label} className={CONTACT_DATE_WEEKDAY_CLASS}>
                {label}
              </span>
            ))}
            {calendarDays.map(({ date, inCurrentMonth }) => {
              const disabled = isDateBeforeMin(date, minDate);
              const selected = value ? isSameCalendarDay(date, value) : false;
              const isToday = isSameCalendarDay(date, new Date());
              const dayKey = toIsoDateString(date);

              if (disabled) {
                return (
                  <span
                    key={dayKey}
                    aria-hidden
                    className={`${CONTACT_DATE_DAY_BASE_CLASS} ${CONTACT_DATE_DAY_DISABLED_CLASS}`}
                  >
                    {date.getDate()}
                  </span>
                );
              }

              let dayClass = `${CONTACT_DATE_DAY_BASE_CLASS} ${CONTACT_DATE_DAY_INTERACTIVE_CLASS}`;
              if (selected) {
                dayClass += ` ${CONTACT_DATE_DAY_SELECTED_CLASS}`;
              } else if (!inCurrentMonth) {
                dayClass += " text-muted-foreground/60 hover:bg-what-we-do-surface";
              } else {
                dayClass += " text-black hover:bg-what-we-do-surface";
              }

              if (isToday && !selected) {
                dayClass += " ring-1 ring-what-we-do-subtitle/50";
              }

              return (
                <button
                  key={dayKey}
                  type="button"
                  aria-label={formatContactDateLabel(date)}
                  aria-pressed={selected}
                  className={dayClass}
                  onClick={() => selectDate(date)}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      className={CONTACT_DATE_ICON_CLASS}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="2" y="3" width="12" height="11" rx="1.5" />
      <path d="M2 6.5h12M5.5 1.5v2M10.5 1.5v2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m10 12-4-4 4-4" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m6 4 4 4-4 4" />
    </svg>
  );
}
