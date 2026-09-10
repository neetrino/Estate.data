-- AlterTable
ALTER TABLE "studio_service_sections" ADD COLUMN IF NOT EXISTS "starting_price" TEXT;
ALTER TABLE "studio_service_sections" ADD COLUMN IF NOT EXISTS "pricing_unit" TEXT;
ALTER TABLE "studio_service_sections" ADD COLUMN IF NOT EXISTS "footnote" TEXT;

-- Backfill Starting at prices for known service keys (master site values).
UPDATE "studio_service_sections"
SET "starting_price" = '$249'
WHERE "section_key" = 'photography' AND ("starting_price" IS NULL OR "starting_price" = '');

UPDATE "studio_service_sections"
SET "starting_price" = '$20', "pricing_unit" = '/ image'
WHERE "section_key" = 'editing' AND ("starting_price" IS NULL OR "starting_price" = '');

UPDATE "studio_service_sections"
SET "starting_price" = '$499'
WHERE "section_key" = 'video' AND ("starting_price" IS NULL OR "starting_price" = '');

UPDATE "studio_service_sections"
SET "footnote" = 'AI-generated content is clearly identified where appropriate and is designed for marketing and visualization purposes.'
WHERE "section_key" = 'ai-media' AND ("footnote" IS NULL OR "footnote" = '');

UPDATE "studio_service_sections"
SET "footnote" = 'Drone operations are subject to applicable FAA regulations, airspace restrictions and weather conditions.'
WHERE "section_key" = 'drone' AND ("footnote" IS NULL OR "footnote" = '');
