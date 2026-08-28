import { z } from "zod";

export const updateContactFieldsSchema = z.object({
  fields: z
    .array(
      z.object({
        fieldKey: z.string().trim().min(1).max(80),
        label: z.string().trim().min(1).max(120),
        placeholder: z.string().trim().max(200),
        mode: z.enum(["required", "optional", "hidden"]),
        sortOrder: z.number().int().min(0).max(999),
      }),
    )
    .min(1)
    .max(30),
});

export type UpdateContactFieldsInput = z.infer<typeof updateContactFieldsSchema>;
