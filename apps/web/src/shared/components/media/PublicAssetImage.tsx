import Image, { type ImageProps } from "next/image";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

/** `next/image` wrapper that maps stale `/assets/*.jpg` DB paths to on-disk WebP. */
export function PublicAssetImage({ src, ...props }: ImageProps) {
  const resolvedSrc = typeof src === "string" ? normalizePublicAssetUrl(src) : src;

  return <Image src={resolvedSrc} {...props} />;
}
