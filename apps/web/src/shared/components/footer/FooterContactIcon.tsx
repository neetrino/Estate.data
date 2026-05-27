import Image from "next/image";

import {
  STUDIO_CONTACT_ICON_SOURCES,
  type StudioContactIconId,
} from "@/shared/lib/studioContactIconAssets";

import "@/shared/components/footer/site-footer.css";

const FOOTER_CONTACT_ICON_SIZE_PX = 48;

type FooterContactIconProps = {
  id: StudioContactIconId;
};

export function FooterContactIcon({ id }: FooterContactIconProps) {
  return (
    <span className="footer-contact-icon-slot" aria-hidden>
      <Image
        src={STUDIO_CONTACT_ICON_SOURCES[id]}
        alt=""
        width={FOOTER_CONTACT_ICON_SIZE_PX}
        height={FOOTER_CONTACT_ICON_SIZE_PX}
        className="footer-contact-icon"
        unoptimized
      />
    </span>
  );
}
