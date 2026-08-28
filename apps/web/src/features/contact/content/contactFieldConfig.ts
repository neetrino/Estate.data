export const CONTACT_FIELD_MODES = ["required", "optional", "hidden"] as const;

export type ContactFieldMode = (typeof CONTACT_FIELD_MODES)[number];

export type ContactFieldSetting = {
  readonly fieldKey: string;
  readonly label: string;
  readonly placeholder: string;
  readonly mode: ContactFieldMode;
  readonly sortOrder: number;
};

export const CONTACT_SERVICE_VALUES = [
  "photography",
  "video-production",
  "drone-services",
  "3d-tours-visualization",
  "floor-plans-2d-3d",
  "ai-media",
  "laser-scanning-scan-to-bim",
  "web-pages",
  "other",
] as const;

export type ContactServiceValue = (typeof CONTACT_SERVICE_VALUES)[number];

export const CONTACT_FORM_SERVICE_OPTIONS = [
  { value: "photography", label: "Photography" },
  { value: "video-production", label: "Video" },
  { value: "drone-services", label: "Drone Photography / Video" },
  { value: "3d-tours-visualization", label: "Matterport 3D Tour" },
  { value: "floor-plans-2d-3d", label: "Floor Plan" },
  { value: "ai-media", label: "AI Media" },
  { value: "laser-scanning-scan-to-bim", label: "Scan-to-BIM" },
  { value: "web-pages", label: "Landing Pages" },
  { value: "other", label: "Other" },
] as const;

export const DEFAULT_CONTACT_FIELD_SETTINGS: readonly ContactFieldSetting[] = [
  { fieldKey: "name", label: "Name", placeholder: "Jane Smith", mode: "required", sortOrder: 10 },
  { fieldKey: "company", label: "Company", placeholder: "Brokerage or studio", mode: "optional", sortOrder: 20 },
  { fieldKey: "email", label: "Email", placeholder: "you@example.com", mode: "required", sortOrder: 30 },
  { fieldKey: "phone", label: "Phone", placeholder: "(310) 555-0142", mode: "optional", sortOrder: 40 },
  {
    fieldKey: "propertyAddress",
    label: "Property Address",
    placeholder: "1234 Sunset Blvd, Los Angeles, CA",
    mode: "required",
    sortOrder: 50,
  },
  {
    fieldKey: "propertyType",
    label: "Property Type",
    placeholder: "Single Family, Luxury Estate, Condo…",
    mode: "optional",
    sortOrder: 60,
  },
  {
    fieldKey: "squareFootage",
    label: "Approximate Square Footage",
    placeholder: "2,400 sq ft",
    mode: "optional",
    sortOrder: 70,
  },
  {
    fieldKey: "preferredDate",
    label: "Desired Shoot Date",
    placeholder: "Select a date",
    mode: "optional",
    sortOrder: 80,
  },
  { fieldKey: "service", label: "Services Required", placeholder: "Select a service", mode: "required", sortOrder: 90 },
  {
    fieldKey: "projectDetails",
    label: "Additional Notes",
    placeholder: "Anything else we should know about the property or shoot.",
    mode: "optional",
    sortOrder: 100,
  },
  { fieldKey: "rooms", label: "Number of rooms", placeholder: "4", mode: "hidden", sortOrder: 110 },
  { fieldKey: "floor", label: "Floor", placeholder: "3", mode: "hidden", sortOrder: 120 },
  { fieldKey: "price", label: "Price", placeholder: "Optional list price", mode: "hidden", sortOrder: 130 },
];

export function isContactFieldMode(value: string): value is ContactFieldMode {
  return CONTACT_FIELD_MODES.includes(value as ContactFieldMode);
}
