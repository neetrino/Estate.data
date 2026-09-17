import { ChevronLeft, ChevronRight } from "lucide-react";
import { STUDIO_EXAMPLE_MODAL_COPY } from "@/features/home/content/studioPageCopy";
import type { StudioServiceExample } from "@/features/home/content/studioServiceExamples";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

const MEDIA_CLASS = "studio-example-modal__media";
const MEDIA_IMAGE_COVER_CLASS = "studio-example-modal__img--cover";
const MEDIA_IMAGE_CONTAIN_CLASS = "studio-example-modal__img--contain";

const NAV_BUTTON_CLASS = [
  "absolute top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center",
  "bg-studio-bg/80 text-studio-fg backdrop-blur-sm",
  "transition-colors hover:bg-studio-accent hover:text-studio-accent-fg",
  "focus:outline-none focus:ring-2 focus:ring-studio-accent",
].join(" ");

const CONTAIN_WIDTH = 1200;
const CONTAIN_HEIGHT = 1500;
const COVER_WIDTH = 1400;
const COVER_HEIGHT = 875;

type StudioExampleModalMediaProps = {
  readonly example: StudioServiceExample;
  readonly sectionKey: string;
  readonly onPrev: () => void;
  readonly onNext: () => void;
};

function isEditingLoftExample(sectionKey: string, imageUrl: string): boolean {
  return sectionKey === HOME_SECTION_IDS.editing || imageUrl.includes("portfolio-3");
}

export function StudioExampleModalMedia({
  example,
  sectionKey,
  onPrev,
  onNext,
}: StudioExampleModalMediaProps) {
  const imageSrc = normalizePublicAssetUrl(example.imageUrl);
  const showFullImage = isEditingLoftExample(sectionKey, example.imageUrl);

  return (
    <div className={MEDIA_CLASS}>
      {example.embedUrl ? (
        <iframe
          title={example.title}
          src={example.embedUrl}
          loading="lazy"
          allow="xr-spatial-tracking; fullscreen"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- portal dialog matches master <img>
        <img
          src={imageSrc}
          alt={example.title}
          width={showFullImage ? CONTAIN_WIDTH : COVER_WIDTH}
          height={showFullImage ? CONTAIN_HEIGHT : COVER_HEIGHT}
          loading="lazy"
          className={showFullImage ? MEDIA_IMAGE_CONTAIN_CLASS : MEDIA_IMAGE_COVER_CLASS}
        />
      )}
      <button
        type="button"
        className={`${NAV_BUTTON_CLASS} left-2`}
        aria-label={STUDIO_EXAMPLE_MODAL_COPY.previousServiceLabel}
        onClick={onPrev}
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>
      <button
        type="button"
        className={`${NAV_BUTTON_CLASS} right-2`}
        aria-label={STUDIO_EXAMPLE_MODAL_COPY.nextServiceLabel}
        onClick={onNext}
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
