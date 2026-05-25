import type { FaqItemDto } from "@/features/faq/faq.schema";
import { getPrisma } from "@/lib/db";
import { DEFAULT_LOCALE, type SupportedLocale } from "@estate/db";

async function loadFaqTranslationMap(
  faqItemIds: readonly string[],
  locale: SupportedLocale,
) {
  if (locale === DEFAULT_LOCALE || faqItemIds.length === 0) {
    return new Map<string, { question: string; answer: string }>();
  }

  const rows = await getPrisma().faqItemTranslation.findMany({
    where: {
      faqItemId: { in: [...faqItemIds] },
      locale,
    },
    select: {
      faqItemId: true,
      question: true,
      answer: true,
    },
  });

  return new Map(rows.map((row) => [row.faqItemId, row]));
}

/** Published FAQ items for the resources page. */
export async function listFaqItems(
  locale: SupportedLocale = DEFAULT_LOCALE,
): Promise<FaqItemDto[]> {
  const items = await getPrisma().faqItem.findMany({
    where: { published: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      question: true,
      answer: true,
    },
  });

  const translations = await loadFaqTranslationMap(
    items.map((item) => item.id),
    locale,
  );

  return items.map((item) => {
    const translation = translations.get(item.id);
    if (!translation) {
      return item;
    }

    return {
      id: item.id,
      question: translation.question,
      answer: translation.answer,
    };
  });
}
