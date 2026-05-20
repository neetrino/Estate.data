import {
  CONTACT_STUDIO_ICON_PATHS,
  type ContactStudioIconKind,
} from "@/features/contact/content/contactIconAssets";
import Image from "next/image";

/** Matches largest frame size for `next/image` width/height. */
const CONTACT_STUDIO_ICON_DIMENSION_PX = 44;

const CONTACT_STUDIO_ICON_CLASS = "size-full object-contain";

/** Clips export letterboxing; squircle art fills the box. */
const CONTACT_STUDIO_ICON_FRAME_CLASS =
  "size-10 shrink-0 overflow-hidden rounded-[28%] sm:size-11";

type ContactStudioIconProps = {
  kind: ContactStudioIconKind;
  label: string;
};

export function ContactStudioIcon({ kind, label }: ContactStudioIconProps) {
  return (
    <span className={CONTACT_STUDIO_ICON_FRAME_CLASS}>
      <Image
        src={CONTACT_STUDIO_ICON_PATHS[kind]}
        alt=""
        aria-label={label}
        width={CONTACT_STUDIO_ICON_DIMENSION_PX}
        height={CONTACT_STUDIO_ICON_DIMENSION_PX}
        className={CONTACT_STUDIO_ICON_CLASS}
        unoptimized
      />
    </span>
  );
}
