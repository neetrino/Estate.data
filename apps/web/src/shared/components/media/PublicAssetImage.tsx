import Image, { type ImageProps } from "next/image";
import { normalizePublicAssetUrl } from "@/shared/assets/normalize-public-asset-url";

const REMOTE_SRC_PATTERN = /^https?:\/\//u;

/** `next/image` wrapper that maps stale `/assets/*.jpg` DB paths to on-disk WebP. */
export function PublicAssetImage({ src, alt, unoptimized, referrerPolicy, ...props }: ImageProps) {
  const resolvedSrc = typeof src === "string" ? normalizePublicAssetUrl(src) : src;
  const isRemote = typeof resolvedSrc === "string" && REMOTE_SRC_PATTERN.test(resolvedSrc);

  return (
    <Image
      src={resolvedSrc}
      alt={alt}
      unoptimized={unoptimized ?? isRemote}
      referrerPolicy={referrerPolicy ?? (isRemote ? "no-referrer" : undefined)}
      {...props}
    />
  );
}
