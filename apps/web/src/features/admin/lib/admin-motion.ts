import type { Variants } from "motion/react";

export const ADMIN_MOTION_EASE = [0.22, 1, 0.36, 1] as const;

export const adminStaggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const adminFadeUpItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ADMIN_MOTION_EASE },
  },
};

export const adminHeroBlobTransition = {
  duration: 8,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};
