import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

/** Landing-page order of service examples inside the View Example popup. */
export const STUDIO_SERVICE_BROWSE_KEYS = [
  HOME_SECTION_IDS.photography,
  HOME_SECTION_IDS.editing,
  HOME_SECTION_IDS.video,
  HOME_SECTION_IDS.aiMedia,
  HOME_SECTION_IDS.drone,
  HOME_SECTION_IDS.tours,
  HOME_SECTION_IDS.floorPlans,
  HOME_SECTION_IDS.scanToBim,
] as const;

const FIRST_BROWSE_KEY = STUDIO_SERVICE_BROWSE_KEYS[0];

/** Next or previous service key, wrapping from last back to first. */
export function studioServiceBrowseWrap(sectionKey: string, direction: -1 | 1): string {
  const index = STUDIO_SERVICE_BROWSE_KEYS.findIndex((key) => key === sectionKey);
  const current = index < 0 ? 0 : index;
  const length = STUDIO_SERVICE_BROWSE_KEYS.length;
  const nextIndex = (current + direction + length) % length;
  return STUDIO_SERVICE_BROWSE_KEYS[nextIndex] ?? FIRST_BROWSE_KEY;
}
