import type { PrismaClient } from "@prisma/client";
import {
  CONTACT_FIELDS,
  HERO_SLIDES,
  STUDIO_SEED_CONTACT_HREF,
  STUDIO_SEED_GALLERY,
  STUDIO_SEED_SERVICES,
} from "./seed-studio-data";

const SITE_COPY = [
  { key: "analytics.url", value: "" },
  { key: "contact.heading", value: "Let's create something great." },
] as const;

/** Seed hero slides, service blocks, contact field modes, and site copy. */
export async function seedStudioCms(prisma: PrismaClient): Promise<void> {
  for (const slide of HERO_SLIDES) {
    await prisma.homeHeroSlide.upsert({
      where: { id: slide.id },
      create: { ...slide },
      update: { ...slide },
    });
  }

  for (const service of STUDIO_SEED_SERVICES) {
    const payload = {
      ...service,
      included: [...service.included],
      pricing: [...service.pricing],
      galleryUrls: [...STUDIO_SEED_GALLERY],
      primaryCtaHref: STUDIO_SEED_CONTACT_HREF,
      secondaryCtaHref: "#gallery",
      published: true,
    };
    await prisma.studioServiceSection.upsert({
      where: { sectionKey: service.sectionKey },
      create: payload,
      update: payload,
    });
  }

  await prisma.studioServiceSection.updateMany({
    where: { sectionKey: "floor-plans" },
    data: { published: false },
  });

  for (const field of CONTACT_FIELDS) {
    await prisma.contactFieldSetting.upsert({
      where: { fieldKey: field.fieldKey },
      create: field,
      update: field,
    });
  }

  for (const copy of SITE_COPY) {
    await prisma.siteCopy.upsert({
      where: { key: copy.key },
      create: copy,
      update: { value: copy.value },
    });
  }

  console.info("Seeded studio CMS (slides, services, contact fields, site copy)");
}
