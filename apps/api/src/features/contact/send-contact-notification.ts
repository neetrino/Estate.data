import { Resend } from "resend";
import type { ContactInquiryInput } from "@/features/contact/contact-inquiry.schema";
import { getResendConfig } from "@/lib/integrations-env";
import { logger } from "@/lib/logger";

function formatContactEmailHtml(input: ContactInquiryInput, inquiryId: string): string {
  const lines = [
    `<p><strong>New contact inquiry</strong> (${inquiryId})</p>`,
    `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>`,
    `<p><strong>Property:</strong> ${escapeHtml(input.propertyAddress)}</p>`,
    `<p><strong>Service:</strong> ${escapeHtml(input.service)}</p>`,
  ];

  if (input.preferredDate) {
    lines.push(`<p><strong>Preferred date:</strong> ${escapeHtml(input.preferredDate)}</p>`);
  }

  if (input.projectDetails) {
    lines.push(`<p><strong>Details:</strong></p><p>${escapeHtml(input.projectDetails)}</p>`);
  }

  return lines.join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Send staff notification via Resend — no-op when not configured. */
export async function sendContactNotification(
  input: ContactInquiryInput,
  inquiryId: string,
): Promise<boolean> {
  const config = getResendConfig();
  if (!config) {
    logger.info("contact.email.skipped", { reason: "resend_not_configured", inquiryId });
    return false;
  }

  const resend = new Resend(config.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: config.RESEND_FROM_EMAIL,
    to: config.CONTACT_NOTIFY_EMAIL,
    replyTo: input.email,
    subject: `Contact inquiry from ${input.name}`,
    html: formatContactEmailHtml(input, inquiryId),
  });

  if (error) {
    logger.error("contact.email.failed", {
      inquiryId,
      message: error.message,
    });
    return false;
  }

  logger.info("contact.email.sent", { inquiryId });
  return true;
}
