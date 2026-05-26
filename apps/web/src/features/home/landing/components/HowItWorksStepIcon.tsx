import type { HowItWorksIconId } from "@/features/home/content/howItWorksCopy";
import { HOW_IT_WORKS_ICON_SOURCES } from "@/features/home/landing/lib/howItWorksAssets";

type HowItWorksStepIconProps = {
  icon: HowItWorksIconId;
};

export function HowItWorksStepIcon({ icon }: HowItWorksStepIconProps) {
  const sources = HOW_IT_WORKS_ICON_SOURCES[icon];

  return (
    <picture className="how-it-works-step-icon-picture block size-full">
      <source srcSet={sources.retina} media="(min-resolution: 2dppx), (-webkit-min-device-pixel-ratio: 2)" />
      <img
        src={sources.display}
        alt=""
        width={160}
        height={160}
        decoding="async"
        className="how-it-works-step-icon-image size-full object-contain"
      />
    </picture>
  );
}
