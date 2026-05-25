/** Payload for POST /api/v1/contact — mirrors API Zod schema field names. */
export type ContactInquiryPayload = {
  name: string;
  email: string;
  propertyAddress: string;
  service: string;
  preferredDate?: string;
  projectDetails?: string;
};

export type ContactInquiryResult = {
  id: string;
  received: true;
};
