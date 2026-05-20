const GOOGLE_MAPS_EMBED_ORIGIN = "https://www.google.com/maps";

export const STUDIO_CONTACT = {
  address: "1234 Sunset Blvd, Los Angeles, CA 90026",
  phone: {
    label: "(323) 555-0142",
    href: "tel:+13235550142",
  },
  email: {
    label: "hello@estatedata.com",
    href: "mailto:hello@estatedata.com",
  },
} as const;

/** Google Maps embed iframe URL for {@link STUDIO_CONTACT.address}. */
export function studioMapEmbedUrl(): string {
  const query = encodeURIComponent(STUDIO_CONTACT.address);
  return `${GOOGLE_MAPS_EMBED_ORIGIN}?q=${query}&output=embed`;
}
