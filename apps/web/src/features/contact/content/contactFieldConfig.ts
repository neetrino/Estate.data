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
  "photo-editing",
  "video-production",
  "drone-photography",
  "drone-video",
  "3d-tours-visualization",
  "floor-plans-2d-3d",
  "ai-media",
  "laser-scanning-scan-to-bim",
  "other",
] as const;

export type ContactServiceValue = (typeof CONTACT_SERVICE_VALUES)[number];

/** Minimum checkboxes a visitor must tick when the services field is required. */
export const MIN_SELECTED_SERVICES = 1;

export const CONTACT_FORM_SERVICE_OPTIONS = [
  { value: "photography", label: "Photography" },
  { value: "photo-editing", label: "Photo Editing" },
  { value: "video-production", label: "Video" },
  { value: "drone-photography", label: "Drone Photography" },
  { value: "drone-video", label: "Drone Video" },
  { value: "3d-tours-visualization", label: "Matterport 3D Tour" },
  { value: "floor-plans-2d-3d", label: "Floor Plan" },
  { value: "ai-media", label: "AI Media" },
  { value: "laser-scanning-scan-to-bim", label: "Scan-to-BIM" },
  { value: "other", label: "Other" },
] as const;

export const CONTACT_PROPERTY_TYPE_OPTIONS = [
  "Single Family Residential",
  "Luxury Estate",
  "Condo / Townhome",
  "Multifamily",
  "Commercial / Office",
  "Retail",
  "Industrial",
  "Hospitality",
  "New Development",
  "Other",
] as const;

/** Human label for a stored service value (falls back to the raw value). */
export function contactServiceLabel(value: string): string {
  return CONTACT_FORM_SERVICE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

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
  {
    fieldKey: "service",
    label: "Services Required",
    placeholder: "Select one or more services",
    mode: "required",
    sortOrder: 90,
  },
  {
    fieldKey: "projectDetails",
    label: "Additional Notes",
    placeholder: "Anything else we should know about the property or shoot.",
    mode: "optional",
    sortOrder: 100,
  },
];

/** Keys rendered by the public quote form — leftover CMS rows are ignored. */
export const QUOTE_CONTACT_FIELD_KEYS = [
  "name",
  "company",
  "email",
  "phone",
  "propertyAddress",
  "propertyType",
  "squareFootage",
  "preferredDate",
  "service",
  "projectDetails",
] as const;

export type QuoteContactFieldKey = (typeof QUOTE_CONTACT_FIELD_KEYS)[number];

export function isQuoteContactFieldKey(value: string): value is QuoteContactFieldKey {
  return (QUOTE_CONTACT_FIELD_KEYS as readonly string[]).includes(value);
}

export function isContactFieldMode(value: string): value is ContactFieldMode {
  return CONTACT_FIELD_MODES.includes(value as ContactFieldMode);
}
