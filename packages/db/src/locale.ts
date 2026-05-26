/** Primary site locale — article/FAQ base fields are stored in this language. */
export const DEFAULT_LOCALE = "en" as const;

/** Locales exposed by GET /api/v1/i18n/locales and CMS translation tables. */
export const SUPPORTED_LOCALES = ["en", "es"] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

/** Normalize `en-US` → `en`; returns null when not supported. */
export function normalizeLocaleTag(raw: string): SupportedLocale | null {
  const primary = raw.trim().toLowerCase().split("-")[0] ?? "";
  return isSupportedLocale(primary) ? primary : null;
}
