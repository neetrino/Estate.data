import type { PrismaClient } from "@prisma/client";
import {
  CONTACT_FIELDS,
  HERO_SLIDES,
  STUDIO_SEED_CONTACT_HREF,
  STUDIO_SEED_GALLERY,
  STUDIO_SEED_SERVICES,
} from "./seed-studio-data";

/** Seed hero slides, service blocks, and contact field modes. */
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

  await prisma.studioServiceSection.deleteMany({
    where: {
      sectionKey: { notIn: STUDIO_SEED_SERVICES.map((service) => service.sectionKey) },
    },
  });

  for (const field of CONTACT_FIELDS) {
    await prisma.contactFieldSetting.upsert({
      where: { fieldKey: field.fieldKey },
      create: field,
      update: field,
    });
  }

  await prisma.contactFieldSetting.deleteMany({
    where: {
      fieldKey: { notIn: CONTACT_FIELDS.map((field) => field.fieldKey) },
    },
  });

  console.info("Seeded studio CMS (slides, services, contact fields)");
}
