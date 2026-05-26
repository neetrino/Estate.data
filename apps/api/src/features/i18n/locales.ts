import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from "@estate/db";
import { getLocaleLabel } from "@/lib/i18n/parse-locale";

export type LocalesPayload = {
  defaultLocale: SupportedLocale;
  locales: readonly { code: SupportedLocale; label: string }[];
};

/** Supported locales for CMS content negotiation. */
export function getLocalesPayload(): LocalesPayload {
  return {
    defaultLocale: DEFAULT_LOCALE,
    locales: SUPPORTED_LOCALES.map((code) => ({
      code,
      label: getLocaleLabel(code),
    })),
  };
}
