import { z } from "zod";
import { PORTFOLIO_MEDIA_CATEGORIES } from "@estate/db";

export const portfolioProjectDtoSchema = z.object({
  id: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
  category: z.enum(PORTFOLIO_MEDIA_CATEGORIES),
});

export type PortfolioProjectDto = z.infer<typeof portfolioProjectDtoSchema>;

export const createPortfolioProjectSchema = z.object({
  imageUrl: z.string().min(1).max(2048),
  imageAlt: z.string().min(1).max(500),
  category: z.enum(PORTFOLIO_MEDIA_CATEGORIES),
  sortOrder: z.number().int().min(0).max(9999).optional(),
  featuredOnHome: z.boolean().optional(),
  published: z.boolean().optional(),
});

export type CreatePortfolioProjectInput = z.infer<
  typeof createPortfolioProjectSchema
>;

export const updatePortfolioProjectSchema = createPortfolioProjectSchema.partial();

export type UpdatePortfolioProjectInput = z.infer<
  typeof updatePortfolioProjectSchema
>;
