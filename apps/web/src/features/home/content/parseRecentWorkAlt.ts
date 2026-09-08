const ALT_PATTERN = /^(.+?) in (.+?) — (.+)$/u;

const SERVICE_SEPARATOR = ", ";

export type RecentWorkTileCopy = {
  readonly title: string;
  readonly location: string | null;
  readonly services: readonly string[];
};

/**
 * Portfolio rows only store an alt string shaped
 * "Title in Location — Service, Service". Split it for display, falling back to
 * the raw alt when an editor used free-form text.
 */
export function parseRecentWorkAlt(imageAlt: string): RecentWorkTileCopy {
  const match = ALT_PATTERN.exec(imageAlt);

  if (!match) {
    return { title: imageAlt, location: null, services: [] };
  }

  const [, title, location, services] = match;

  return {
    title: title ?? imageAlt,
    location: location ?? null,
    services: services ? services.split(SERVICE_SEPARATOR) : [],
  };
}
