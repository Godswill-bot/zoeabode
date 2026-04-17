import { Suspense } from "react";
import { BookBrowser } from "@/components/book-browser";
import { CtaBanner } from "@/components/cta-banner";
import { FeatureGrid } from "@/components/feature-grid";
import { FloatingBooksBackdrop } from "@/components/floating-books";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";
import { SocialProof } from "@/components/social-proof";
import { ValueProp } from "@/components/value-prop";
import { books, featuredBooks } from "@/data/books";
import { stats, testimonials } from "@/data/site";
import Image from "next/image";
import peepsPortrait from "../../peeps.webp";
import peoplePortrait from "../../people.webp";
import girlPortrait from "../../girl.jpg";

export default function Home() {
  const featuredBook = featuredBooks[0] ?? books[0];
  const previewBooks = books.slice(0, 3);

  return (
    <main className="relative overflow-x-hidden bg-(--page)">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-105 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),transparent_38%),radial-gradient(circle_at_top_right,rgba(244,245,247,0.96),transparent_33%),radial-gradient(circle_at_bottom,rgba(250,248,244,0.9),transparent_42%)]" />
      <FloatingBooksBackdrop className="top-30 opacity-40" />
      <SiteHeader />
      <Hero featuredBook={featuredBook} stats={stats} />
      <ValueProp />
      <FeatureGrid />
      <SocialProof />
      <HowItWorks />
      <section className="border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-(--muted)">Library</p>
              <h2 className="mt-4 font-display text-4xl leading-[0.98] tracking-[-0.05em] text-(--text) sm:text-5xl">
                The library surface that should always be visible.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-(--muted)">
                If the interactive browser is delayed by the client, this server-rendered preview still keeps the library section present on the home page.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/signup" className="inline-flex items-center justify-center rounded-full bg-(--text) px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03]">
                  Sign up to start
                </a>
                <a href="/library" className="inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-6 py-3.5 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)">
                  Open full library
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {previewBooks.map((book) => (
                <article key={book.id} className="rounded-4xl border border-(--border) bg-(--surface) p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                  <div className="h-2 rounded-full bg-linear-to-r from-[#f2b36f] via-[#ef8d5f] to-[#cf5e4f]" />
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">{book.category}</p>
                  <h3 className="mt-3 font-display text-2xl leading-tight text-(--text)">{book.title}</h3>
                  <p className="mt-2 text-sm text-(--muted)">By {book.author}</p>
                  <p className="mt-4 text-sm leading-7 text-(--muted)">{book.summary}</p>
                  <div className="mt-5 flex items-center justify-between gap-3 rounded-3xl border border-(--border) bg-(--surface-soft) px-4 py-3">
                    <span className="text-sm font-semibold text-(--text)">{book.rating.toFixed(1)} / 5</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">{book.readTime}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="border-b border-(--border-soft) bg-(--page) py-12 sm:py-16" data-reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="Reader feedback that backs the experience."
            description="Real-looking reader reactions, ratings, and profile photos keep the social proof section clear and easy to scan."
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => {
              const portrait = [peepsPortrait, peoplePortrait, girlPortrait][index % 3];

              return (
              <article key={testimonial.name} className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-3xl border border-(--border) bg-white">
                    <Image src={portrait} alt={testimonial.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Reader feedback</p>
                    <p className="mt-2 font-semibold text-(--text)">{testimonial.name}</p>
                    <p className="text-sm text-(--muted)">{testimonial.role}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span key={starIndex} className={starIndex < Math.round(testimonial.rating) ? "text-amber-500" : "text-amber-200"}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-(--muted)">{testimonial.quote}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">{testimonial.rating.toFixed(1)} / 5 rating</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8"><div className="rounded-4xl border border-(--border) bg-white px-6 py-10 text-sm text-(--muted)">Loading library preview...</div></div>}>
        <BookBrowser books={books} initialBookSlug={featuredBook.slug} />
      </Suspense>
      <CtaBanner />
      <SiteFooter />
    </main>
  );
}
