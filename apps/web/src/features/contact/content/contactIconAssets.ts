/** Bump when replacing files under `public/images/contact/`. */
const CONTACT_STUDIO_ICON_VERSION = "20260521";

function contactStudioIconPath(filename: string): string {
  return `/images/contact/${filename}?v=${CONTACT_STUDIO_ICON_VERSION}`;
}

/** Studio contact row icons — static files in `public/images/contact/`. */
export const CONTACT_STUDIO_ICON_PATHS = {
  location: contactStudioIconPath("location.png"),
  phone: contactStudioIconPath("phone.png"),
  /** `mail.png` — filename avoids `email` in URL (some ad blockers). */
  email: contactStudioIconPath("mail.png"),
} as const;

export type ContactStudioIconKind = keyof typeof CONTACT_STUDIO_ICON_PATHS;
