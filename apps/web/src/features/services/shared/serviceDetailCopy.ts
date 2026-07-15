export type ServiceDetailCopy = {
  readonly title: string;
  readonly description: string;
};

export const SERVICE_DETAIL_COPY: Record<string, ServiceDetailCopy> = {
  photography: {
    title: "Photography",
    description:
      "Premium interior, exterior, twilight, and lifestyle visuals designed to make every listing stand out.",
  },
  "video-production": {
    title: "Video Production",
    description:
      "Cinematic walkthroughs and branded property films that highlight story, flow, and neighborhood context.",
  },
  "drone-services": {
    title: "Drone Services",
    description:
      "FAA-compliant aerial coverage with cinematic framing and high-resolution footage for marketing and context.",
  },
  "3d-tours-visualization": {
    title: "3D Tours & Visualization",
    description:
      "Immersive virtual tours and visual experiences that help buyers understand space before they visit.",
  },
  "floor-plans-2d-3d": {
    title: "Floor Plans / 2D-3D",
    description:
      "Clear and accurate 2D and 3D floor plans to communicate layout, scale, and flow for every property.",
  },
  "ai-media": {
    title: "AI Media",
    description:
      "AI-assisted image and video enhancements that speed delivery while preserving a polished, premium result.",
  },
  "laser-scanning-scan-to-bim": {
    title: "Laser Scanning & Scan to BIM",
    description:
      "High-precision site capture and Scan to BIM workflows for accurate as-builts and production-ready models.",
  },
  "property-landing-pages": {
    title: "Property Landing Pages",
    description:
      "Conversion-focused property pages with media galleries, lead capture, and sharing-ready presentation.",
  },
};
