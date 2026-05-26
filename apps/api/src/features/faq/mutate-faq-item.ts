import type {
  CreateFaqItemInput,
  FaqItemDto,
} from "@/features/faq/faq.schema";
import { ApiError } from "@/lib/api-error";
import { getPrisma } from "@/lib/db";

/** Create a FAQ item (admin). */
export async function createFaqItem(input: CreateFaqItemInput): Promise<FaqItemDto> {
  return getPrisma().faqItem.create({
    data: {
      question: input.question,
      answer: input.answer,
      sortOrder: input.sortOrder ?? 0,
      published: input.published ?? true,
    },
    select: {
      id: true,
      question: true,
      answer: true,
    },
  });
}

/** Update a FAQ item by id (admin). */
export async function updateFaqItem(
  id: string,
  input: Partial<CreateFaqItemInput>,
): Promise<FaqItemDto> {
  const existing = await getPrisma().faqItem.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    throw ApiError.notFound("FAQ item not found");
  }

  return getPrisma().faqItem.update({
    where: { id },
    data: {
      ...(input.question !== undefined ? { question: input.question } : {}),
      ...(input.answer !== undefined ? { answer: input.answer } : {}),
      ...(input.sortOrder !== undefined ? { sortOrder: input.sortOrder } : {}),
      ...(input.published !== undefined ? { published: input.published } : {}),
    },
    select: {
      id: true,
      question: true,
      answer: true,
    },
  });
}
