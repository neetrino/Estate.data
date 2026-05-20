/** Studio contact row icons — orange squircle PNGs in `public/images/contact/`. */
export const CONTACT_STUDIO_ICON_PATHS = {
  location: "/images/contact/location.png",
  phone: "/images/contact/phone.png",
  email: "/images/contact/email.png",
} as const;

export type ContactStudioIconKind = keyof typeof CONTACT_STUDIO_ICON_PATHS;
