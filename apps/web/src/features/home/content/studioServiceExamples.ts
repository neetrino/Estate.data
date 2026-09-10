import { STUDIO_MEDIA } from "@/features/home/content/studioMedia";
import { HOME_SECTION_IDS } from "@/shared/lib/homeSectionIds";

export type StudioServiceExample = {
  readonly label: string;
  readonly title: string;
  readonly summary: string;
  readonly imageUrl: string;
  readonly highlights: readonly string[];
  readonly embedUrl?: string;
};

const MATTERPORT_EMBED_URL = "https://my.matterport.com/show/?m=SxQL3iGyoDo&play=1&brand=0";

/**
 * Example popup content — images + copy from https://la-capture-studio.lovable.app
 * View Example dialogs (see `ju` map in the master bundle).
 */
export const STUDIO_SERVICE_EXAMPLES: Record<string, StudioServiceExample> = {
  [HOME_SECTION_IDS.photography]: {
    label: "Photography",
    title: "Hillside Residence — Full Photo Set",
    summary:
      "32 MLS-ready images captured in a single session: HDR interiors, window pulls, twilight exteriors and detail shots, delivered in 24 hours.",
    imageUrl: STUDIO_MEDIA.photography,
    highlights: ["32 final images", "HDR + window pull", "Virtual twilight", "24h delivery"],
  },
  [HOME_SECTION_IDS.editing]: {
    label: "Editing",
    title: "Loft Interior — Before / After Retouch",
    summary:
      "Color correction, perspective straightening, decluttering and virtual staging applied to a raw architectural interior.",
    imageUrl: STUDIO_MEDIA.portfolio3,
    highlights: [
      "Color & exposure",
      "Perspective correction",
      "Object removal",
      "Virtual staging",
    ],
  },
  [HOME_SECTION_IDS.video]: {
    label: "Cinematic Video",
    title: "Beverly Hills Estate — Property Film",
    summary:
      "A 90-second cinematic property film with gimbal walkthrough, licensed score and branded + unbranded MLS cuts.",
    imageUrl: STUDIO_MEDIA.portfolio1,
    highlights: [
      "4K cinematic",
      "Gimbal walkthrough",
      "Licensed music",
      "Social vertical cut",
    ],
  },
  [HOME_SECTION_IDS.aiMedia]: {
    label: "AI Media",
    title: "AI Property Reel — Social Campaign",
    summary:
      "One shoot expanded into a full social campaign: AI-assisted edits, voiceover, virtual renovation concepts and day-to-dusk variations.",
    imageUrl: STUDIO_MEDIA.portfolio2,
    highlights: ["AI voiceover", "Virtual renovation", "Day-to-dusk", "6 social variations"],
  },
  [HOME_SECTION_IDS.drone]: {
    label: "Aerial",
    title: "Malibu Cliffside — Aerial Package",
    summary:
      "Licensed aerial photo and video coverage showing architecture, land, coastline and neighborhood context.",
    imageUrl: STUDIO_MEDIA.drone,
    highlights: [
      "Aerial stills",
      "Cinematic orbits",
      "Neighborhood context",
      "FAA-licensed pilot",
    ],
  },
  [HOME_SECTION_IDS.tours]: {
    label: "3D Tour",
    title: "Interactive Matterport Digital Twin",
    summary:
      "A fully navigable digital twin with dollhouse view, floor plan and measurement mode — embeddable anywhere.",
    imageUrl: STUDIO_MEDIA.matterport,
    highlights: ["Dollhouse view", "Floor plan", "Measurements", "MLS-ready link"],
    embedUrl: MATTERPORT_EMBED_URL,
  },
  [HOME_SECTION_IDS.scanToBim]: {
    label: "Scan-to-BIM",
    title: "Wilshire Lobby — Point Cloud to Revit",
    summary:
      "Registered laser scan of a commercial lobby converted into an LOD 200 Revit model with as-built documentation.",
    imageUrl: STUDIO_MEDIA.scanBim,
    highlights: [
      "E57 / RCP point cloud",
      "LOD 200 Revit model",
      "Plans & sections",
      "As-built set",
    ],
  },
  [HOME_SECTION_IDS.webPagesTeaser]: {
    label: "Landing Page",
    title: "Single-Property Website — Live Example",
    summary:
      "Every asset from the shoot assembled into one branded property page with 3D tour, video hero and lead capture.",
    imageUrl: STUDIO_MEDIA.landingPage,
    highlights: ["Video hero", "Embedded 3D tour", "Lead capture", "Custom domain"],
  },
};

const EXAMPLE_FALLBACK_HIGHLIGHTS = 4;

/** Resolve example popup content for a service section key. */
export function studioServiceExample(
  sectionKey: string,
  fallback: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly imageUrl: string;
    readonly included: readonly string[];
  },
): StudioServiceExample {
  const authored = STUDIO_SERVICE_EXAMPLES[sectionKey];
  if (authored) {
    return authored;
  }

  return {
    label: fallback.eyebrow,
    title: fallback.title,
    summary: fallback.description,
    imageUrl: fallback.imageUrl,
    highlights: fallback.included.slice(0, EXAMPLE_FALLBACK_HIGHLIGHTS),
  };
}
