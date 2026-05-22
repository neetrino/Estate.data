import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";
import { ASSET_KEYS } from "../src/asset-keys";

const prisma = new PrismaClient();

const SEED_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../apps/web/public",
);

type SeedAsset = {
  key: string;
  mimeType: string;
  relativePath?: string;
  absolutePath?: string;
};

const SEED_ASSETS: readonly SeedAsset[] = [
  {
    key: ASSET_KEYS.siteLogo,
    relativePath: "images/logo-estatedata.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.siteLogoDark,
    relativePath: "images/logo-estatedata-dark.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.homeHero,
    relativePath: "images/hero-home.jpg",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.navPhoneIcon,
    relativePath: "icons/phone.svg",
    mimeType: "image/svg+xml",
  },
  {
    key: ASSET_KEYS.whatWeDoPhotographyIcon,
    relativePath: "icons/what-we-do/photography.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoCinematicVideoIcon,
    relativePath: "icons/what-we-do/cinematic-video.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoDroneAerialIcon,
    relativePath: "icons/what-we-do/drone-aerial.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoToursFloorplansIcon,
    relativePath: "icons/what-we-do/tours-floorplans.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.whatWeDoMarketIntelligenceIcon,
    relativePath: "icons/what-we-do/market-intelligence.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.propertyIntelligenceHero,
    relativePath: "images/property-intelligence/scan-to-bim.jpg",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.recentWorkPlaceholder,
    relativePath: "images/recent-work/placeholder.jpg",
    mimeType: "image/jpeg",
  },
  {
    key: ASSET_KEYS.clientVoicesQuoteMarks,
    relativePath: "images/client-voices/quote-marks.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.aboutTeamCollaboration,
    relativePath: "images/about/team-collaboration.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactLocationIcon,
    relativePath: "images/contact/location.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactPhoneIcon,
    relativePath: "images/contact/phone.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.contactEmailIcon,
    relativePath: "images/contact/mail.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.siteFavicon,
    relativePath: "images/site-favicon.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.siteAppleIcon,
    relativePath: "images/site-apple-icon.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedCompass,
    relativePath: "images/trusted/compass.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedSothebys,
    relativePath: "images/trusted/sothebys.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedTheAgency,
    relativePath: "images/trusted/the-agency.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedDouglasElliman,
    relativePath: "images/trusted/douglas-elliman.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedColdwellBanker,
    relativePath: "images/trusted/coldwell-banker.png",
    mimeType: "image/png",
  },
  {
    key: ASSET_KEYS.trustedHiltonHyland,
    relativePath: "images/trusted/hilton-hyland.png",
    mimeType: "image/png",
  },
] as const;

function resolveSeedFilePath(entry: SeedAsset): string {
  if (entry.absolutePath) {
    return entry.absolutePath;
  }
  if (entry.relativePath) {
    return path.join(SEED_DIR, entry.relativePath);
  }
  throw new Error(`Seed asset "${entry.key}" has no file path`);
}

async function seedAsset(entry: SeedAsset): Promise<void> {
  const filePath = resolveSeedFilePath(entry);
  const data = await readFile(filePath);
  const fileName = path.basename(filePath);

  await prisma.asset.upsert({
    where: { key: entry.key },
    create: {
      key: entry.key,
      mimeType: entry.mimeType,
      fileName,
      data,
      byteSize: data.byteLength,
    },
    update: {
      mimeType: entry.mimeType,
      fileName,
      data,
      byteSize: data.byteLength,
    },
  });

  console.info(`Seeded asset: ${entry.key} (${data.byteLength} bytes)`);
}

async function main(): Promise<void> {
  for (const entry of SEED_ASSETS) {
    await seedAsset(entry);
  }
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
