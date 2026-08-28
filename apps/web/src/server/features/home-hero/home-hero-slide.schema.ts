import { z } from "zod";

const imageUrl = z
  .string()
  .trim()
  .min(1)
  .max(2048)
  .refine(
    (value) =>
      value.startsWith("/") ||
      value.startsWith("http://") ||
      value.startsWith("https://"),
    { message: "Must be an internal path or http(s) URL" },
  );

export const createHomeHeroSlideSchema = z.object({
  imageUrl,
  thumbUrl: imageUrl,
  alt: z.string().trim().min(1).max(200),
  sortOrder: z.number().int().min(0).max(999).optional(),
  published: z.boolean().optional(),
});

export const updateHomeHeroSlideSchema = createHomeHeroSlideSchema.partial();

export type CreateHomeHeroSlideInput = z.infer<typeof createHomeHeroSlideSchema>;
export type UpdateHomeHeroSlideInput = z.infer<typeof updateHomeHeroSlideSchema>;
