import type { ServiceDetailCopyMap } from "@/features/services/shared/serviceDetailTypes";

export const SERVICE_DETAIL_COPY_SPATIAL = {
  "3d-tours-visualization": {
    title: "3D Tours & Visualization",
    description:
      "Immersive virtual tours and visual experiences that help buyers understand space before they visit.",
    heroLabel: "Immersive Tours",
    serviceSummary: "Interactive property walkthroughs with room-by-room navigation and measurement confidence.",
    heroImage: {
      src: "/images/media-services/cards/tours-floorplans.png",
      alt: "Interactive 3D property tour interface preview",
    },
    gallery: [
      {
        src: "/images/what-we-do/cards/tours-floorplans.webp",
        alt: "3D tours and floor plan visualization concept card",
      },
      {
        src: "/assets/scan-bim-gjdfWRdw.webp",
        alt: "Spatial visualization panel for digital property tour",
      },
      {
        src: "/assets/scan-bim-gjdfWRdw.webp",
        alt: "Immersive floor mapping background for virtual walkthroughs",
      },
    ],
    metrics: [
      { label: "Tour hosting", value: "12 months" },
      { label: "Floor map", value: "Included" },
      { label: "Viewer retention", value: "+38%" },
    ],
    highlights: [
      {
        title: "Guided Navigation",
        description: "Smooth room transitions with clear pathing that mirrors an in-person showing.",
      },
      {
        title: "Buyer Confidence",
        description: "Dimension-aware scanning gives remote buyers stronger planning certainty.",
      },
      {
        title: "Share Everywhere",
        description: "Embeddable links for listing pages, agent websites, and ad landing pages.",
      },
    ],
    workflow: [
      {
        title: "Property Prep",
        description: "We provide a short checklist to maximize scan quality and walk-through continuity.",
      },
      {
        title: "On-Site Scan",
        description: "Complete digital capture of key rooms, transitions, and architectural moments.",
      },
      {
        title: "Tour Publish",
        description: "Hosted link, branded splash, and embed code delivered with analytics-ready setup.",
      },
    ],
    packages: [
      {
        name: "Tour Basic",
        turnaround: "48 hours",
        startingAt: "$420",
        inclusions: ["Interactive tour", "Basic floor map", "MLS-compatible link"],
      },
      {
        name: "Tour Premium",
        turnaround: "72 hours",
        startingAt: "$760",
        inclusions: ["Interactive tour", "Highlight labels", "Lead form embed support"],
      },
    ],
    faq: [
      {
        question: "Can we brand the tour with our brokerage colors?",
        answer: "Yes, we can apply your logo, brand colors, and CTA button destination.",
      },
      {
        question: "Do tours work on mobile devices?",
        answer: "Delivered tours are optimized for desktop and mobile viewing without app installs.",
      },
    ],
  },
  "floor-plans-2d-3d": {
    title: "Floor Plans / 2D-3D",
    description:
      "Clear and accurate 2D and 3D floor plans to communicate layout, scale, and flow for every property.",
    heroLabel: "Spatial Assets",
    serviceSummary: "Clean, buyer-friendly layouts for brochures, listing pages, and investor packets.",
    heroImage: {
      src: "/images/media-services/cards/tours-floorplans.png",
      alt: "Professional floor plan and 3D layout preview",
    },
    gallery: [
      {
        src: "/assets/scan-bim-gjdfWRdw.webp",
        alt: "Spatial intelligence visual used for floor plan storytelling",
      },
      {
        src: "/assets/hero-villa-BcD5T4f7.webp",
        alt: "Architectural perspective suited for floor plan marketing",
      },
      {
        src: "/images/what-we-do/cards/tours-floorplans.webp",
        alt: "2D and 3D floor plan showcase card",
      },
    ],
    metrics: [
      { label: "Draft turnaround", value: "24-48h" },
      { label: "Layout styles", value: "2D + 3D" },
      { label: "Revision cycles", value: "Included" },
    ],
    highlights: [
      {
        title: "Readable 2D Plans",
        description: "Clear labels, dimensions, and circulation lines for practical buyer understanding.",
      },
      {
        title: "Styled 3D Views",
        description: "Perspective plans add depth and improve listing memorability in crowded markets.",
      },
      {
        title: "Marketing Consistency",
        description: "Output packages align with your typography, color tokens, and branding system.",
      },
    ],
    workflow: [
      {
        title: "Measurement Intake",
        description: "We ingest laser or manual measurements and validate room-to-room continuity.",
      },
      {
        title: "Plan Drafting",
        description: "Our team drafts 2D and 3D variants with clean annotations and proportional scaling.",
      },
      {
        title: "Final Export",
        description: "You receive print-ready, web-ready, and transparent background variants.",
      },
    ],
    packages: [
      {
        name: "2D Core",
        turnaround: "24 hours",
        startingAt: "$180",
        inclusions: ["Black/white 2D plan", "Room labels", "PNG + PDF exports"],
      },
      {
        name: "2D + 3D Bundle",
        turnaround: "48 hours",
        startingAt: "$350",
        inclusions: ["Colored 2D plan", "3D perspective view", "Brand color matching"],
      },
    ],
    faq: [
      {
        question: "Can plans reflect staged furniture layouts?",
        answer: "Yes, optional staged layouts can be added for visual planning and buyer guidance.",
      },
      {
        question: "Do you support custom unit labels for multifamily assets?",
        answer: "We can deliver individually labeled units and stacked sheet sets for multifamily use.",
      },
    ],
  },
  "laser-scanning-scan-to-bim": {
    title: "Laser Scanning & Scan to BIM",
    description:
      "High-precision site capture and Scan to BIM workflows for accurate as-builts and production-ready models.",
    heroLabel: "Reality Capture",
    serviceSummary: "Construction-grade point-cloud capture converted into structured BIM deliverables.",
    heroImage: {
      src: "/assets/scan-bim-gjdfWRdw.webp",
      alt: "Laser scanning and scan-to-BIM technical illustration",
    },
    gallery: [
      {
        src: "/assets/scan-bim-gjdfWRdw.webp",
        alt: "Reality capture environment for BIM workflows",
      },
      {
        src: "/images/what-we-do/cards/scan-to-bim.webp",
        alt: "Scan-to-BIM services visual card",
      },
      {
        src: "/assets/scan-bim-gjdfWRdw.webp",
        alt: "Point cloud to BIM conversion process graphic",
      },
    ],
    metrics: [
      { label: "Capture accuracy", value: "±5 mm" },
      { label: "BIM formats", value: "RVT + IFC" },
      { label: "Project updates", value: "Weekly" },
    ],
    highlights: [
      {
        title: "High-Fidelity Scanning",
        description: "Dense point clouds preserve geometry needed for renovation and as-built workflows.",
      },
      {
        title: "BIM-Ready Modeling",
        description: "Disciplined model hierarchy and naming structure for downstream coordination.",
      },
      {
        title: "Field-to-Office Continuity",
        description: "Structured QA pipeline minimizes rework between capture and model publishing.",
      },
    ],
    workflow: [
      {
        title: "Scope Alignment",
        description: "Define level of detail, deliverables, and coordination expectations upfront.",
      },
      {
        title: "On-Site Capture",
        description: "Multi-scan stations collect full geometry with overlap for reliable registration.",
      },
      {
        title: "Model Delivery",
        description: "As-built models are validated and shared with issue notes and handoff checklist.",
      },
    ],
    packages: [
      {
        name: "Scan Starter",
        turnaround: "5 business days",
        startingAt: "$1,500",
        inclusions: ["Registered point cloud", "Site snapshots", "QA report"],
      },
      {
        name: "Scan to BIM Pro",
        turnaround: "10 business days",
        startingAt: "$3,900",
        inclusions: ["LOD-focused BIM model", "RVT + IFC exports", "Coordination call"],
      },
    ],
    faq: [
      {
        question: "Do you support phased renovation projects?",
        answer: "Yes. We can deliver by zone or phase to match construction and design sequencing.",
      },
      {
        question: "Can you align deliverables to our BIM standards?",
        answer: "We can map naming, levels, and category standards to your template requirements.",
      },
    ],
  },
} as const satisfies ServiceDetailCopyMap;
