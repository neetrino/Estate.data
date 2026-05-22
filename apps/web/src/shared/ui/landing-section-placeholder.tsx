import {
  LANDING_CONTAINER_CLASS,
  LANDING_SECTION_MUTED_CLASS,
  LANDING_SECTION_WHITE_CLASS,
} from "@/features/home/landing/lib/landingStyles";
import {
  LAZY_SECTION_PLACEHOLDER_MIN_HEIGHT_CLASS,
  LAZY_SECTION_PLACEHOLDER_PULSE_CLASS,
} from "@/shared/lib/constants";

type LandingSectionPlaceholderProps = {
  variant?: "white" | "muted";
};

export function LandingSectionPlaceholder({ variant = "white" }: LandingSectionPlaceholderProps) {
  const sectionClass =
    variant === "muted" ? LANDING_SECTION_MUTED_CLASS : LANDING_SECTION_WHITE_CLASS;

  return (
    <section
      className={`${sectionClass} ${LAZY_SECTION_PLACEHOLDER_MIN_HEIGHT_CLASS}`}
      aria-hidden
    >
      <div className={LANDING_CONTAINER_CLASS}>
        <div className={LAZY_SECTION_PLACEHOLDER_PULSE_CLASS} />
      </div>
    </section>
  );
}
