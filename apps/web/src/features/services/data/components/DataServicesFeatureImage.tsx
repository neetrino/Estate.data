import Image from "next/image";
import {
  DATA_SERVICES_FEATURE_IMAGE_ALT,
  DATA_SERVICES_FEATURE_IMAGE_PATH,
} from "@/features/services/data/content/dataServicesCopy";
import { PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS } from "@/shared/lib/constants";

const DATA_SERVICES_FEATURE_IMAGE_FRAME_CLASS = `relative w-full overflow-hidden rounded-2xl ${PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS}`;

export function DataServicesFeatureImage() {
  return (
    <div className={DATA_SERVICES_FEATURE_IMAGE_FRAME_CLASS}>
      <Image
        src={DATA_SERVICES_FEATURE_IMAGE_PATH}
        alt={DATA_SERVICES_FEATURE_IMAGE_ALT}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}
