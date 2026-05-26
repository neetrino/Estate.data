export const HERO_DASHBOARD_ENTER_CLASS = "hero-dashboard-enter";

const HERO_DASHBOARD_ENTER_DELAY_STEP_COUNT = 8;

/** Stagger class for dashboard enter animation (steps 0–7). */
export function heroDashboardEnterDelayClass(step: number): string {
  const index = Math.max(0, Math.min(step, HERO_DASHBOARD_ENTER_DELAY_STEP_COUNT - 1));
  return `hero-dashboard-enter-delay-${index}`;
}

export function heroDashboardEnterClass(step: number): string {
  return [HERO_DASHBOARD_ENTER_CLASS, heroDashboardEnterDelayClass(step)].join(" ");
}
