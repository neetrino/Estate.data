import Image from "next/image";
import {
  HOME_PROPERTY_INTELLIGENCE_VISUAL_ALT,
  HOME_PROPERTY_INTELLIGENCE_VISUAL_PATH,
} from "@/features/home/content/propertyIntelligenceCopy";
import { PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS } from "@/shared/lib/constants";

export function HomePropertyIntelligenceVisual() {
  return (
    <div
      className={`home-property-intelligence-visual ${PROPERTY_INTELLIGENCE_HOME_VISUAL_FRAME_CLASS}`}
    >
      <Image
        src={HOME_PROPERTY_INTELLIGENCE_VISUAL_PATH}
        alt={HOME_PROPERTY_INTELLIGENCE_VISUAL_ALT}
        fill
        loading="lazy"
        className="home-property-intelligence-visual__image"
        sizes="(max-width: 1024px) 100vw, 48vw"
      />
    </div>
  );
}
