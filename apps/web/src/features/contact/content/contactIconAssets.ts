/** Studio contact row icons — squircle PNGs in `public/images/contact/`. */
export const CONTACT_STUDIO_ICON_PATHS = {
  location: "/images/contact/location.png",
  phone: "/images/contact/phone.png",
  /** `mail` not `email` — some ad blockers hide URLs containing `email`. */
  email: "/images/contact/mail.png",
} as const;

export type ContactStudioIconKind = keyof typeof CONTACT_STUDIO_ICON_PATHS;
