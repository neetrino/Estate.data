import Image from "next/image";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import { LANDING_GLASS_CARD_CLASS } from "@/features/home/landing/lib/landingStyles";
import { RECENT_WORK_PROJECT_ASPECT_CLASS } from "@/shared/lib/constants";

type RecentWorkProjectTileProps = {
  project: RecentWorkProject;
};

export function RecentWorkProjectTile({ project }: RecentWorkProjectTileProps) {
  return (
    <article
      className={`${LANDING_GLASS_CARD_CLASS} relative w-full overflow-hidden rounded-3xl ${RECENT_WORK_PROJECT_ASPECT_CLASS}`}
    >
      <Image
        src={project.imageSrc}
        alt={project.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 592px"
      />
    </article>
  );
}
