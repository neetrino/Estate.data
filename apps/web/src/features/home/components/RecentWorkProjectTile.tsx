import { PublicAssetImage } from "@/shared/components/media/PublicAssetImage";
import type { StudioPortfolioCard } from "@/features/home/content/studioPortfolioCatalog";
import { STUDIO_PAGE_COPY } from "@/features/home/content/studioPageCopy";
import { HomeSectionLink } from "@/shared/components/navbar/HomeSectionLink";
import { HOME_SECTION_IDS, homeSectionHref } from "@/shared/lib/homeSectionIds";

const FRAME_CLASS = "relative aspect-[4/5] w-full overflow-hidden bg-studio-card";

const IMAGE_CLASS =
  "object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105";

const OVERLAY_CLASS =
  "absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/10 to-transparent opacity-90";

const BADGE_CLASS = "studio-label bg-studio-bg/70 px-2 py-1 text-studio-accent";

const CTA_CLASS =
  "mt-5 inline-block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-studio-accent";

const SERVICE_SEPARATOR = " · ";

type RecentWorkProjectTileProps = {
  readonly project: StudioPortfolioCard;
};

function PortfolioTileBadges({ project }: { readonly project: StudioPortfolioCard }) {
  const copy = STUDIO_PAGE_COPY.portfolio;
  if (!project.hasVideo && !project.has3D) {
    return null;
  }

  return (
    <div className="mb-3 flex gap-2">
      {project.hasVideo ? <span className={BADGE_CLASS}>{copy.videoBadge}</span> : null}
      {project.has3D ? <span className={BADGE_CLASS}>{copy.tourBadge}</span> : null}
    </div>
  );
}

export function RecentWorkProjectTile({ project }: RecentWorkProjectTileProps) {
  const copy = STUDIO_PAGE_COPY.portfolio;

  return (
    <div className={FRAME_CLASS}>
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
        <PortfolioTileBadges project={project} />
        <h3 className="font-display text-xl text-studio-fg">{project.title}</h3>
        {project.location ? (
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-studio-muted">
            {project.location}
          </p>
        ) : null}
        {project.services.length > 0 ? (
          <p className="mt-3 text-sm text-studio-muted">{project.services.join(SERVICE_SEPARATOR)}</p>
        ) : null}
        <HomeSectionLink href={homeSectionHref(HOME_SECTION_IDS.quote)} className={CTA_CLASS}>
          {copy.tileCta}
        </HomeSectionLink>
      </div>
    </div>
  );
}
