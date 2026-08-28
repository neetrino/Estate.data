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
      placeholder: "Select a service",
    },
    preferredDate: { label: "Desired Shoot Date", placeholder: "Select a date" },
    projectDetails: {
      label: "Additional Notes",
      placeholder: "Anything else we should know about the property or shoot.",
    },
  },
  submitLabel: "Get My Quote",
  submittingLabel: "Sending…",
  successMessage:
    "Thanks — we received your request and will return a scoped quote the same business day.",
  errorMessage: "Something went wrong. Please try again in a moment.",
} as const;
