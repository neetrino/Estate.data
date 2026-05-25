import { clientEnv } from "@/config/env";
import type {
  ContactInquiryPayload,
  ContactInquiryResult,
} from "@/features/contact/types/contact-inquiry";
import { API_ROUTES, apiClient } from "@/shared/api";

const MOCK_CONTACT_ID = "mock-contact-inquiry";

/** Submit contact form to the API (mock succeeds locally when configured). */
export async function submitContactInquiry(
  payload: ContactInquiryPayload,
): Promise<ContactInquiryResult> {
  if (clientEnv.NEXT_PUBLIC_USE_MOCK_API) {
    return { id: MOCK_CONTACT_ID, received: true };
  }

  return apiClient.post<ContactInquiryResult>(API_ROUTES.contact, payload);
}

/** Map native form fields to API JSON body. */
export function contactFormToPayload(form: HTMLFormElement): ContactInquiryPayload {
  const data = new FormData(form);

  const preferredDate = String(data.get("preferredDate") ?? "").trim();
  const projectDetails = String(data.get("projectDetails") ?? "").trim();

  return {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    propertyAddress: String(data.get("propertyAddress") ?? "").trim(),
    service: String(data.get("service") ?? "").trim(),
    ...(preferredDate ? { preferredDate } : {}),
    ...(projectDetails ? { projectDetails } : {}),
  };
}
