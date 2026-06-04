import { z } from "zod";

export const HOME_HERO_KEY = "home" as const;

const trimmedString = (min: number, max: number) =>
  z.string().trim().min(min).max(max);

const buttonHrefSchema = trimmedString(1, 300).refine(
  (value) =>
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://"),
  { message: "Must be an internal path (/) or http(s) URL" },
);

const imageUrlSchema = z
  .string()
  .trim()
  .max(2048)
  .refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://"),
    { message: "Must be an internal path (/) or http(s) URL" },
  );

const optionalImageUrlSchema = z.union([imageUrlSchema, z.null()]).optional();

const optionalImageKeySchema = z
  .string()
  .trim()
  .max(2048)
  .nullable()
  .optional();

export const homeHeroContentSchema = z.object({
  title: trimmedString(1, 500),
  description: trimmedString(1, 2000),
  primaryButtonLabel: trimmedString(1, 120),
  primaryButtonHref: buttonHrefSchema,
  secondaryButtonLabel: trimmedString(1, 120),
  secondaryButtonHref: buttonHrefSchema,
  desktopImageUrl: optionalImageUrlSchema,
  desktopImageKey: optionalImageKeySchema,
  mobileImageUrl: optionalImageUrlSchema,
  mobileImageKey: optionalImageKeySchema,
});

export type HomeHeroContent = z.infer<typeof homeHeroContentSchema>;

export const updateHomeHeroSchema = homeHeroContentSchema;

export type UpdateHomeHeroInput = z.infer<typeof updateHomeHeroSchema>;
