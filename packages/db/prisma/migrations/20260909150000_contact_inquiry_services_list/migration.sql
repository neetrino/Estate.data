-- AlterTable
ALTER TABLE "contact_inquiries" ADD COLUMN "services" TEXT[];

-- Backfill the previous single service value into the new list column
UPDATE "contact_inquiries" SET "services" = ARRAY["service"] WHERE "service" <> '';
UPDATE "contact_inquiries" SET "services" = ARRAY[]::TEXT[] WHERE "services" IS NULL;

ALTER TABLE "contact_inquiries" DROP COLUMN "service";
