-- CreateTable
CREATE TABLE "pricing_categories" (
    "key" TEXT NOT NULL,
    "section_title" TEXT NOT NULL,
    "price_suffix" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_categories_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "pricing_packages" (
    "id" TEXT NOT NULL,
    "category_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "price_suffix_override" TEXT,
    "features" JSONB NOT NULL,
    "book_label" TEXT NOT NULL,
    "book_href" TEXT NOT NULL,
    "card_accent" TEXT,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,
    "badge_label" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_packages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "pricing_packages_category_key_published_sort_order_idx" ON "pricing_packages"("category_key", "published", "sort_order");

-- AddForeignKey
ALTER TABLE "pricing_packages" ADD CONSTRAINT "pricing_packages_category_key_fkey" FOREIGN KEY ("category_key") REFERENCES "pricing_categories"("key") ON DELETE CASCADE ON UPDATE CASCADE;
