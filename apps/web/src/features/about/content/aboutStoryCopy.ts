import { ASSET_KEYS } from "@estate/db";
import { resolveAssetUrl } from "@/shared/assets/resolve-asset-url";

export const ABOUT_STORY_IMAGE_PATH = resolveAssetUrl(ASSET_KEYS.aboutTeamCollaboration);

export const ABOUT_STORY_IMAGE_ALT =
  "Diverse team of real estate media and data specialists collaborating in a bright office";

export type AboutStorySegment = {
  readonly text: string;
  readonly accent?: true;
};

export type AboutStoryParagraph =
  | string
  | { readonly segments: readonly AboutStorySegment[] };

export const ABOUT_STORY_COPY = {
  paragraphs: [
    {
      segments: [
        { text: "Founded in 2018, " },
        { text: "Estate Data", accent: true },
        {
          text: " serves more than 300 brokers, developers, and investors across Greater Los Angeles. Our team brings together cinematographers, FAA-licensed pilots, BIM specialists, and former MLS analysts.",
        },
      ],
    },
    "We believe the best property marketing is also the most honest — which is why every shoot is paired with optional, decision-grade data.",
  ] as const satisfies readonly AboutStoryParagraph[],
} as const;
