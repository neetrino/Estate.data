import { HOME_SECTION_IDS, homeSectionHref } from "@/shared/lib/homeSectionIds";
import { WEB_PAGES_PATH } from "@/shared/lib/routes";

export type AdminJumpTarget = {
  readonly label: string;
  readonly href: string;
};

/** Named homepage / site destinations — used instead of raw href fields. */
export const ADMIN_JUMP_TARGETS: readonly AdminJumpTarget[] = [
  { label: "Book a shoot", href: homeSectionHref(HOME_SECTION_IDS.quote) },
  { label: "Photography", href: homeSectionHref(HOME_SECTION_IDS.photography) },
  { label: "Video", href: homeSectionHref(HOME_SECTION_IDS.video) },
  { label: "Drone", href: homeSectionHref(HOME_SECTION_IDS.drone) },
  { label: "3D Tours", href: homeSectionHref(HOME_SECTION_IDS.tours) },
  { label: "Floor plans", href: homeSectionHref(HOME_SECTION_IDS.floorPlans) },
  { label: "Scan-to-BIM", href: homeSectionHref(HOME_SECTION_IDS.scanToBim) },
  { label: "Packages", href: homeSectionHref(HOME_SECTION_IDS.packages) },
  { label: "Portfolio", href: homeSectionHref(HOME_SECTION_IDS.portfolio) },
  { label: "Studio", href: homeSectionHref(HOME_SECTION_IDS.studio) },
  { label: "FAQ", href: homeSectionHref(HOME_SECTION_IDS.faq) },
  { label: "Web Pages", href: WEB_PAGES_PATH },
];

/** Include the current href when it is not in the named list. */
export function adminJumpTargetsFor(currentHref: string): readonly AdminJumpTarget[] {
  if (ADMIN_JUMP_TARGETS.some((target) => target.href === currentHref)) {
    return ADMIN_JUMP_TARGETS;
  }
  return [{ label: "Current destination", href: currentHref }, ...ADMIN_JUMP_TARGETS];
}
