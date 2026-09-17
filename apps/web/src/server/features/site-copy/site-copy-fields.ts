import { z } from "zod";

export const siteCopyTrimmed = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

export const siteCopyAssetUrlSchema = siteCopyTrimmed(1, 2048).refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://"),
  { message: "Must be an internal path or http(s) URL" },
);

export const siteCopyButtonHrefSchema = siteCopyTrimmed(1, 300).refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://"),
  { message: "Must be an internal path (/) or http(s) URL" },
);

export const siteCopyContactHrefSchema = siteCopyTrimmed(1, 300).refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("tel:") ||
    value.startsWith("mailto:"),
  { message: "Must be a path, http(s), tel:, or mailto:" },
);
