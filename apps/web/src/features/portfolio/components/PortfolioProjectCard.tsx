import Image from "next/image";
import { type PortfolioProject } from "@/features/portfolio/content/portfolioCopy";
import { RECENT_WORK_PROJECT_ASPECT_CLASS } from "@/shared/lib/constants";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
  showTopLeftBadge: boolean;
};

const PORTFOLIO_CARD_META: Record<
  PortfolioProject["category"],
  { readonly title: string; readonly location: string; readonly categoryLabel: string }
> = {
  photo: {
    title: "Malibu Cliffside Estate",
    location: "Malibu, CA",
    categoryLabel: "Photo",
  },
  video: {
    title: "Beverly Hills Modern Villa",
    location: "Beverly Hills, CA",
    categoryLabel: "Video",
  },
  drone: {
    title: "Pacific Palisades Aerial",
    location: "Pacific Palisades, CA",
    categoryLabel: "Drone",
  },
  "3d-tour": {
    title: "Silver Lake Designer Home",
    location: "Silver Lake, CA",
    categoryLabel: "3D Tour",
  },
};

export function PortfolioProjectCard({ project, showTopLeftBadge }: PortfolioProjectCardProps) {
  const metadata = PORTFOLIO_CARD_META[project.category];

  return (
    <article
      className={[
        "group relative w-full overflow-hidden rounded-3xl border border-[#7c3aed]/15 shadow-[0_24px_70px_rgba(31,41,55,0.18)]",
        "transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300/40",
        "hover:shadow-[0_0_0_1px_rgba(124,58,237,0.18),0_28px_76px_rgba(31,41,55,0.22),0_0_36px_rgba(124,58,237,0.2)]",
        RECENT_WORK_PROJECT_ASPECT_CLASS,
      ].join(" ")}
    >
      <Image
        src={project.imageSrc}
        alt={project.imageAlt}
        fill
        loading="lazy"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(3,12,24,0.92)]"
        aria-hidden
      />

      {showTopLeftBadge ? (
        <span
          className={[
            "absolute left-5 top-5 inline-flex items-center rounded-full border border-white/20 px-3.5 py-1.5",
            "bg-[rgba(100,70,184,0.32)] text-[0.68rem] font-semibold uppercase tracking-[0.15em]",
            "text-white/95 backdrop-blur-md",
          ].join(" ")}
        >
          {metadata.categoryLabel}
        </span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="min-w-0">
          <h3 className="truncate text-[clamp(1.05rem,1.7vw,1.35rem)] font-semibold leading-tight text-white">
            {metadata.title}
          </h3>
          <p className="mt-1.5 truncate text-[0.8rem] text-white/85">{metadata.location}</p>
        </div>
      </div>
    </article>
  );
}
