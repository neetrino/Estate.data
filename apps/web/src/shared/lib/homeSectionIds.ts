/** Home one-page section ids — used by nav hashes, redirects, and `id` attributes. */
export const HOME_SECTION_IDS = {
  hero: "hero",
  whatWeDo: "what-we-do",
  photography: "photography",
  editing: "editing",
  video: "video",
  aiMedia: "ai-media",
  drone: "drone",
  tours: "tours",
  floorPlans: "floor-plans",
  scanToBim: "scan-to-bim",
  webPagesTeaser: "web-pages-teaser",
  packages: "packages",
  portfolio: "portfolio",
  beforeAfter: "before-after",
  process: "process",
  whyUs: "why-us",
  studio: "studio",
  serviceArea: "service-area",
  faq: "faq",
  contact: "contact",
} as const;

export type HomeSectionId = (typeof HOME_SECTION_IDS)[keyof typeof HOME_SECTION_IDS];

const HOME_SECTION_ID_SET = new Set<string>(Object.values(HOME_SECTION_IDS));

export function isHomeSectionId(value: string): value is HomeSectionId {
  return HOME_SECTION_ID_SET.has(value);
}

export function homeSectionHref(sectionId: HomeSectionId): string {
  return `/#${sectionId}`;
}

export function homeSectionQuery(sectionId: HomeSectionId): string {
  return `/?section=${sectionId}`;
}

export const HOME_SECTION_SCROLL_MARGIN_CLASS = "scroll-mt-28 sm:scroll-mt-32";
