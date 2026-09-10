import { z } from "zod";
import { QUOTE_CONTACT_FIELD_KEYS } from "@/features/contact/content/contactFieldConfig";

export const updateContactFieldsSchema = z.object({
  fields: z
    .array(
      z.object({
        fieldKey: z.enum(QUOTE_CONTACT_FIELD_KEYS),
        label: z.string().trim().min(1).max(120),
        placeholder: z.string().trim().max(200),
        mode: z.enum(["required", "optional", "hidden"]),
        sortOrder: z.number().int().min(0).max(999),
      }),
    )
    .min(1)
    .max(QUOTE_CONTACT_FIELD_KEYS.length),
});

export type UpdateContactFieldsInput = z.infer<typeof updateContactFieldsSchema>;
