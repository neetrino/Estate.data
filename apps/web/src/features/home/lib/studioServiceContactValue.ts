import type { ContactServiceValue } from "@/features/contact/content/contactFieldConfig";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

const SECTION_CONTACT_SERVICE: Record<string, ContactServiceValue> = {
  [HOME_SECTION_IDS.photography]: "photography",
  [HOME_SECTION_IDS.editing]: "photo-editing",
  [HOME_SECTION_IDS.video]: "video-production",
  [HOME_SECTION_IDS.aiMedia]: "ai-media",
  [HOME_SECTION_IDS.drone]: "drone-photography",
  [HOME_SECTION_IDS.tours]: "3d-tours-visualization",
  [HOME_SECTION_IDS.floorPlans]: "floor-plans-2d-3d",
  [HOME_SECTION_IDS.scanToBim]: "laser-scanning-scan-to-bim",
};

/** Contact form checkbox that matches a studio service block. */
export function studioServiceContactValue(sectionKey: string): ContactServiceValue {
  return SECTION_CONTACT_SERVICE[sectionKey] ?? "other";
}
