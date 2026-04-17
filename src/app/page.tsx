import { Suspense } from "react";
import { BookBrowser } from "@/components/book-browser";
import { CtaBanner } from "@/components/cta-banner";
import { FeatureGrid } from "@/components/feature-grid";
import { FloatingBooksBackdrop } from "@/components/floating-books";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SocialProof } from "@/components/social-proof";
import { ValueProp } from "@/components/value-prop";
import { books, featuredBooks } from "@/data/books";
import { stats } from "@/data/site";

export default function Home() {
  const featuredBook = featuredBooks[0] ?? books[0];

  return (
    <main className="relative overflow-x-hidden bg-(--page)">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_38%),radial-gradient(circle_at_top_right,rgba(244,245,247,0.96),transparent_33%),radial-gradient(circle_at_bottom,rgba(250,248,244,0.9),transparent_42%)]" />
      <FloatingBooksBackdrop className="top-[120px] opacity-40" />
      <SiteHeader />
      <Hero featuredBook={featuredBook} stats={stats} />
      <ValueProp />
      <FeatureGrid />
      <SocialProof />
      <HowItWorks />
      <Suspense fallback={<div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-4xl border border-(--border) bg-white px-6 py-10 text-sm text-(--muted)">Loading library preview...</div></div>}>
        <BookBrowser books={books} initialBookSlug={featuredBook.slug} />
      </Suspense>
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
