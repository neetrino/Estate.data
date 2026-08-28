import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";

export type RecentWorkProject = {
  readonly id: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
};

export const HOME_RECENT_WORK_COPY = {
  eyebrow: "Recent work",
  title: "Selected LA projects",
  viewAllLabel: "View all",
  viewAllHref: "/portfolio",
  projects: [
    {
      id: "project-1",
      imageSrc: STUDIO_MEDIA.portfolio1,
      imageAlt: "Modern Beverly Hills Residence in Beverly Hills, CA — Photography, Cinematic Video, Drone, Matterport",
    },
    {
      id: "project-2",
      imageSrc: STUDIO_MEDIA.portfolio2,
      imageAlt: "Wilshire Corporate Lobby in Downtown Los Angeles, CA — Architectural Photography, 3D Laser Scanning, Scan-to-BIM",
    },
    {
      id: "project-3",
      imageSrc: STUDIO_MEDIA.portfolio3,
      imageAlt: "Venice Architectural Loft in Venice, CA — Photography, Cinematic Video, Virtual Staging",
    },
  ] as const satisfies readonly RecentWorkProject[],
} as const;
