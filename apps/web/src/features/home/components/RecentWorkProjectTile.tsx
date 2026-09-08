import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import type { RecentWorkProject } from "@/features/home/content/recentWorkCopy";
import { parseRecentWorkAlt } from "@/features/home/content/parseRecentWorkAlt";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";

const FRAME_CLASS = "relative aspect-[4/5] w-full overflow-hidden bg-studio-card";

const IMAGE_CLASS =
  "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105";

const OVERLAY_CLASS =
  "absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/10 to-transparent opacity-90";

const SERVICE_SEPARATOR = " · ";

type RecentWorkProjectTileProps = {
  readonly project: RecentWorkProject;
};

export function RecentWorkProjectTile({ project }: RecentWorkProjectTileProps) {
  const { title, location, services } = parseRecentWorkAlt(project.imageAlt);

  return (
    <article className={FRAME_CLASS}>
      <PublicAssetImage
        src={project.imageSrc}
        alt={project.imageAlt}
        fill
        loading="lazy"
        className={IMAGE_CLASS}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className={OVERLAY_CLASS} />
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="font-display text-xl text-studio-fg">{title}</h3>
        {location ? (
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-studio-muted">{location}</p>
        ) : null}
        {services.length > 0 ? (
          <p className="mt-3 text-sm text-studio-muted">{services.join(SERVICE_SEPARATOR)}</p>
        ) : null}
        <span className="mt-5 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-studio-accent">
          {STUDIO_PAGE_COPY.portfolio.tileCta}
        </span>
      </div>
    </article>
  );
}
