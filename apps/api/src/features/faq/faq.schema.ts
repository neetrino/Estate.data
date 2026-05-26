import { z } from "zod";

export const faqItemDtoSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export type FaqItemDto = z.infer<typeof faqItemDtoSchema>;

export const createFaqItemSchema = z.object({
  question: z.string().min(1).max(500),
  answer: z.string().min(1).max(5000),
  sortOrder: z.number().int().min(0).max(9999).optional(),
  published: z.boolean().optional(),
});

export type CreateFaqItemInput = z.infer<typeof createFaqItemSchema>;

export const updateFaqItemSchema = createFaqItemSchema.partial();

export type UpdateFaqItemInput = z.infer<typeof updateFaqItemSchema>;
