import { ASSET_KEYS, assetUrl } from "@estate/db";

export type RecentWorkProject = {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
};

/** Placeholder image until admin panel supplies project assets. */
const RECENT_WORK_PLACEHOLDER_IMAGE = assetUrl(ASSET_KEYS.recentWorkPlaceholder);

const RECENT_WORK_PLACEHOLDER_ALT =
  "Luxury hillside home overlooking the ocean at sunset";

export const HOME_RECENT_WORK_COPY = {
  eyebrow: "Recent work",
  title: "Selected LA projects",
  viewAllLabel: "View all",
  viewAllHref: "/portfolio",
  projects: [
    {
      id: "project-1",
      imageSrc: RECENT_WORK_PLACEHOLDER_IMAGE,
      imageAlt: RECENT_WORK_PLACEHOLDER_ALT,
    },
    {
      id: "project-2",
      imageSrc: RECENT_WORK_PLACEHOLDER_IMAGE,
      imageAlt: RECENT_WORK_PLACEHOLDER_ALT,
    },
    {
      id: "project-3",
      imageSrc: RECENT_WORK_PLACEHOLDER_IMAGE,
      imageAlt: RECENT_WORK_PLACEHOLDER_ALT,
    },
    {
      id: "project-4",
      imageSrc: RECENT_WORK_PLACEHOLDER_IMAGE,
      imageAlt: RECENT_WORK_PLACEHOLDER_ALT,
    },
  ] as const satisfies readonly RecentWorkProject[],
} as const;
