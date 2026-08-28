import {
  HOME_SECTION_IDS,
  homeSectionHref,
} from "@/shared/lib/homeSectionIds";
import { STUDIO_MEDIA, STUDIO_MEDIA_GALLERY } from "@/features/home/content/studioMedia";

export type StudioPricingRow = {
  readonly label: string;
  readonly price: string;
};

export type StudioServiceContent = {
  readonly sectionKey: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly imageUrl: string;
  readonly galleryUrls: readonly string[];
  readonly included: readonly string[];
  readonly pricing: readonly StudioPricingRow[];
  readonly primaryCtaLabel: string;
  readonly primaryCtaHref: string;
  readonly secondaryCtaLabel: string;
  readonly secondaryCtaHref: string;
  readonly startingAt?: string;
  readonly footnote?: string;
};

const CONTACT_HREF = homeSectionHref(HOME_SECTION_IDS.contact);

const GALLERY = STUDIO_MEDIA_GALLERY;

export const DEFAULT_STUDIO_SERVICES: readonly StudioServiceContent[] = [
  {
    sectionKey: HOME_SECTION_IDS.photography,
    eyebrow: "Service 01 · Real Estate Photography",
    title: "Photography That Makes Space Sell.",
    description:
      "Professional interior and exterior real estate photography optimized for MLS, websites, print and social media.",
    imageUrl: STUDIO_MEDIA.photography,
    galleryUrls: GALLERY,
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
    primaryCtaHref: CONTACT_HREF,
    secondaryCtaLabel: "View Example",
    secondaryCtaHref: "#gallery",
    startingAt: "Starting at $249",
  },
  {
    sectionKey: HOME_SECTION_IDS.editing,
    eyebrow: "Service 02 · Photo Editing & Retouching",
    title: "Every Frame, Perfected.",
    description:
      "Professional post-production to make every image clean, balanced and marketing-ready.",
    imageUrl: STUDIO_MEDIA.portfolio3,
    galleryUrls: GALLERY,
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
    primaryCtaHref: CONTACT_HREF,
    secondaryCtaLabel: "View Example",
    secondaryCtaHref: "#gallery",
    startingAt: "Starting at $20 / image",
  },
  {
    sectionKey: HOME_SECTION_IDS.video,
    eyebrow: "Service 03 · Cinematic Real Estate Video",
    title: "Turn a Property Into a Story.",
    description:
      "Cinematic interior and exterior video production designed to create emotional impact and showcase the lifestyle behind the property.",
    imageUrl: STUDIO_MEDIA.photography,
    galleryUrls: GALLERY,
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
    primaryCtaHref: CONTACT_HREF,
    secondaryCtaLabel: "View Example",
    secondaryCtaHref: "#gallery",
    startingAt: "Starting at $499",
  },
  {
    sectionKey: HOME_SECTION_IDS.aiMedia,
    eyebrow: "Generative production",
    title: "AI-Powered Property Media",
    description:
      "Additional marketing assets produced with generative and AI-assisted production workflows — built to multiply the reach of every shoot.",
    imageUrl: STUDIO_MEDIA.afterStaged,
    galleryUrls: GALLERY,
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
    primaryCtaHref: CONTACT_HREF,
    secondaryCtaLabel: "View Example",
    secondaryCtaHref: "#gallery",
    footnote:
      "AI-generated content is clearly identified where appropriate and is designed for marketing and visualization purposes.",
  },
  {
    sectionKey: HOME_SECTION_IDS.drone,
    eyebrow: "Aerial",
    title: "See the Property From a Different Perspective.",
    description:
      "Licensed aerial cinematography that places the property in its full context — architecture, land, neighborhood and skyline.",
    imageUrl: STUDIO_MEDIA.drone,
    galleryUrls: GALLERY,
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
    primaryCtaHref: CONTACT_HREF,
    secondaryCtaLabel: "View Example",
    secondaryCtaHref: "#gallery",
    footnote:
      "Drone operations are subject to applicable FAA regulations, airspace restrictions and weather conditions.",
  },
  {
    sectionKey: HOME_SECTION_IDS.tours,
    eyebrow: "Matterport 3D · Digital twins",
    title: "Walk Through the Property. From Anywhere.",
    description:
      "Create an immersive digital twin that lets buyers, tenants, owners and teams explore the property from anywhere. Using professional 3D scanning technology, we capture the property and transform it into an interactive digital twin — measurable, navigable and ready to embed anywhere you market.",
    imageUrl: STUDIO_MEDIA.matterport,
    galleryUrls: GALLERY,
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
    primaryCtaHref: CONTACT_HREF,
    secondaryCtaLabel: "View Example",
    secondaryCtaHref: "#gallery",
  },
  {
    sectionKey: HOME_SECTION_IDS.scanToBim,
    eyebrow: "Reality capture · AEC",
    title: "From Real Space to Revit.",
    description:
      "Professional 3D reality capture and Scan-to-BIM services for architects, engineers, developers and construction teams.",
    imageUrl: STUDIO_MEDIA.scanBim,
    galleryUrls: GALLERY,
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
    primaryCtaHref: CONTACT_HREF,
    secondaryCtaLabel: "View Example",
    secondaryCtaHref: "#gallery",
  },
];
