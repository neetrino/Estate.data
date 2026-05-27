import { STUDIO_CONTACT_ICON_SOURCES } from "@/shared/lib/studioContactIconAssets";
import { STUDIO_CONTACT } from "@/shared/lib/studioContact";

export type FooterContactIconId = keyof typeof STUDIO_CONTACT_ICON_SOURCES;

export const FOOTER_CONTACT_ICON_SOURCES = STUDIO_CONTACT_ICON_SOURCES;

export const STUDIO_MAPS_HREF = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STUDIO_CONTACT.address)}`;
