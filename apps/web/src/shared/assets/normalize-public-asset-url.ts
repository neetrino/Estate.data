const LOCAL_ASSETS_PREFIX = "/assets/";
const JPEG_EXTENSION_PATTERN = /\.jpe?g$/i;

/**
 * Studio files in `public/assets/` are WebP. Older DB rows still store `.jpg`
 * (Lovable originals) which makes `/_next/image` return 400.
 */
export function normalizePublicAssetUrl(url: string): string {
  if (!url.startsWith(LOCAL_ASSETS_PREFIX) || !JPEG_EXTENSION_PATTERN.test(url)) {
    return url;
  }

  return url.replace(JPEG_EXTENSION_PATTERN, ".webp");
}
