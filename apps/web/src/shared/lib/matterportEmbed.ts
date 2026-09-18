const MATTERPORT_SPACE_ID_PATTERN = /^[A-Za-z0-9_-]{6,32}$/u;
const MATTERPORT_EMBED_HOST = "https://my.matterport.com/show/";

export const DEFAULT_MATTERPORT_SPACE_ID = "SxQL3iGyoDo";
export const DEFAULT_MATTERPORT_DEMO_LABEL = "Interactive demo";
export const DEFAULT_MATTERPORT_DEMO_TITLE = "Interactive Matterport 3D tour demo";

/** Extract a Matterport space id from a raw id or a share/embed link. */
export function parseMatterportSpaceId(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (MATTERPORT_SPACE_ID_PATTERN.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    const spaceId = url.searchParams.get("m")?.trim() ?? "";
    return MATTERPORT_SPACE_ID_PATTERN.test(spaceId) ? spaceId : null;
  } catch {
    return null;
  }
}

/** Share URL shown in admin; visitors still get the player via `matterportEmbedUrl`. */
export function matterportShareUrl(spaceId: string): string {
  return `${MATTERPORT_EMBED_HOST}?m=${encodeURIComponent(spaceId)}`;
}

/** Public iframe src for a Matterport space. */
export function matterportEmbedUrl(spaceId: string): string {
  const params = new URLSearchParams({ m: spaceId, play: "1", brand: "0" });
  return `${MATTERPORT_EMBED_HOST}?${params.toString()}`;
}
