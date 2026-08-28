import Image from "next/image";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";

type RecentWorkProjectTileProps = {
  project: RecentWorkProject;
};

export function RecentWorkProjectTile({ project }: RecentWorkProjectTileProps) {
  return (
    <article className="relative aspect-[4/5] w-full overflow-hidden bg-studio-card">
      <Image
        src={project.imageSrc}
        alt={project.imageAlt}
        fill
        loading="lazy"
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="studio-veil absolute inset-0" />
      <p className="absolute inset-x-0 bottom-0 p-6 font-display text-lg text-studio-fg">
        {project.imageAlt}
      </p>
    </article>
  );
}
