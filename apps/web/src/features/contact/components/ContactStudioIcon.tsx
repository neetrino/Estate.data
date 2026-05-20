import {
  CONTACT_STUDIO_ICON_PATHS,
  type ContactStudioIconKind,
} from "@/features/contact/content/contactIconAssets";
import Image from "next/image";

/** Matches `size-14` (56px) for `next/image` width/height. */
const CONTACT_STUDIO_ICON_DIMENSION_PX = 56;

const CONTACT_STUDIO_ICON_CLASS = "size-12 shrink-0 sm:size-14";

type ContactStudioIconProps = {
  kind: ContactStudioIconKind;
  label: string;
};

export function ContactStudioIcon({ kind, label }: ContactStudioIconProps) {
  return (
    <Image
      src={CONTACT_STUDIO_ICON_PATHS[kind]}
      alt=""
      aria-label={label}
      width={CONTACT_STUDIO_ICON_DIMENSION_PX}
      height={CONTACT_STUDIO_ICON_DIMENSION_PX}
      className={CONTACT_STUDIO_ICON_CLASS}
    />
  );
}
