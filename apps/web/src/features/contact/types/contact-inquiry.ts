/** Payload for POST /api/v1/contact — mirrors API Zod schema field names. */
export type ContactInquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  propertyAddress?: string;
  service: string;
  preferredDate?: string;
  projectDetails?: string;
  extraFields?: {
    propertyType?: string;
    squareFootage?: string;
    rooms?: string;
    floor?: string;
    price?: string;
  };
};

export type ContactInquiryResult = {
  id: string;
  received: true;
};
