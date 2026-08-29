import { WEB_PAGES_PATH } from "@/shared/lib/routes";
import {
  HOME_SECTION_IDS,
  homeSectionHref,
} from "@/shared/lib/homeSectionIds";

import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";

export const STUDIO_HERO_VILLA_SRC = STUDIO_MEDIA.heroVilla;
export const STUDIO_MARK_SRC = STUDIO_MEDIA.mark;

export const DEFAULT_HERO_SLIDES = [
  {
    id: "slide-1",
    imageUrl: STUDIO_HERO_VILLA_SRC,
    thumbUrl: STUDIO_HERO_VILLA_SRC,
    alt: "Luxury Los Angeles hillside residence photographed at dusk with city lights below",
  },
] as const;

export const STUDIO_PAGE_COPY = {
  brand: {
    name: "ESTATEDATA",
    kicker: "Media · Reality Capture",
  },
  hero: {
    eyebrow: "Los Angeles · Real Estate Media + Digital Reality Capture",
    titleLines: ["Make your property", "impossible to ignore."] as const,
    description:
      "Premium real estate photography, cinematic video, drone, AI-powered media, Matterport 3D tours and professional reality capture — all under one roof.",
    primaryCta: "Book a Shoot",
    secondaryCta: "Explore Services",
    scrollLabel: "Scroll",
  },
  whatWeDo: {
    eyebrow: "What we do",
    title: "One shoot. Every channel. One studio.",
    body: "ESTATEDATA.CLOUD combines creative media production with advanced reality capture technology — photography, cinematic video, drone, AI media, Matterport 3D tours and Scan-to-BIM — so your property communicates its full value before anyone steps inside.",
    primaryCta: "Start a Project",
    secondaryCta: "See Services",
    reelLabel: "Watch the reel",
  },
  stats: [
    { value: "40%", label: "Faster property sales" },
    { value: "68%", label: "Time saved on marketing" },
    { value: "12K+", label: "Spaces captured annually" },
    { value: "98%", label: "Client satisfaction" },
    { value: "24h", label: "Average photo delivery" },
  ],
  offerings: {
    eyebrow: "One property",
    title: "Everything it needs to sell.",
    items: [
      {
        id: "01",
        title: "Photography",
        body: "Professional interior & exterior photography designed for MLS, websites and marketing.",
      },
      {
        id: "02",
        title: "Cinematic Video",
        body: "High-end property films, walkthroughs and social media content.",
      },
      {
        id: "03",
        title: "3D Digital Twins",
        body: "Immersive Matterport-powered 3D walkthroughs buyers can explore from anywhere.",
      },
      {
        id: "04",
        title: "Reality Capture",
        body: "Professional 3D scanning and Scan-to-BIM services for architects, developers and construction teams.",
      },
    ],
  },
  servicesIntro: {
    eyebrow: "Services",
    title: "Media production and reality capture, in one studio.",
  },
  webPages: {
    eyebrow: "Property websites",
    title: "A Landing Page Built to Sell One Property.",
    body: "A dedicated, high-converting property website that brings every asset we produce — photos, video, drone, 3D tour and floor plans — into one branded experience you can share with a single link.",
    ctaLabel: "Build My Property Page",
    href: WEB_PAGES_PATH,
    startingAt: "Starting at $399",
    included: [
      "Custom single-property website",
      "Mobile-first responsive design",
      "Hero video or cinematic gallery",
      "Embedded Matterport 3D tour",
      "Floor plans & downloadable brochure",
      "Lead capture form & instant notifications",
      "Agent branding or unbranded MLS version",
      "Custom domain setup",
      "SEO & social share previews",
      "Analytics and visitor tracking",
      "Hosting & maintenance",
      "48-hour turnaround",
    ],
    pricing: [
      { label: "Single Property Landing Page", price: "from $399" },
      { label: "Premium Page (video hero + 3D tour)", price: "from $649" },
      { label: "Agent / Brokerage Site", price: "from $1,499" },
      { label: "Development & Multifamily", price: "Custom Quote" },
      { label: "Hosting & domain", price: "$19 / month" },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "Five steps, zero friction.",
    steps: [
      { title: "Book", body: "Tell us about the property." },
      { title: "Capture", body: "Our team comes to the property and captures the space." },
      { title: "Create", body: "Photography, video, drone, 3D scanning and AI production." },
      { title: "Edit", body: "Our post-production team prepares the final media." },
      { title: "Deliver", body: "Receive your marketing-ready assets through a digital delivery portal." },
    ],
  },
  whyUs: {
    eyebrow: "Why us",
    title: "More Than a Photographer.",
    body: "One team at the intersection of real estate, media, 3D technology, AI and architecture.",
    tags: [
      "Professional photography",
      "Cinematography",
      "Drone",
      "AI",
      "3D scanning",
      "Matterport",
      "BIM",
      "Architecture technology",
    ],
    points: [
      "We capture space.",
      "We create stories.",
      "We build digital twins.",
      "We understand technology.",
      "We deliver marketing-ready media.",
    ],
  },
  studio: {
    eyebrow: "The studio",
    title: "People behind the technology.",
    body: "We combine creative media production with advanced reality capture technology to help properties communicate their value.",
  },
  team: [
    {
      initials: "AV",
      name: "Adrian Vale",
      role: "Founder / Creative Director",
      bio: "Fifteen years directing architectural and luxury property campaigns across Southern California.",
    },
    {
      initials: "ME",
      name: "Mara Ellison",
      role: "Real Estate Photographer",
      bio: "Specialist in natural-light interiors and MLS-optimized delivery at volume.",
    },
    {
      initials: "JR",
      name: "Julien Roth",
      role: "Cinematographer",
      bio: "Commercial DP building property films with narrative pacing and precise color.",
    },
    {
      initials: "SI",
      name: "Sana Idris",
      role: "3D Capture Specialist",
      bio: "Runs our Matterport and terrestrial scanning fleet across residential and commercial sites.",
    },
    {
      initials: "DN",
      name: "Dev Nakamura",
      role: "BIM Specialist",
      bio: "Converts registered point clouds into LOD-accurate Revit models and as-built documentation.",
    },
    {
      initials: "CB",
      name: "Cole Brenner",
      role: "Drone Operator",
      bio: "FAA Part 107 certified pilot with airspace authorization experience across the LA basin.",
    },
    {
      initials: "IP",
      name: "Ilya Petrov",
      role: "Post-Production Specialist",
      bio: "Leads retouching, virtual staging and AI-assisted content variations.",
    },
  ],
  serviceArea: {
    eyebrow: "Service area",
    title: "Los Angeles real estate media.",
    body: "On location across the LA basin, the Westside, the Valley and the coast — plus surrounding areas by arrangement.",
    cities: [
      "Los Angeles",
      "Beverly Hills",
      "Bel Air",
      "West Hollywood",
      "Santa Monica",
      "Malibu",
      "Brentwood",
      "Pacific Palisades",
      "Hollywood",
      "Downtown Los Angeles",
      "Pasadena",
      "Glendale",
      "Burbank",
      "and surrounding areas",
    ],
    note: "Outside our standard service area? Contact us for availability.",
    cta: "Check availability",
  },
  contact: {
    eyebrow: "Book a shoot",
    title: "Let's create something great.",
    body: "Tell us about the property and we'll return a scoped quote the same business day.",
    hours: "Mon – Sat · 7:00 AM – 8:00 PM PT",
    submit: "Get My Quote",
  },
  packages: {
    eyebrow: "Packages",
    title: "Choose how far you want to go.",
    startingAt: "Starting at",
  },
  portfolio: {
    eyebrow: "Selected work",
    title: "Properties we made unforgettable.",
    cta: "Start your project",
  },
  beforeAfter: {
    eyebrow: "Post-production",
    title: "See the difference.",
    body: "Raw photo → edited photo. Daylight → virtual twilight. Empty room → virtual staging. Raw scan → point cloud → Revit BIM.",
    items: [
      {
        id: "staging",
        label: "Empty Room → Virtual Staging",
        beforeSrc: STUDIO_MEDIA.beforeEmpty,
        afterSrc: STUDIO_MEDIA.afterStaged,
      },
      {
        id: "bim",
        label: "Raw Scan → Point Cloud → Revit BIM",
        beforeSrc: STUDIO_MEDIA.scanBim,
        afterSrc: STUDIO_MEDIA.scanBim,
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions, answered.",
  },
  contactHref: homeSectionHref(HOME_SECTION_IDS.contact),
} as const;
