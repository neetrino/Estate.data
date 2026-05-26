import {
  type ContactInquiryAccepted,
  contactInquirySchema,
} from "@/features/contact/contact-inquiry.schema";
import { createContactInquiry } from "@/features/contact/create-contact-inquiry";
import { sendContactNotification } from "@/features/contact/send-contact-notification";
import { ApiError } from "@/lib/api-error";
import { emptyOptionsResponse, jsonSuccess } from "@/lib/http";
import { logger } from "@/lib/logger";
import { enforceContactRateLimit } from "@/lib/rate-limit/enforce-rate-limit";
import { handleApiRoute } from "@/lib/route-handler";
import { parseJsonBody } from "@/lib/validate";

async function postContact(
  request: Request
): Promise<Response> {
  const rateLimit = await enforceContactRateLimit(request);
  if (!rateLimit.success) {
    throw ApiError.rateLimited(rateLimit.retryAfterSeconds);
  }

  const body = await parseJsonBody(request, contactInquirySchema);
  const inquiry = await createContactInquiry(body);

  await sendContactNotification(body, inquiry.id);

  logger.info("contact.inquiry.created", {
    id: inquiry.id,
    service: body.service,
  });

  const data: ContactInquiryAccepted = {
    id: inquiry.id,
    received: true,
  };

  return jsonSuccess(data, { status: 201 });
}

export const POST = handleApiRoute(postContact);

export async function OPTIONS(): Promise<Response> {
  return emptyOptionsResponse();
}
