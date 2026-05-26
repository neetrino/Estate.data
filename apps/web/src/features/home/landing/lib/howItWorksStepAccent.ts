import type { HowItWorksAccent } from "@/features/home/content/howItWorksCopy";

const HOW_IT_WORKS_STEP_BADGE_CLASS: Record<HowItWorksAccent, string> = {
  purple: "how-it-works-step-badge--purple",
  cyan: "how-it-works-step-badge--cyan",
  teal: "how-it-works-step-badge--teal",
  orange: "how-it-works-step-badge--orange",
  pink: "how-it-works-step-badge--pink",
};

/** Maps step accent to the numbered badge modifier class. */
export function howItWorksStepBadgeClass(accent: HowItWorksAccent): string {
  return HOW_IT_WORKS_STEP_BADGE_CLASS[accent];
}
