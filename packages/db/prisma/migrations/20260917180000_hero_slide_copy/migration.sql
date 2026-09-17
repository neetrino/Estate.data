-- AlterTable
ALTER TABLE "home_heroes" ADD COLUMN "copy_mode" TEXT NOT NULL DEFAULT 'shared';

-- AlterTable
ALTER TABLE "home_hero_slides" ADD COLUMN "title" TEXT,
ADD COLUMN "description" TEXT;
