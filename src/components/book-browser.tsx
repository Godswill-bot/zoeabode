"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Book } from "@/data/books";
import { BookCard } from "@/components/book-card";
import { BookDetailPanel } from "@/components/book-detail-panel";
import { SectionHeading } from "@/components/section-heading";
import { toggleBookmarkId, useBookmarks } from "@/lib/bookmarks";
import { findBookBySlug, getLibraryFilters, getRecommendedBooks, getVisibleBooks } from "@/lib/books";
import { useUploadedBooks } from "@/lib/admin";

type BookBrowserProps = {
  books: Book[];
  initialBookSlug: string;
};

export function BookBrowser({ books, initialBookSlug }: BookBrowserProps) {
  const searchParams = useSearchParams();
  const queryFilter = searchParams.get("filter") ?? "Featured";
  const [selectedSlug, setSelectedSlug] = useState(initialBookSlug);
  const bookmarkIds = useBookmarks();
  const uploadedBooks = useUploadedBooks();

  const catalogBooks = useMemo(() => [...uploadedBooks, ...books], [books, uploadedBooks]);
  const activeFilter = queryFilter;

  const visibleBooks = getVisibleBooks(catalogBooks, activeFilter);
  const selectedBook =
    findBookBySlug(visibleBooks, selectedSlug) ?? visibleBooks[0] ?? books[0];
  const recommendations = getRecommendedBooks(catalogBooks, selectedBook, 3);
  const filters = getLibraryFilters(catalogBooks);
  const savedBooks = catalogBooks.filter((book) => bookmarkIds.includes(book.id));

  function filterHref(filter: string) {
    return `/library?filter=${encodeURIComponent(filter)}`;
  }

  function toggleBookmark(bookId: string) {
    toggleBookmarkId(bookId);
  }

  return (
    <section id="library" className="scroll-mt-24 border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Library"
          title="A book showcase that behaves like a product surface."
          description="This is the heart of Zoe's BookSphere: browsing, bookmarking, and recommendation are all visible in one clear layout so the product feels useful right away."
        />

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {filters.map((filter, index) => (
            <Link
              key={filter}
              href={filterHref(filter)}
              className={`tab-chip inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold ${
                activeFilter === filter
                  ? "border-(--text) bg-(--text) text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)]"
                  : "border-(--border) bg-(--surface) text-(--muted) hover:border-(--text) hover:text-(--text)"
              }`}
              data-reveal
              data-reveal-delay={String((index % 3) + 1)}
            >
              {filter}
            </Link>
          ))}
          <div className="ml-auto rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-semibold text-(--muted)">
            {savedBooks.length} saved
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
          <div className="grid auto-rows-min items-start gap-4 md:grid-cols-2">
            {visibleBooks.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                selected={book.slug === selectedBook.slug}
                bookmarked={bookmarkIds.includes(book.id)}
                actionLabel="Preview"
                actionHref={`/books/${book.slug}`}
                onAction={() => setSelectedSlug(book.slug)}
                showBookmarkButton
                onToggleBookmark={() => toggleBookmark(book.id)}
                revealDelay={String((index % 3) + 1)}
              />
            ))}
          </div>

          <div className="space-y-6 xl:self-start">
            <div className="rounded-4xl border border-(--border) bg-(--surface) p-4 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <BookDetailPanel book={selectedBook} recommendations={recommendations} />
            </div>

            {savedBooks.length > 0 ? (
              <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
                  Saved stack
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {savedBooks.map((book) => (
                    <div key={book.id} className="rounded-2xl bg-(--surface-soft) p-4">
                      <p className="font-semibold text-(--text)">{book.title}</p>
                      <p className="mt-1 text-sm text-(--muted)">{book.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
