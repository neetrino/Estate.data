import { z } from "zod";

export const recentWorkProjectDtoSchema = z.object({
  id: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
});

export type RecentWorkProjectDto = z.infer<typeof recentWorkProjectDtoSchema>;

export const recentWorkListSchema = z.array(recentWorkProjectDtoSchema);
