const VILLA = "/assets/hero-villa-BcD5T4f7.webp";
const CONTACT_HREF = "/#contact";

export const HERO_SLIDES = [
  {
    id: "hero-slide-1",
    imageUrl: VILLA,
    thumbUrl: VILLA,
    alt: "Luxury Los Angeles hillside residence photographed at dusk with city lights below",
    sortOrder: 0,
    published: true,
  },
  {
    id: "hero-slide-2",
    imageUrl: VILLA,
    thumbUrl: VILLA,
    alt: "Luxury Los Angeles hillside residence photographed at dusk",
    sortOrder: 1,
    published: false,
  },
  {
    id: "hero-slide-3",
    imageUrl: VILLA,
    thumbUrl: VILLA,
    alt: "Los Angeles hillside residence at dusk",
    sortOrder: 2,
    published: false,
  },
] as const;

export const CONTACT_FIELDS = [
  { fieldKey: "name", label: "Name", placeholder: "Jane Smith", mode: "required", sortOrder: 10 },
  { fieldKey: "company", label: "Company", placeholder: "Brokerage or studio", mode: "optional", sortOrder: 20 },
  { fieldKey: "email", label: "Email", placeholder: "you@example.com", mode: "required", sortOrder: 30 },
  { fieldKey: "phone", label: "Phone", placeholder: "(310) 555-0142", mode: "optional", sortOrder: 40 },
  { fieldKey: "propertyAddress", label: "Property Address", placeholder: "1234 Sunset Blvd, Los Angeles, CA", mode: "required", sortOrder: 50 },
  { fieldKey: "propertyType", label: "Property Type", placeholder: "Single Family, Luxury Estate, Condo…", mode: "optional", sortOrder: 60 },
  { fieldKey: "squareFootage", label: "Approximate Square Footage", placeholder: "2,400 sq ft", mode: "optional", sortOrder: 70 },
  { fieldKey: "preferredDate", label: "Desired Shoot Date", placeholder: "Select a date", mode: "optional", sortOrder: 80 },
  { fieldKey: "service", label: "Services Required", placeholder: "Select a service", mode: "required", sortOrder: 90 },
  { fieldKey: "projectDetails", label: "Additional Notes", placeholder: "Anything else we should know.", mode: "optional", sortOrder: 100 },
  { fieldKey: "rooms", label: "Number of rooms", placeholder: "4", mode: "hidden", sortOrder: 110 },
  { fieldKey: "floor", label: "Floor", placeholder: "3", mode: "hidden", sortOrder: 120 },
  { fieldKey: "price", label: "Price", placeholder: "Optional list price", mode: "hidden", sortOrder: 130 },
] as const;

type StudioSeedService = {
  readonly sectionKey: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly sortOrder: number;
  readonly included: readonly string[];
  readonly pricing: readonly { label: string; price: string }[];
  readonly primaryCtaLabel: string;
  readonly secondaryCtaLabel: string;
};

export const STUDIO_SEED_SERVICES: readonly StudioSeedService[] = [
  {
    sectionKey: "photography",
    eyebrow: "Service 01 · Real Estate Photography",
    title: "Photography That Makes Space Sell.",
    description:
      "Professional interior and exterior real estate photography optimized for MLS, websites, print and social media.",
    imageUrl: "/assets/photography-BEgVm_0g.webp",
    sortOrder: 10,
    included: [
      "Interior photography",
      "Exterior photography",
      "HDR photography",
      "Architectural photography",
      "Luxury property photography",
      "Professional color correction",
      "Perspective correction",
      "Image retouching",
      "Sky replacement when appropriate",
      "Object removal",
      "Virtual twilight",
      "MLS-ready delivery",
    ],
    pricing: [
      { label: "Up to 2,000 sq ft", price: "$249" },
      { label: "2,001 – 3,000 sq ft", price: "$299" },
      { label: "3,001 – 4,000 sq ft", price: "$349" },
      { label: "4,001 – 5,000 sq ft", price: "$399" },
      { label: "5,000+ sq ft", price: "Custom Quote" },
    ],
    primaryCtaLabel: "Book Photography",
    secondaryCtaLabel: "View Example",
  },
  {
    sectionKey: "editing",
    eyebrow: "Service 02 · Photo Editing & Retouching",
    title: "Every Frame, Perfected.",
    description:
      "Professional post-production to make every image clean, balanced and marketing-ready.",
    imageUrl: "/assets/portfolio-3-fLsZycgA.webp",
    sortOrder: 20,
    included: [
      "Color correction",
      "Exposure correction",
      "HDR processing",
      "Window pull",
      "Sky replacement",
      "Object removal",
      "Decluttering",
      "Virtual twilight",
      "Virtual staging",
      "Image enhancement",
    ],
    pricing: [
      { label: "Basic correction", price: "Included with photography" },
      { label: "Advanced retouching", price: "from $20 / image" },
      { label: "Virtual staging", price: "from $35 / image" },
      { label: "Virtual twilight", price: "from $35 / image" },
    ],
    primaryCtaLabel: "Request Editing",
    secondaryCtaLabel: "View Example",
  },
  {
    sectionKey: "video",
    eyebrow: "Service 03 · Cinematic Real Estate Video",
    title: "Turn a Property Into a Story.",
    description:
      "Cinematic interior and exterior video production designed to create emotional impact and showcase the lifestyle behind the property.",
    imageUrl: "/assets/photography-BEgVm_0g.webp",
    sortOrder: 30,
    included: [
      "4K video",
      "Interior walkthrough",
      "Exterior cinematography",
      "Cinematic camera movement",
      "Gimbal shots",
      "Professional editing",
      "Licensed music",
      "Color grading",
      "Property titles",
      "Branded and unbranded versions",
      "MLS version",
      "Social media version",
    ],
    pricing: [
      { label: "Standard Property Video", price: "from $499" },
      { label: "Premium Cinematic Property Film", price: "from $799" },
      { label: "Luxury / custom productions", price: "Custom Quote" },
    ],
    primaryCtaLabel: "Book Video",
    secondaryCtaLabel: "View Example",
  },
  {
    sectionKey: "ai-media",
    eyebrow: "Generative production",
    title: "AI-Powered Property Media",
    description:
      "Additional marketing assets produced with generative and AI-assisted production workflows — built to multiply the reach of every shoot.",
    imageUrl: "/assets/after-staged-CjfcBM8p.webp",
    sortOrder: 40,
    included: [
      "AI-enhanced property videos",
      "AI-generated social media variations",
      "AI voiceovers",
      "AI virtual presenters",
      "AI property storytelling",
      "AI-powered video editing",
      "Virtual renovation concepts",
      "Virtual staging",
      "Day-to-dusk transformations",
      "Social media content variations",
    ],
    pricing: [
      { label: "AI Social Video", price: "from $149" },
      { label: "AI Property Reel", price: "from $199" },
      { label: "AI Creative Package", price: "from $399" },
      { label: "Custom AI production", price: "Custom Quote" },
    ],
    primaryCtaLabel: "Explore AI Media",
    secondaryCtaLabel: "View Example",
  },
  {
    sectionKey: "drone",
    eyebrow: "Aerial",
    title: "See the Property From a Different Perspective.",
    description:
      "Licensed aerial cinematography that places the property in its full context — architecture, land, neighborhood and skyline.",
    imageUrl: "/assets/drone-DM_DRS7C.webp",
    sortOrder: 50,
    included: [
      "Aerial photography",
      "Aerial video",
      "Property surroundings",
      "Neighborhood context",
      "Cinematic drone sequences",
      "Roof / land documentation where appropriate",
    ],
    pricing: [
      { label: "Drone Photography", price: "from $199" },
      { label: "Drone Video", price: "from $299" },
      { label: "Drone Photo + Video", price: "from $399" },
    ],
    primaryCtaLabel: "Book Drone Coverage",
    secondaryCtaLabel: "View Example",
  },
  {
    sectionKey: "tours",
    eyebrow: "Matterport 3D · Digital twins",
    title: "Walk Through the Property. From Anywhere.",
    description:
      "Create an immersive digital twin that lets buyers, tenants, owners and teams explore the property from anywhere.",
    imageUrl: "/assets/matterport-LMmMA2Nk.webp",
    sortOrder: 60,
    included: [
      "Interactive 3D walkthrough",
      "Dollhouse view",
      "Floor plan",
      "Measurements",
      "360° navigation",
      "Mobile optimized",
      "Desktop optimized",
      "VR compatible",
      "Website embedding",
      "MLS-ready link",
      "Matterport hosting",
    ],
    pricing: [
      { label: "Up to 1,500 sq ft", price: "$199" },
      { label: "1,501 – 3,000 sq ft", price: "$249" },
      { label: "3,001 – 5,000 sq ft", price: "$349" },
      { label: "5,001 – 7,000 sq ft", price: "$449" },
      { label: "7,001 – 10,000 sq ft", price: "$699" },
      { label: "10,000+ sq ft", price: "Custom Quote" },
    ],
    primaryCtaLabel: "Create My 3D Tour",
    secondaryCtaLabel: "View Example",
  },
  {
    sectionKey: "scan-to-bim",
    eyebrow: "Reality capture · AEC",
    title: "From Real Space to Revit.",
    description:
      "Professional 3D reality capture and Scan-to-BIM services for architects, engineers, developers and construction teams.",
    imageUrl: "/assets/scan-bim-gjdfWRdw.webp",
    sortOrder: 80,
    included: [
      "On-site 3D laser scanning",
      "Point cloud generation",
      "Registration and processing",
      "Quality control",
      "BIM modeling",
      "Revit delivery",
      "Documentation",
      "Point Cloud / E57 / RCP / RCS",
      "Floor plans, elevations, sections",
      "As-built documentation",
    ],
    pricing: [
      { label: "Scan only", price: "from $0.15 / sq ft" },
      { label: "Scan + Point Cloud", price: "from $0.25 / sq ft" },
      { label: "Scan-to-BIM", price: "from $0.50 / sq ft" },
      { label: "Complex / LOD-specific projects", price: "Custom Quote" },
    ],
    primaryCtaLabel: "Request a Scan-to-BIM Quote",
    secondaryCtaLabel: "View Example",
  },
];

export const STUDIO_SEED_GALLERY = [
  VILLA,
  "/assets/photography-BEgVm_0g.webp",
  "/assets/drone-DM_DRS7C.webp",
  "/assets/matterport-LMmMA2Nk.webp",
  "/assets/scan-bim-gjdfWRdw.webp",
] as const;

export const STUDIO_SEED_CONTACT_HREF = CONTACT_HREF;
