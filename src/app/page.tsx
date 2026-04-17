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
import rLandscape from "../../R.jpg";
import parkReader from "../../ai-generated-young-woman-reading-a-book-in-the-park-at-sunset-beautiful-nature-background-photo.jpg";
import gardenScene from "../../woman garden.webp";
import peepsPortrait from "../../peeps.webp";
import peoplePortrait from "../../people.webp";
import girlPortrait from "../../girl.jpg";

const testimonialTiles = [
  { kind: "portrait" as const, testimonial: testimonials[0], portrait: peepsPortrait, className: "lg:row-span-2" },
  { kind: "quote" as const, testimonial: testimonials[0], className: "lg:col-span-1" },
  { kind: "portrait" as const, testimonial: testimonials[1], portrait: peoplePortrait, className: "lg:row-span-2" },
  { kind: "quote" as const, testimonial: testimonials[1], className: "lg:col-span-1" },
  { kind: "quote" as const, testimonial: testimonials[2], className: "lg:col-span-1" },
  { kind: "portrait" as const, testimonial: testimonials[2], portrait: girlPortrait, className: "lg:row-span-2" },
];

const visualStories = [
  {
    image: rLandscape,
    title: "Editorial design that feels wide open.",
    copy: "A cinematic layout for big-picture reading journeys, with calm motion and strong contrast so the page feels alive without becoming loud.",
    caption: "Curated reading flow",
    layout: "xl:col-span-2 xl:row-span-2",
    aspect: "aspect-[16/10]",
  },
  {
    image: parkReader,
    title: "Reading in the wild.",
    copy: "Placed beside the text, this frame keeps the image large while the copy stays easy to scan and anchored to the action.",
    caption: "Focus and discovery",
    layout: "",
    aspect: "aspect-[4/5]",
  },
  {
    image: gardenScene,
    title: "Soft, premium, and human.",
    copy: "The background motion and rounded surfaces help the whole section feel polished while still staying warm and book-like.",
    caption: "Gentle movement",
    layout: "",
    aspect: "aspect-[4/5]",
  },
];

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
      <section id="visual-stories" className="border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Visual stories"
            title="Large animated pictures that keep the home page feeling premium."
            description="This section uses oversized imagery, soft motion, and short supporting text to make the site feel more editorial and more alive at a glance."
            align="center"
          />

          <div className="mt-10 grid gap-6 xl:grid-cols-3 xl:auto-rows-[minmax(340px,1fr)]">
            {visualStories.map((story, index) => {
              const isFeature = index === 0;

              return (
                <article
                  key={story.title}
                  className={`group overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-[0_30px_90px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_36px_110px_rgba(15,23,42,0.12)] ${story.layout}`}
                  data-reveal
                  data-reveal-delay={String((index % 3) + 1)}
                >
                  <div className={`relative ${story.aspect} overflow-hidden bg-(--surface-soft)`}>
                    <Image
                      src={story.image}
                      alt={story.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      priority={isFeature}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.34),rgba(15,23,42,0.02)_55%,rgba(15,23,42,0.08))]" />
                    <div className="absolute right-5 top-5 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur-md">
                      {story.caption}
                    </div>
                  </div>

                  <div className="space-y-3 p-6 lg:p-7">
                    <h3 className="font-display text-3xl font-bold leading-[1.02] tracking-[-0.05em] text-(--text)">
                      {story.title}
                    </h3>
                    <p className="max-w-2xl text-base leading-7 text-(--muted)">{story.copy}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
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
              {previewBooks.map((book, index) => (
                <article key={book.id} className="rounded-4xl border border-(--border) bg-(--surface) p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)]" data-reveal data-reveal-delay={String((index % 3) + 1)}>
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
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:auto-rows-[210px]">
            {testimonialTiles.map((tile, index) => {
              const testimonial = tile.testimonial;

              if (tile.kind === "portrait") {
                return (
                  <article
                    key={`${testimonial.name}-portrait-${index}`}
                      className={`group relative overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-[0_24px_80px_rgba(15,23,42,0.08)] ${tile.className}`}
                    data-reveal
                    data-reveal-delay={String((index % 3) + 1)}
                  >
                    <div className="absolute inset-0">
                      <Image src={tile.portrait} alt={testimonial.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.9),rgba(15,23,42,0.12)_55%,rgba(15,23,42,0.25))]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white shadow-[0_10px_30px_rgba(15,23,42,0.2)] backdrop-blur-md transition duration-300 group-hover:scale-[1.06]">
                        <span className="ml-1 text-xl">▶</span>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">{testimonial.name}</p>
                      <p className="mt-2 text-xl font-display font-bold leading-[1.14] tracking-[-0.04em] sm:text-[1.65rem]">
                        {testimonial.quote}
                      </p>
                      <p className="mt-3 text-sm text-white/80">{testimonial.role}</p>
                    </div>
                  </article>
                );
              }

              return (
                <article
                  key={`${testimonial.name}-quote-${index}`}
                  className={`flex min-h-[320px] flex-col justify-between rounded-4xl border border-(--border) bg-(--surface) p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)] ${tile.className}`}
                  data-reveal
                  data-reveal-delay={String((index % 3) + 1)}
                >
                  <p className="max-w-2xl text-[1.25rem] leading-[1.28] tracking-[-0.035em] text-(--text) sm:text-[1.45rem]">
                    “{testimonial.quote}”
                  </p>
                  <div className="mt-10 border-t border-(--border) pt-5">
                    <p className="font-semibold text-(--text)">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-(--muted)">{testimonial.role}</p>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
                      {testimonial.context}
                    </p>
                  </div>
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
