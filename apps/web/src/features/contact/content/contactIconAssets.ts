/** Bump when replacing files under `public/icons/contact/`. */
const CONTACT_STUDIO_ICON_VERSION = "20260601";

function contactStudioIconPath(filename: string): string {
  return `/icons/contact/${filename}?v=${CONTACT_STUDIO_ICON_VERSION}`;
}

/** Studio contact row icons — static files in `public/icons/contact/`. */
export const CONTACT_STUDIO_ICON_PATHS = {
  location: contactStudioIconPath("location.png"),
  phone: contactStudioIconPath("phone.png"),
  /** `mail.png` — filename avoids `email` in URL (some ad blockers). */
  email: contactStudioIconPath("mail.png"),
} as const;

export type ContactStudioIconKind = keyof typeof CONTACT_STUDIO_ICON_PATHS;
