import type { ServiceDetailCopyMap } from "@/features/services/shared/serviceDetailTypes";

export const SERVICE_DETAIL_COPY_GROWTH = {
  "ai-media": {
    title: "AI Media",
    description:
      "AI-assisted image and video enhancements that speed delivery while preserving a polished, premium result.",
    heroLabel: "AI Enhancement",
    serviceSummary: "Thoughtful AI workflows for declutter, virtual staging, and premium retouching consistency.",
    heroImage: {
      src: "/images/media-services/cards/staging.png",
      alt: "AI-enhanced staging visual for a residential listing",
    },
    gallery: [
      {
        src: "/images/what-we-do/cards/market-intelligence.webp",
        alt: "AI market intelligence visual concept",
      },
      {
        src: "/images/media-services/cards/staging.png",
        alt: "Virtual staging preview used in AI media workflows",
      },
      {
        src: "/images/media-bg-reference-v2.png",
        alt: "Editorial media baseline for AI polish workflows",
      },
    ],
    metrics: [
      { label: "Retouch speed", value: "2x faster" },
      { label: "Staging styles", value: "8 themes" },
      { label: "QA model", value: "Human-reviewed" },
    ],
    highlights: [
      {
        title: "Virtual Staging",
        description: "Lifestyle-accurate staging options that match target buyer personas and pricing tier.",
      },
      {
        title: "Sky & Lighting Cleanup",
        description: "Natural-looking sky, glare, and white-balance fixes with strict quality thresholds.",
      },
      {
        title: "Brand Consistency",
        description: "Preset style profiles keep every listing deliverable visually coherent over time.",
      },
    ],
    workflow: [
      {
        title: "Asset Intake",
        description: "We receive your source media and define enhancement goals per listing segment.",
      },
      {
        title: "AI Processing",
        description: "Automated enhancement pass with style control and artifact detection.",
      },
      {
        title: "Editor QA",
        description: "Human reviewers approve every frame before client-facing delivery.",
      },
    ],
    packages: [
      {
        name: "AI Polish",
        turnaround: "24 hours",
        startingAt: "$160",
        inclusions: ["15 enhanced images", "Color/style normalization", "Fast web exports"],
      },
      {
        name: "AI Staging Pro",
        turnaround: "48 hours",
        startingAt: "$420",
        inclusions: ["6 virtually staged rooms", "Before/after set", "Revision support"],
      },
    ],
    faq: [
      {
        question: "Will edits look over-processed?",
        answer: "No. We target natural realism and reject outputs that look synthetic or inconsistent.",
      },
      {
        question: "Can we keep the same style across multiple listings?",
        answer: "Yes. We create reusable enhancement profiles for each brand or team.",
      },
    ],
  },
  "property-landing-pages": {
    title: "Property Landing Pages",
    description:
      "Conversion-focused property pages with media galleries, lead capture, and sharing-ready presentation.",
    heroLabel: "Conversion Pages",
    serviceSummary: "Single-property pages that turn listing traffic into qualified buyer and seller leads.",
    heroImage: {
      src: "/images/media-services/cards/listing-websites.png",
      alt: "High-conversion property landing page mockup",
    },
    gallery: [
      {
        src: "/images/listing-cta/banner-bg-2560.webp",
        alt: "Lead-focused property campaign banner visual",
      },
      {
        src: "/images/listing-cta/city-isometric.png",
        alt: "Property landing page map and neighborhood illustration",
      },
      {
        src: "/images/hero-landing-bg-1920.webp",
        alt: "Luxury property hero section for landing page conversion",
      },
    ],
    metrics: [
      { label: "Build time", value: "72h" },
      { label: "Lead form", value: "Custom fields" },
      { label: "Analytics", value: "GA4-ready" },
    ],
    highlights: [
      {
        title: "Story-Driven Layout",
        description: "Hero, highlights, media gallery, neighborhood context, and clear CTA progression.",
      },
      {
        title: "Lead Capture Blocks",
        description: "Inquiry modules optimized for both direct buyers and referring agents.",
      },
      {
        title: "Campaign Integrations",
        description: "UTM-ready links and analytics hooks for ads, QR materials, and email sequences.",
      },
    ],
    workflow: [
      {
        title: "Content Intake",
        description: "We collect listing media, selling points, and preferred conversion actions.",
      },
      {
        title: "Page Build",
        description: "Responsive page is assembled with branded sections and lead routing setup.",
      },
      {
        title: "Launch & Iterate",
        description: "We publish, monitor performance, and tune copy blocks based on engagement data.",
      },
    ],
    packages: [
      {
        name: "Launch Page",
        turnaround: "72 hours",
        startingAt: "$490",
        inclusions: ["Single-page build", "Lead form + CTA", "Basic SEO metadata"],
      },
      {
        name: "Campaign Page Plus",
        turnaround: "4 business days",
        startingAt: "$890",
        inclusions: ["A/B hero variant", "CRM/webhook routing", "Post-launch tweaks"],
      },
    ],
    faq: [
      {
        question: "Can the page run on our domain?",
        answer: "Yes, we support custom domains or subdomains aligned with your brokerage setup.",
      },
      {
        question: "Do you provide copywriting assistance?",
        answer: "We provide editable copy starters and can refine messaging after launch feedback.",
      },
    ],
  },
  "mls-solutions": {
    title: "MLS Solutions",
    description:
      "Structured MLS optimization services for teams that want stronger listing clarity and measurable response lift.",
    heroLabel: "Coming Soon",
    serviceSummary: "The next release focuses on MLS optimization kits for high-volume listing teams.",
    heroImage: {
      src: "/images/media-services/cards/listing-websites.png",
      alt: "MLS workflow optimization dashboard preview",
    },
    gallery: [
      {
        src: "/images/home-stats-bg-1024.webp",
        alt: "MLS analytics style dashboard backdrop",
      },
      {
        src: "/images/listing-cta/banner-bg-2560.webp",
        alt: "Listing campaign performance landscape visual",
      },
      {
        src: "/images/media-services/cards/listing-websites.png",
        alt: "MLS listing presentation and conversion page layout",
      },
    ],
    metrics: [
      { label: "Release", value: "Q4 2026" },
      { label: "Early access", value: "Open" },
      { label: "Pilot markets", value: "LA + OC" },
    ],
    highlights: [
      {
        title: "Listing Optimization",
        description: "Template-driven title, description, and asset sequencing for MLS performance.",
      },
      {
        title: "Compliance-First Workflow",
        description: "Brokerage and regional requirements embedded into delivery checklists.",
      },
      {
        title: "Performance Reporting",
        description: "Weekly quality snapshots and engagement trends for team-level visibility.",
      },
    ],
    workflow: [
      {
        title: "Pilot Intake",
        description: "Teams submit current MLS workflow so we can identify top improvement opportunities.",
      },
      {
        title: "Template Mapping",
        description: "We configure reusable templates and approval paths for faster publication.",
      },
      {
        title: "Launch Window",
        description: "Once released, pilot teams onboard first with white-glove support.",
      },
    ],
    packages: [
      {
        name: "Early Access",
        turnaround: "Invite list",
        startingAt: "TBD",
        inclusions: ["Roadmap previews", "Pilot onboarding call", "Priority feedback channel"],
      },
    ],
    faq: [
      {
        question: "How do we join early access?",
        answer: "Use the consultation CTA and mention MLS Solutions early access in your request.",
      },
      {
        question: "Will this include automation APIs?",
        answer: "API capabilities are planned for a later phase after pilot validation.",
      },
    ],
  },
} as const satisfies ServiceDetailCopyMap;
