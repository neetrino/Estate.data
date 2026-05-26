import "@/features/home/styles/landing-section-blends.css";

export type LandingSectionBlendTone = "surface" | "white" | "soft";

type LandingSectionBlendProps = {
  edge: "top" | "bottom";
  tone: LandingSectionBlendTone;
};

const BLEND_TONE_CLASS: Record<LandingSectionBlendTone, string> = {
  surface: "home-landing-section-blend--tone-surface",
  white: "home-landing-section-blend--tone-white",
  soft: "home-landing-section-blend--tone-soft",
};

/** Gradient fade at the top or bottom edge of a photo / decorated section. */
export function LandingSectionBlend({ edge, tone }: LandingSectionBlendProps) {
  const edgeClass =
    edge === "top" ? "home-landing-section-blend--top" : "home-landing-section-blend--bottom";

  return (
    <div
      className={["home-landing-section-blend", edgeClass, BLEND_TONE_CLASS[tone]].join(" ")}
      aria-hidden
    />
  );
}
