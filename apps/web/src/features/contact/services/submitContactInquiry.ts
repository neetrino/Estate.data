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

function readTrimmed(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

/** Map native form fields to API JSON body. */
export function contactFormToPayload(form: HTMLFormElement): ContactInquiryPayload {
  const data = new FormData(form);
  const extraFields = {
    propertyType: readTrimmed(data, "propertyType"),
    squareFootage: readTrimmed(data, "squareFootage"),
    rooms: readTrimmed(data, "rooms"),
    floor: readTrimmed(data, "floor"),
    price: readTrimmed(data, "price"),
  };
  const hasExtra = Object.values(extraFields).some(Boolean);

  return {
    name: readTrimmed(data, "name"),
    email: readTrimmed(data, "email"),
    ...(readTrimmed(data, "phone") ? { phone: readTrimmed(data, "phone") } : {}),
    ...(readTrimmed(data, "company") ? { company: readTrimmed(data, "company") } : {}),
    ...(readTrimmed(data, "propertyAddress")
      ? { propertyAddress: readTrimmed(data, "propertyAddress") }
      : {}),
    service: readTrimmed(data, "service"),
    ...(readTrimmed(data, "preferredDate")
      ? { preferredDate: readTrimmed(data, "preferredDate") }
      : {}),
    ...(readTrimmed(data, "projectDetails")
      ? { projectDetails: readTrimmed(data, "projectDetails") }
      : {}),
    ...(hasExtra ? { extraFields } : {}),
  };
}
