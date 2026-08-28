const GOOGLE_MAPS_EMBED_ORIGIN = "https://www.google.com/maps";
const OSM_EMBED_ORIGIN = "https://www.openstreetmap.org/export/embed.html";

/** LA basin view: Malibu / Valley through Long Beach / Anaheim. */
const SERVICE_AREA_MAP_BBOX = {
  west: -118.68,
  south: 33.72,
  east: -117.72,
  north: 34.28,
} as const;

const SERVICE_AREA_MAP_MARKER = {
  lat: 34.0522,
  lng: -118.2437,
} as const;

export const STUDIO_CONTACT = {
  address: "Los Angeles & surrounding areas",
  phone: {
    label: "(310) 555-0142",
    href: "tel:+13105550142",
  },
  email: {
    label: "studio@estatedata.cloud",
    href: "mailto:studio@estatedata.cloud",
  },
  hours: "Mon – Sat · 7:00 AM – 8:00 PM PT",
} as const;

/** Google Maps embed iframe URL for the contact page. */
export function studioMapEmbedUrl(): string {
  const query = encodeURIComponent("Los Angeles, CA");
  return `${GOOGLE_MAPS_EMBED_ORIGIN}?q=${query}&output=embed`;
}

/** OpenStreetMap embed for the home Service Area section. */
export function studioServiceAreaMapEmbedUrl(): string {
  const bbox = [
    SERVICE_AREA_MAP_BBOX.west,
    SERVICE_AREA_MAP_BBOX.south,
    SERVICE_AREA_MAP_BBOX.east,
    SERVICE_AREA_MAP_BBOX.north,
  ].join(",");
  const marker = `${SERVICE_AREA_MAP_MARKER.lat},${SERVICE_AREA_MAP_MARKER.lng}`;
  const params = new URLSearchParams({
    bbox,
    layer: "mapnik",
    marker,
  });
  return `${OSM_EMBED_ORIGIN}?${params.toString()}`;
}
