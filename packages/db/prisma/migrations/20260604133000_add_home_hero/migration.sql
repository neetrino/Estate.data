-- CreateTable
CREATE TABLE "home_heroes" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "primary_button_label" TEXT NOT NULL,
    "primary_button_href" TEXT NOT NULL,
    "secondary_button_label" TEXT NOT NULL,
    "secondary_button_href" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "home_heroes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "home_heroes_key_key" ON "home_heroes"("key");
