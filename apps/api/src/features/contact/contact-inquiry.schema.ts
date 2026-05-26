import { z } from "zod";

export const CONTACT_SERVICE_VALUES = [
  "photography",
  "cinematic-video",
  "drone-aerial",
  "tours-floorplans",
  "scan-to-bim",
  "market-intelligence",
] as const;

/** POST /api/v1/contact body — aligned with `ContactRequestForm` field names. */
export const contactInquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Valid email is required").max(320),
  propertyAddress: z
    .string()
    .trim()
    .min(1, "Property address is required")
    .max(500),
  service: z.enum(CONTACT_SERVICE_VALUES, {
    message: "Select a valid service",
  }),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Preferred date must be YYYY-MM-DD")
    .optional()
    .or(z.literal("")),
  projectDetails: z.string().trim().max(5000).optional(),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export type ContactInquiryAccepted = {
  id: string;
  received: true;
};
