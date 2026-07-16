import type { ServiceDetailCopyMap } from "@/features/services/shared/serviceDetailTypes";

export const SERVICE_DETAIL_COPY_CREATIVE = {
  photography: {
    title: "Photography",
    description:
      "Premium interior, exterior, twilight, and lifestyle visuals designed to make every listing stand out.",
    heroLabel: "Listing Media",
    serviceSummary: "Magazine-grade stills built for MLS, social campaigns, and luxury brochures.",
    heroImage: {
      src: "/images/media-services/cards/photography.png",
      alt: "Luxury interior photography composition with warm light",
    },
    gallery: [
      {
        src: "/images/what-we-do/cards/photography.webp",
        alt: "Curated photography mood board for luxury listing",
      },
      {
        src: "/images/hero-landing-bg-2560.webp",
        alt: "High-end listing hero visual for photography campaign",
      },
      {
        src: "/images/client-voices/home-section-bg-2560.webp",
        alt: "Lifestyle framing details used for premium listing photography",
      },
    ],
    metrics: [
      { label: "Typical delivery", value: "24h" },
      { label: "Edited photos", value: "35-60" },
      { label: "Twilight add-on", value: "Yes" },
    ],
    highlights: [
      {
        title: "Interior Storytelling",
        description: "Balanced exposure and composition that present depth, material quality, and natural flow.",
      },
      {
        title: "Exterior Hero Angles",
        description: "Street, curb, and lifestyle framing tuned for first-impression conversion on listing portals.",
      },
      {
        title: "Marketing-Ready Exports",
        description: "MLS-safe sizes plus hi-res social and print versions prepared in one delivery set.",
      },
    ],
    workflow: [
      {
        title: "Creative Brief",
        description: "We align on audience, hero spaces, and target mood before the shoot window is confirmed.",
      },
      {
        title: "Capture Day",
        description: "Room-by-room coverage with bracketed exposure and detail inserts for premium listings.",
      },
      {
        title: "Post & QA",
        description: "Color balancing, perspective correction, and final QC pass before secure delivery.",
      },
    ],
    packages: [
      {
        name: "Essential",
        turnaround: "Next day",
        startingAt: "$295",
        inclusions: ["25 edited photos", "MLS + social exports", "Basic sky replacement"],
      },
      {
        name: "Signature",
        turnaround: "Next day",
        startingAt: "$495",
        inclusions: ["45 edited photos", "Twilight set (5)", "Detail close-ups"],
      },
    ],
    faq: [
      {
        question: "Can we request specific shot list priorities?",
        answer: "Yes. Share priorities during booking and we structure the capture order around them.",
      },
      {
        question: "Do you handle occupied properties?",
        answer: "Yes. We coordinate with agents and residents to minimize disruption and keep timeline intact.",
      },
    ],
  },
  "video-production": {
    title: "Video Production",
    description:
      "Cinematic walkthroughs and branded property films that highlight story, flow, and neighborhood context.",
    heroLabel: "Motion Content",
    serviceSummary: "Fast-turn cinematic reels, vertical clips, and agent-branded walkthrough edits.",
    heroImage: {
      src: "/images/media-services/cards/cinematic-video.png",
      alt: "Cinematic video production frame for a luxury home",
    },
    gallery: [
      {
        src: "/images/what-we-do/cards/cinematic-video.webp",
        alt: "Storyboard style preview for real estate video production",
      },
      {
        src: "/images/media-bg-1024.webp",
        alt: "Motion-ready residential exterior scene",
      },
      {
        src: "/images/hero-landing-bg-mobile-20260528-v2.png",
        alt: "Vertical social video composition for a listing campaign",
      },
    ],
    metrics: [
      { label: "Standard cut", value: "60-90 sec" },
      { label: "Delivery window", value: "48h" },
      { label: "Social variants", value: "3 formats" },
    ],
    highlights: [
      {
        title: "Cinematic Walkthroughs",
        description: "Stabilized interior-to-exterior sequences that preserve real spatial pacing.",
      },
      {
        title: "Agent Brand Layer",
        description: "Intro/outro slates, logo lockups, and licensed tracks matched to your marketing voice.",
      },
      {
        title: "Platform Variants",
        description: "Horizontal, vertical, and story-safe cuts exported for every primary channel.",
      },
    ],
    workflow: [
      {
        title: "Script Direction",
        description: "We define tone, standout features, and call-to-action before production day.",
      },
      {
        title: "Filming",
        description: "Gimbal passes, detail b-roll, and optional presenter segments captured in one run.",
      },
      {
        title: "Edit Suite",
        description: "Color grade, music sync, branded overlays, and revision pass for final approval.",
      },
    ],
    packages: [
      {
        name: "Social Reel",
        turnaround: "48 hours",
        startingAt: "$550",
        inclusions: ["45 sec reel", "Vertical + horizontal", "1 revision round"],
      },
      {
        name: "Cinematic Plus",
        turnaround: "72 hours",
        startingAt: "$890",
        inclusions: ["90 sec hero edit", "Neighborhood b-roll", "Caption-ready teaser cut"],
      },
    ],
    faq: [
      {
        question: "Can you include agent on-camera intros?",
        answer: "Yes. We can film short host segments and integrate teleprompter-style bullet cues.",
      },
      {
        question: "Do you provide licensed music?",
        answer: "Every delivered video includes properly licensed background music for online use.",
      },
    ],
  },
  "drone-services": {
    title: "Drone Services",
    description:
      "FAA-compliant aerial coverage with cinematic framing and high-resolution footage for marketing and context.",
    heroLabel: "Aerial Coverage",
    serviceSummary: "Altitude storytelling for lot scale, views, neighborhood positioning, and approach routes.",
    heroImage: {
      src: "/images/media-services/cards/drone-aerial.png",
      alt: "Drone capture over a premium hillside property",
    },
    gallery: [
      {
        src: "/images/what-we-do/cards/drone-aerial.webp",
        alt: "Aerial storytelling tile for luxury listing campaigns",
      },
      {
        src: "/images/portfolio/filters/drone.png",
        alt: "Drone filter showcase frame from portfolio",
      },
      {
        src: "/images/listing-cta/banner-bg-2560.webp",
        alt: "Wide neighborhood context aerial backdrop",
      },
    ],
    metrics: [
      { label: "Pilot status", value: "FAA 107" },
      { label: "Max output", value: "5.1K" },
      { label: "Orbit shots", value: "Included" },
    ],
    highlights: [
      {
        title: "Lot & Access Context",
        description: "Bird's-eye sequences that communicate footprint, setbacks, and adjacency clearly.",
      },
      {
        title: "View Corridor Capture",
        description: "Hillside, ocean, and skyline framing optimized for premium listing positioning.",
      },
      {
        title: "Compliance Workflow",
        description: "Airspace checks and safe flight plans are completed before every mission window.",
      },
    ],
    workflow: [
      {
        title: "Airspace Planning",
        description: "Preflight map checks, weather review, and route planning per property constraints.",
      },
      {
        title: "Flight Session",
        description: "Orbit, pull-back, and reveal sequences captured in controlled lighting windows.",
      },
      {
        title: "Stabilize & Deliver",
        description: "Footage is stabilized, color matched, and exported alongside still aerial selects.",
      },
    ],
    packages: [
      {
        name: "Aerial Essentials",
        turnaround: "48 hours",
        startingAt: "$325",
        inclusions: ["10 aerial photos", "2 short clips", "FAA flight log summary"],
      },
      {
        name: "Aerial Story Pack",
        turnaround: "72 hours",
        startingAt: "$590",
        inclusions: ["20 aerial photos", "4 cinematic clips", "Map-anchored shot index"],
      },
    ],
    faq: [
      {
        question: "What happens if weather conditions change?",
        answer: "We reschedule to the next safe slot and keep your booking priority at no extra fee.",
      },
      {
        question: "Can drone footage be combined with interior video?",
        answer: "Yes. We routinely merge aerial and interior footage into unified marketing edits.",
      },
    ],
  },
} as const satisfies ServiceDetailCopyMap;
