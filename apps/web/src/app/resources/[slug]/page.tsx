import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/features/resources/ArticleDetailPage";
import { fetchArticleBySlug } from "@/features/resources/services/fetchArticleBySlug";

type ArticleRoutePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticleRoutePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  return {
    title: article.title,
    description: article.body.slice(0, 160),
  };
}

export default async function ArticleRoutePage({ params }: ArticleRoutePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return <ArticleDetailPage article={article} />;
}
