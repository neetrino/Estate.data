import { SERVICE_DETAIL_COPY_CREATIVE } from "@/features/services/shared/serviceDetailCopyCreative";
import { SERVICE_DETAIL_COPY_GROWTH } from "@/features/services/shared/serviceDetailCopyGrowth";
import { SERVICE_DETAIL_COPY_SPATIAL } from "@/features/services/shared/serviceDetailCopySpatial";
import type { ServiceDetailCopyMap } from "@/features/services/shared/serviceDetailTypes";

export type { ServiceDetailCopy } from "@/features/services/shared/serviceDetailTypes";

export const SERVICE_DETAIL_COPY = {
  ...SERVICE_DETAIL_COPY_CREATIVE,
  ...SERVICE_DETAIL_COPY_SPATIAL,
  ...SERVICE_DETAIL_COPY_GROWTH,
} as const satisfies ServiceDetailCopyMap;
