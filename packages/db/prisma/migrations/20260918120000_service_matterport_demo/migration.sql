-- AlterTable
ALTER TABLE "studio_service_sections" ADD COLUMN "demo_label" TEXT,
ADD COLUMN "demo_space_id" TEXT;

UPDATE "studio_service_sections"
SET "demo_label" = 'Interactive demo',
    "demo_space_id" = 'SxQL3iGyoDo'
WHERE "section_key" = 'tours';
