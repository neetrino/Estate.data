import Image from "next/image";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import { RECENT_WORK_PROJECT_ASPECT_CLASS } from "@/shared/lib/constants";

type RecentWorkProjectTileProps = {
  project: RecentWorkProject;
};

export function RecentWorkProjectTile({ project }: RecentWorkProjectTileProps) {
  return (
    <article
      className={`relative w-full overflow-hidden rounded-2xl bg-black/5 ${RECENT_WORK_PROJECT_ASPECT_CLASS}`}
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
