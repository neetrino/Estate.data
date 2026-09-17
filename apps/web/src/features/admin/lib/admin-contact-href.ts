/** Build a `tel:` href from the phone number visitors see. */
export function toTelHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  if (digits.length === 10) {
    return `tel:+1${digits}`;
  }
  if (digits.length > 0) {
    return `tel:+${digits}`;
  }
  return "tel:";
}

/** Build a `mailto:` href from the email visitors see. */
export function toMailtoHref(display: string): string {
  const email = display.replace(/^mailto:/i, "").trim();
  return email ? `mailto:${email}` : "mailto:";
}
