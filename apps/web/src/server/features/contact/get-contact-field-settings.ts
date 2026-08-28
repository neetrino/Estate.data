import { DEFAULT_CONTACT_FIELD_SETTINGS } from "@/features/contact/content/contactFieldConfig";
import { parseContactFieldSettings } from "@/server/features/contact/contact-inquiry.schema";
import type { ContactFieldSetting } from "@/features/contact/content/contactFieldConfig";
import { getPrisma } from "@/server/lib/db";
import { logger } from "@/server/lib/logger";

/** Load admin contact field config, falling back to product defaults. */
export async function getContactFieldSettings(): Promise<ContactFieldSetting[]> {
  try {
    const rows = await getPrisma().contactFieldSetting.findMany({
      orderBy: { sortOrder: "asc" },
    });
    if (rows.length === 0) {
      return [...DEFAULT_CONTACT_FIELD_SETTINGS];
    }
    return parseContactFieldSettings(rows);
  } catch (error) {
    logger.warn("contact.fields.load_failed", {
      message: error instanceof Error ? error.message : "unknown",
    });
    return [...DEFAULT_CONTACT_FIELD_SETTINGS];
  }
}
