import {
  CONTACT_STUDIO_ICON_PATHS,
  type ContactStudioIconKind,
} from "@/features/contact/content/contactIconAssets";
import Image from "next/image";

/** Matches squircle asset export (location, phone, mail). */
const CONTACT_STUDIO_ICON_DIMENSION_PX = 48;

const CONTACT_STUDIO_ICON_CLASS = "size-full object-cover";

const CONTACT_STUDIO_ICON_FRAME_CLASS =
  "size-11 shrink-0 overflow-hidden rounded-2xl sm:size-12";

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
