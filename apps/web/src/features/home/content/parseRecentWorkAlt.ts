const TITLE_IN_LOCATION_SERVICES = /^(.+?) in (.+?) — (.+)$/u;
const TITLE_SERVICES = /^(.+?) — (.+)$/u;
const TITLE_IN_LOCATION = /^(.+?) in (.+)$/u;

const SERVICE_SEPARATOR = ", ";

export const PORTFOLIO_VIDEO_PATTERN = /video|film|cinematic/iu;
export const PORTFOLIO_TOUR_PATTERN = /matterport|3d tour/iu;

export type RecentWorkTileCopy = {
  readonly title: string;
  readonly location: string | null;
  readonly services: readonly string[];
};

export type PortfolioCardAltInput = {
  readonly title: string;
  readonly location: string;
  readonly services: readonly string[];
  readonly hasVideo: boolean;
  readonly has3D: boolean;
};

function splitServices(raw: string): string[] {
  return raw
    .split(SERVICE_SEPARATOR)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

/**
 * Portfolio rows store an alt string shaped
 * "Title in Location — Service, Service". Also accepts title-only or
 * title + services without a location.
 */
export function parseRecentWorkAlt(imageAlt: string): RecentWorkTileCopy {
  const withBoth = TITLE_IN_LOCATION_SERVICES.exec(imageAlt);
  if (withBoth) {
    return {
      title: withBoth[1] ?? imageAlt,
      location: withBoth[2] ?? null,
      services: withBoth[3] ? splitServices(withBoth[3]) : [],
    };
  }

  const withServices = TITLE_SERVICES.exec(imageAlt);
  if (withServices) {
    return {
      title: withServices[1] ?? imageAlt,
      location: null,
      services: withServices[2] ? splitServices(withServices[2]) : [],
    };
  }

  const withLocation = TITLE_IN_LOCATION.exec(imageAlt);
  if (withLocation) {
    return {
      title: withLocation[1] ?? imageAlt,
      location: withLocation[2] ?? null,
      services: [],
    };
  }

  return { title: imageAlt, location: null, services: [] };
}

export function portfolioHasVideo(text: string): boolean {
  return PORTFOLIO_VIDEO_PATTERN.test(text);
}

export function portfolioHas3D(text: string): boolean {
  return PORTFOLIO_TOUR_PATTERN.test(text);
}

function withBadgeServices(
  title: string,
  location: string,
  services: readonly string[],
  hasVideo: boolean,
  has3D: boolean,
): string[] {
  const next = [...services];
  const haystack = `${title} ${location} ${next.join(" ")}`;
  if (hasVideo && !portfolioHasVideo(haystack)) {
    next.push("Video");
  }
  if (has3D && !portfolioHas3D(haystack)) {
    next.push("3D Tour");
  }
  return next;
}

/** Build the CMS alt string that the public portfolio tile parses. */
export function buildPortfolioImageAlt(input: PortfolioCardAltInput): string {
  const title = input.title.trim();
  const location = input.location.trim();
  const services = withBadgeServices(
    title,
    location,
    input.services.map((item) => item.trim()).filter((item) => item.length > 0),
    input.hasVideo,
    input.has3D,
  );

  if (location && services.length > 0) {
    return `${title} in ${location} — ${services.join(SERVICE_SEPARATOR)}`;
  }
  if (location) {
    return `${title} in ${location}`;
  }
  if (services.length > 0) {
    return `${title} — ${services.join(SERVICE_SEPARATOR)}`;
  }
  return title;
}

export function servicesTextFromList(services: readonly string[]): string {
  return services.join("\n");
}

export function servicesListFromText(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
