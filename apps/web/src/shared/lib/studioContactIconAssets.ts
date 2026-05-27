/** Shared studio contact icons (footer). Bump when replacing assets. */
const STUDIO_CONTACT_ICON_VERSION = "20260527";

function studioContactIconPath(filename: string): string {
  return `/images/footer/${filename}?v=${STUDIO_CONTACT_ICON_VERSION}`;
}

export const STUDIO_CONTACT_ICON_SOURCES = {
  email: studioContactIconPath("icon-email.png"),
  location: studioContactIconPath("icon-location.png"),
  phone: studioContactIconPath("icon-phone.png"),
} as const;

export type StudioContactIconId = keyof typeof STUDIO_CONTACT_ICON_SOURCES;
