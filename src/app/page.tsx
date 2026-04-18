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

const visualStories = [
  {
    image: rLandscape,
    title: "Editorial design that feels wide open.",
    copy: "A cinematic layout for big-picture reading journeys, with calm motion and strong contrast so the page feels alive without becoming loud.",
    caption: "Curated reading flow",
    layout: "xl:col-span-2",
    aspect: "aspect-[16/7]",
  },
  {
    image: parkReader,
    title: "Reading in the wild.",
    copy: "Placed beside the text, this frame keeps the image large while the copy stays easy to scan and anchored to the action.",
    caption: "Focus and discovery",
    layout: "",
    aspect: "aspect-[4/3]",
  },
  {
    image: gardenScene,
    title: "Soft, premium, and human.",
    copy: "The background motion and rounded surfaces help the whole section feel polished while still staying warm and book-like.",
    caption: "Gentle movement",
    layout: "",
    aspect: "aspect-[4/3]",
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

          <div className="mt-10 grid gap-6 xl:grid-cols-3 xl:auto-rows-[minmax(280px,auto)]">
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

                  <div className="space-y-3 p-5 lg:p-6">
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
                  <section id="testimonials" className="border-b border-(--border-soft) bg-(--page) py-16 sm:py-20" data-reveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
                        title="Reader stories in a wider editorial layout."
                        description="This section uses a horizontal hero card with compact supporting cards so the content spreads across the page instead of stacking too tall."
            align="center"
          />
                      <div className="mt-12 grid gap-6">
                        <article
                          className="group overflow-hidden rounded-4xl border border-(--border) bg-(--surface) shadow-[0_30px_90px_rgba(15,23,42,0.08)]"
                          data-reveal
                          data-reveal-delay="1"
                        >
                          <div className="grid gap-0 lg:grid-cols-[1.12fr_0.88fr]">
                            <div className="relative min-h-88 overflow-hidden bg-(--surface-soft) lg:min-h-112">
                              <Image src={peepsPortrait} alt={testimonials[0].name} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
                              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.82),rgba(15,23,42,0.12)_58%,rgba(15,23,42,0.18))]" />
                              <div className="absolute left-6 top-6 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                                Featured reader
                              </div>
                            </div>
                            <div className="flex flex-col justify-between gap-6 p-6 sm:p-8 lg:min-h-112">
                              <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--muted)">{testimonials[0].name}</p>
                                <p className="mt-4 max-w-2xl text-[1.4rem] leading-[1.22] tracking-[-0.04em] text-(--text) sm:text-[1.9rem]">
                                  {testimonials[0].quote}
                                </p>
                              </div>
                              <div className="grid gap-3 border-t border-(--border-soft) pt-5 sm:grid-cols-3">
                                <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Role</p>
                                  <p className="mt-2 text-sm leading-6 text-(--text)">{testimonials[0].role}</p>
                                </div>
                                <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Rating</p>
                                  <p className="mt-2 text-sm leading-6 text-(--text)">{testimonials[0].rating.toFixed(1)} / 5</p>
                                </div>
                                <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Context</p>
                                  <p className="mt-2 text-sm leading-6 text-(--text)">{testimonials[0].context}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </article>

                        <div className="grid gap-4 lg:grid-cols-2">
                          {[testimonials[1], testimonials[2]].map((testimonial, index) => {
                            const portrait = index === 0 ? peoplePortrait : girlPortrait;

                            return (
                              <article
                                key={testimonial.name}
                                className="flex items-center gap-4 rounded-4xl border border-(--border) bg-(--surface) p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)]"
                                data-reveal
                                data-reveal-delay={String(index + 2)}
                              >
                                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-3xl border border-(--border) bg-(--surface-soft)">
                                  <Image src={portrait} alt={testimonial.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="min-w-0 flex-1 space-y-3">
                                  <p className="text-[1.05rem] leading-[1.35] tracking-[-0.025em] text-(--text) sm:text-[1.2rem]">
                                    {testimonial.quote}
                                  </p>
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-(--border-soft) pt-3 text-sm">
                                    <p className="font-semibold text-(--text)">{testimonial.name}</p>
                                    <span className="text-(--muted)">{testimonial.role}</span>
                                    <span className="text-(--muted)">•</span>
                                    <span className="text-(--muted)">{testimonial.context}</span>
                                  </div>
                                </div>
                              </article>
                            );
                          })}
                        </div>
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


