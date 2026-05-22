export const CONTACT_FORM_SERVICE_OPTIONS = [
  { value: "photography", label: "Photography" },
  { value: "cinematic-video", label: "Cinematic Video" },
  { value: "drone-aerial", label: "Drone & Aerial" },
  { value: "tours-floorplans", label: "3D Tours & Floorplans" },
  { value: "scan-to-bim", label: "Scan to BIM" },
  { value: "market-intelligence", label: "Market Intelligence" },
] as const;

export const CONTACT_FORM_COPY = {
  fields: {
    name: { label: "Your name", placeholder: "Jane Smith" },
    email: { label: "Email", placeholder: "you@example.com" },
    propertyAddress: {
      label: "Property address",
      placeholder: "1234 Sunset Blvd, Los Angeles, CA",
    },
    service: {
      label: "Service needed",
      placeholder: "Select a service",
    },
    preferredDate: { label: "Preferred date", placeholder: "" },
    projectDetails: {
      label: "Project details",
      placeholder: "Square footage, timeline, deliverables, or anything else we should know.",
    },
  },
  submitLabel: "Send request",
} as const;
