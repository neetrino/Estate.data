import {
  type ContactInquiryAccepted,
  contactInquirySchema,
} from "@/server/features/contact/contact-inquiry.schema";
import { createContactInquiry } from "@/server/features/contact/create-contact-inquiry";
import { sendContactNotification } from "@/server/features/contact/send-contact-notification";
import { ApiError } from "@/server/lib/api-error";
import { emptyOptionsResponse, jsonSuccess } from "@/server/lib/http";
import { logger } from "@/server/lib/logger";
import { enforceContactRateLimit } from "@/server/lib/rate-limit/enforce-rate-limit";
import { handleApiRoute } from "@/server/lib/route-handler";
import { parseJsonBody } from "@/server/lib/validate";

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
