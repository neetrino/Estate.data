import { LazyScanToBimBuildingAnimation } from "@/features/services/data/lib/lazyDataServicesComponents";
import { PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS } from "@/shared/lib/constants";

const DATA_SERVICES_FEATURE_IMAGE_FRAME_CLASS = `relative w-full overflow-hidden rounded-2xl ${PROPERTY_INTELLIGENCE_IMAGE_ASPECT_CLASS}`;

export function DataServicesFeatureImage() {
  return (
    <div className={DATA_SERVICES_FEATURE_IMAGE_FRAME_CLASS}>
      <LazyScanToBimBuildingAnimation />
    </div>
  );
}
