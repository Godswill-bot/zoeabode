import type { Metadata } from "next";
import { Suspense } from "react";
import { BookBrowser } from "@/components/book-browser";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { SiteFooter } from "@/components/site-footer";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Library | Zoe's BookSphere",
  description: "Browse the curated Zoe's BookSphere library with bookmarks and recommendations.",
};

export default function LibraryPage() {
  return (
    <main className="bg-(--page)">
      <PageHeader />
      <section className="border-b border-(--border-soft) py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Library"
            title="Browse the full knowledge shelf."
            description="This page is optimized for exploration: use filters, open details, and save titles for later reading sessions."
          />
          <div className="mt-12">
            <Suspense fallback={<div className="rounded-4xl border border-(--border) bg-white px-6 py-10 text-sm text-(--muted)">Loading library preview...</div>}>
              <BookBrowser books={books} initialBookSlug={books[0].slug} />
            </Suspense>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
