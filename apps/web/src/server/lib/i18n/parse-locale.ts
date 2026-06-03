import {
  DEFAULT_LOCALE,
  normalizeLocaleTag,
  type SupportedLocale,
} from "@estate/db";

const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  es: "Español",
};

/** Parse `?locale=` or `Accept-Language` — falls back to `DEFAULT_LOCALE`. */
export function parseLocaleFromRequest(request: Request): SupportedLocale {
  const url = new URL(request.url);
  const queryLocale = url.searchParams.get("locale");

  if (queryLocale) {
    const normalized = normalizeLocaleTag(queryLocale);
    return normalized ?? DEFAULT_LOCALE;
  }

  const header = request.headers.get("Accept-Language");
  if (!header) {
    return DEFAULT_LOCALE;
  }

  for (const part of header.split(",")) {
    const tag = part.split(";")[0]?.trim();
    if (!tag) {
      continue;
    }

    const normalized = normalizeLocaleTag(tag);
    if (normalized) {
      return normalized;
    }
  }

  return DEFAULT_LOCALE;
}

export function getLocaleLabel(locale: SupportedLocale): string {
  return LOCALE_LABELS[locale];
}
