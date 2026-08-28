-- AlterTable
ALTER TABLE "contact_inquiries" ALTER COLUMN "property_address" DROP NOT NULL;
ALTER TABLE "contact_inquiries" ADD COLUMN "phone" TEXT;
ALTER TABLE "contact_inquiries" ADD COLUMN "company" TEXT;
ALTER TABLE "contact_inquiries" ADD COLUMN "extra_fields" JSONB;

-- CreateTable
CREATE TABLE "home_hero_slides" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_key" TEXT,
    "thumb_url" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_hero_slides_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studio_service_sections" (
    "id" TEXT NOT NULL,
    "section_key" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "gallery_urls" JSONB NOT NULL,
    "included" JSONB NOT NULL,
    "pricing" JSONB NOT NULL,
    "primary_cta_label" TEXT NOT NULL,
    "primary_cta_href" TEXT NOT NULL,
    "secondary_cta_label" TEXT NOT NULL,
    "secondary_cta_href" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studio_service_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_copies" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_copies_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "contact_field_settings" (
    "id" TEXT NOT NULL,
    "field_key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL DEFAULT '',
    "mode" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_field_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "home_hero_slides_published_sort_order_idx" ON "home_hero_slides"("published", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "studio_service_sections_section_key_key" ON "studio_service_sections"("section_key");

-- CreateIndex
CREATE INDEX "studio_service_sections_published_sort_order_idx" ON "studio_service_sections"("published", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "contact_field_settings_field_key_key" ON "contact_field_settings"("field_key");

-- CreateIndex
CREATE INDEX "contact_field_settings_sort_order_idx" ON "contact_field_settings"("sort_order");
