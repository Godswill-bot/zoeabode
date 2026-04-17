import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookCard } from "@/components/book-card";
import { BookDetailPanel } from "@/components/book-detail-panel";
import { SectionHeading } from "@/components/section-heading";
import { books } from "@/data/books";
import { findBookBySlug, getRecommendedBooks } from "@/lib/books";

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = findBookBySlug(books, slug);

  if (!book) {
    return {
      title: "ZoeAbode",
    };
  }

  return {
    title: `${book.title} | ZoeAbode`,
    description: book.summary,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = findBookBySlug(books, slug);

  if (!book) {
    notFound();
  }

  const recommendations = getRecommendedBooks(books, book, 3);

  return (
    <main className="bg-[color:var(--page)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl text-[color:var(--text)]">
          ZoeAbode
        </Link>
        <Link
          href="/library"
          className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--text)]"
        >
          Back to library
        </Link>
      </div>

      <section className="border-b border-[color:var(--border-soft)] pb-16 pt-8 sm:pt-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Book detail"
            title="Every title gets a clear promise, a reason to care, and a next step."
            description="This page gives each book the space it deserves while keeping the decision path short."
          />
          <div className="mt-12">
            <BookDetailPanel book={book} recommendations={recommendations} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="More recommendations"
            title="Continue with the next most relevant reads."
            description="The recommendation logic favors category fit, shared tags, and audience overlap so the list feels intentional."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {recommendations.map((recommendation) => (
              <BookCard
                key={recommendation.id}
                book={recommendation}
                actionHref={`/books/${recommendation.slug}`}
                actionLabel="View detail"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
