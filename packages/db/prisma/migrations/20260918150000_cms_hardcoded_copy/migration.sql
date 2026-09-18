-- AlterTable
ALTER TABLE "home_heroes"
ADD COLUMN "eyebrow" TEXT NOT NULL DEFAULT 'Los Angeles · Real Estate Media + Digital Reality Capture';

-- AlterTable
ALTER TABLE "studio_service_sections"
ADD COLUMN "example" JSONB;
