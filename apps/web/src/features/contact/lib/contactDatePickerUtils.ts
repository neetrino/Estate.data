const CALENDAR_WEEKS = 6;
const DAYS_PER_WEEK = 7;
const CALENDAR_CELL_COUNT = CALENDAR_WEEKS * DAYS_PER_WEEK;

const ISO_DATE_PARTS = 3;

export const CONTACT_DATE_WEEKDAY_LABELS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
] as const;

export type ContactCalendarDay = {
  date: Date;
  inCurrentMonth: boolean;
};

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toIsoDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatContactDateLabel(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatContactMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function addCalendarMonths(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

export function buildContactCalendarDays(month: Date): ContactCalendarDay[] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstOfMonth = new Date(year, monthIndex, 1);
  const leadingEmptyCells = firstOfMonth.getDay();
  const gridStart = new Date(year, monthIndex, 1 - leadingEmptyCells);

  return Array.from({ length: CALENDAR_CELL_COUNT }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );
    return {
      date,
      inCurrentMonth: date.getMonth() === monthIndex,
    };
  });
}

export function parseIsoDateString(value: string): Date | null {
  const parts = value.split("-");
  if (parts.length !== ISO_DATE_PARTS) {
    return null;
  }

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return null;
  }

  const parsed = new Date(year, month - 1, day);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return startOfDay(parsed);
}

export function isDateBeforeMin(date: Date, minDate: Date): boolean {
  return startOfDay(date).getTime() < startOfDay(minDate).getTime();
}
