-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'paid', 'failed', 'cancelled', 'refunded');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AlterTable
ALTER TABLE "portfolio_projects" ADD COLUMN "featured_on_home" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "portfolio_project_translations" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "image_alt" TEXT,
    "category" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_project_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pricing_category_translations" (
    "id" TEXT NOT NULL,
    "category_key" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "section_title" TEXT NOT NULL,
    "price_suffix" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pricing_category_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'AMD',
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "provider" TEXT,
    "provider_ref" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "provider_data" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "portfolio_projects_published_featured_on_home_sort_order_idx" ON "portfolio_projects"("published", "featured_on_home", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_project_translations_project_id_locale_key" ON "portfolio_project_translations"("project_id", "locale");

-- CreateIndex
CREATE INDEX "portfolio_project_translations_locale_idx" ON "portfolio_project_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "pricing_category_translations_category_key_locale_key" ON "pricing_category_translations"("category_key", "locale");

-- CreateIndex
CREATE INDEX "pricing_category_translations_locale_idx" ON "pricing_category_translations"("locale");

-- CreateIndex
CREATE INDEX "orders_status_idx" ON "orders"("status");

-- CreateIndex
CREATE INDEX "orders_provider_provider_ref_idx" ON "orders"("provider", "provider_ref");

-- CreateIndex
CREATE INDEX "payments_order_id_idx" ON "payments"("order_id");

-- AddForeignKey
ALTER TABLE "portfolio_project_translations" ADD CONSTRAINT "portfolio_project_translations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "portfolio_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pricing_category_translations" ADD CONSTRAINT "pricing_category_translations_category_key_fkey" FOREIGN KEY ("category_key") REFERENCES "pricing_categories"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
