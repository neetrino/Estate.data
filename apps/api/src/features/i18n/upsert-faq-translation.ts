import type { UpsertFaqTranslationInput } from "@/features/i18n/translation.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";
import { DEFAULT_LOCALE } from "@estate/db";

/** Upsert localized FAQ fields (admin). */
export async function upsertFaqTranslation(
  faqItemId: string,
  input: UpsertFaqTranslationInput,
) {
  if (input.locale === DEFAULT_LOCALE) {
    throw ApiError.badRequest(
      "Use FAQ PATCH for default locale content",
      "VALIDATION_ERROR",
      [{ path: "locale", message: "Cannot upsert default locale translation" }],
    );
  }

  const faqItem = await getPrisma().faqItem.findUnique({
    where: { id: faqItemId },
    select: { id: true },
  });

  if (!faqItem) {
    throw ApiError.notFound("FAQ item not found");
  }

  return getPrisma().faqItemTranslation.upsert({
    where: {
      faqItemId_locale: {
        faqItemId,
        locale: input.locale,
      },
    },
    create: {
      faqItemId,
      locale: input.locale,
      question: input.question,
      answer: input.answer,
    },
    update: {
      question: input.question,
      answer: input.answer,
    },
    select: {
      id: true,
      faqItemId: true,
      locale: true,
      question: true,
      updatedAt: true,
    },
  });
}
