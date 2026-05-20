import { ASSET_KEYS, assetUrl } from "@estate/db";

export const ABOUT_STORY_IMAGE_PATH = assetUrl(ASSET_KEYS.aboutTeamCollaboration);

export const ABOUT_STORY_IMAGE_ALT =
  "Diverse team of real estate media and data specialists collaborating in a bright office";

export const ABOUT_STORY_COPY = {
  paragraphs: [
    "Founded in 2018, ESTATEDATA serves more than 300 brokers, developers, and investors across Greater Los Angeles. Our team brings together cinematographers, FAA-licensed pilots, BIM specialists, and former MLS analysts.",
    "We believe the best property marketing is also the most honest — which is why every shoot is paired with optional, decision-grade data.",
  ] as const,
} as const;
