export const CONTACT_FORM_COPY = {
  fields: {
    name: { label: "Name", placeholder: "Jane Smith" },
    email: { label: "Email", placeholder: "you@example.com" },
    propertyAddress: {
      label: "Property Address",
      placeholder: "1234 Sunset Blvd, Los Angeles, CA",
    },
    service: {
      label: "Services Required",
      placeholder: "Select one or more services",
    },
    preferredDate: { label: "Desired Shoot Date", placeholder: "Select a date" },
    projectDetails: {
      label: "Additional Notes",
      placeholder: "Anything else we should know about the property or shoot.",
    },
  },
  submitLabel: "Get My Quote",
  submittingLabel: "Sending…",
  successEyebrow: "Request received",
  successMessage: "Thank you. Our team will review your project and contact you shortly.",
  errorMessage: "Something went wrong. Please try again in a moment.",
  servicesRequiredMessage: "Select at least one service.",
} as const;
