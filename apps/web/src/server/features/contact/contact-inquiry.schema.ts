import { z } from "zod";
import {
  CONTACT_SERVICE_VALUES,
  DEFAULT_CONTACT_FIELD_SETTINGS,
  isContactFieldMode,
  type ContactFieldMode,
  type ContactFieldSetting,
} from "@/features/contact/content/contactFieldConfig";

const EXTRA_FIELD_KEYS = [
  "propertyType",
  "squareFootage",
  "rooms",
  "floor",
  "price",
] as const;

function optionalTrimmed(max: number) {
  return z.string().trim().max(max).optional().or(z.literal(""));
}

function requiredString(max: number, message: string) {
  return z.string().trim().min(1, message).max(max);
}

function fieldSchema(mode: ContactFieldMode, max: number, message: string) {
  if (mode === "hidden") {
    return optionalTrimmed(max);
  }
  if (mode === "required") {
    return requiredString(max, message);
  }
  return optionalTrimmed(max);
}

function settingMode(settings: readonly ContactFieldSetting[], key: string): ContactFieldMode {
  const setting = settings.find((item) => item.fieldKey === key);
  return setting?.mode ?? "optional";
}

/** Build POST /api/v1/contact schema from admin field settings. */
export function buildContactInquirySchema(
  settings: readonly ContactFieldSetting[] = DEFAULT_CONTACT_FIELD_SETTINGS,
) {
  const serviceMode = settingMode(settings, "service");
  const serviceSchema =
    serviceMode === "required"
      ? z.enum(CONTACT_SERVICE_VALUES, { message: "Select a valid service" })
      : z.enum(CONTACT_SERVICE_VALUES).optional().or(z.literal(""));

  return z.object({
    name: fieldSchema(settingMode(settings, "name"), 200, "Name is required"),
    email:
      settingMode(settings, "email") === "required"
        ? z.string().trim().email("Valid email is required").max(320)
        : z.string().trim().email("Valid email is required").max(320).optional().or(z.literal("")),
    phone: fieldSchema(settingMode(settings, "phone"), 40, "Phone is required"),
    company: fieldSchema(settingMode(settings, "company"), 200, "Company is required"),
    propertyAddress: fieldSchema(
      settingMode(settings, "propertyAddress"),
      500,
      "Property address is required",
    ),
    service: serviceSchema,
    preferredDate: fieldSchema(
      settingMode(settings, "preferredDate"),
      10,
      "Preferred date is required",
    ).refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Preferred date must be YYYY-MM-DD",
    }),
    projectDetails: fieldSchema(
      settingMode(settings, "projectDetails"),
      5000,
      "Message is required",
    ),
    extraFields: z
      .object({
        propertyType: optionalTrimmed(120),
        squareFootage: optionalTrimmed(80),
        rooms: optionalTrimmed(40),
        floor: optionalTrimmed(40),
        price: optionalTrimmed(80),
      })
      .optional(),
  });
}

export const contactInquirySchema = buildContactInquirySchema();

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export type ContactInquiryAccepted = {
  id: string;
  received: true;
};

export { EXTRA_FIELD_KEYS };

export function parseContactFieldSettings(
  rows: readonly {
    fieldKey: string;
    label: string;
    placeholder: string;
    mode: string;
    sortOrder: number;
  }[],
): ContactFieldSetting[] {
  return rows
    .filter((row): row is typeof row & { mode: ContactFieldMode } =>
      isContactFieldMode(row.mode),
    )
    .map((row) => ({
      fieldKey: row.fieldKey,
      label: row.label,
      placeholder: row.placeholder,
      mode: row.mode,
      sortOrder: row.sortOrder,
    }))
    .sort((left, right) => left.sortOrder - right.sortOrder);
}
