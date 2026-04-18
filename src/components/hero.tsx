"use client";

import type { Book } from "@/data/books";
import type { Stat } from "@/data/site";
import { FloatingBooksBackdrop } from "@/components/floating-books";
import { useCmsSettings } from "@/lib/cms";

type HeroProps = {
  featuredBook: Book;
  stats: Stat[];
};

export function Hero({ featuredBook, stats }: HeroProps) {
  const cms = useCmsSettings();

  return (
    <section className="relative overflow-hidden border-b border-(--border-soft) bg-(--surface) text-(--text)">
      <FloatingBooksBackdrop className="opacity-100 mask-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.24),rgba(0,0,0,0.08))]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,1),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(249,249,249,0.95),transparent_32%)]" />
      <div className="absolute inset-x-0 top-0 z-0 h-px bg-linear-to-r from-transparent via-(--border) to-transparent" />
      <div className="absolute left-0 top-20 z-0 h-72 w-72 rounded-full bg-white/90 blur-3xl animate-pulse-soft" />
      <div className="absolute right-0 top-40 z-0 h-80 w-80 rounded-full bg-(--surface-soft) blur-3xl animate-pulse-soft" />

      <div className="relative z-20 mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:px-8 lg:py-24 2xl:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] 2xl:gap-20 animate-page-enter">
        <div className="min-w-0 flex flex-col justify-center" data-reveal>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-(--border) bg-(--accent) px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-(--text) shadow-[0_12px_30px_rgba(15,23,42,0.05)] animate-float-slow">
            <span className="h-2 w-2 rounded-full bg-(--text)" />
            {cms.heroLabel}
          </div>
          <h1 className="mt-6 max-w-155 font-display text-5xl font-bold leading-[0.98] tracking-[-0.06em] text-(--text) sm:text-6xl lg:text-[4.9rem]">
            {cms.heroHeadline}
          </h1>
          <p className="mt-6 max-w-140 text-lg leading-8 text-(--muted) sm:text-xl">
            {cms.heroDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-(--text) px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03]"
            >
              {cms.primaryCta}
            </a>
            <a
              href="/guides"
              className="inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-6 py-3.5 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)"
            >
              {cms.secondaryCta}
            </a>
          </div>

          <div className="mt-8 overflow-hidden rounded-full border border-(--border) bg-white px-4 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
            <div className="flex min-w-full w-max items-center gap-8 whitespace-nowrap animate-marquee">
              {[
                "Focus",
                "Reading loops",
                "Knowledge capture",
                "Wealth mindset",
                "Curated guides",
                "Bookmarks",
                "Self-development",
                "Premium ebooks",
              ].map((word) => (
                <span key={word} className="text-sm font-semibold uppercase tracking-[0.3em] text-(--muted)">
                  {word}
                </span>
              ))}
              {[
                "Focus",
                "Reading loops",
                "Knowledge capture",
                "Wealth mindset",
                "Curated guides",
                "Bookmarks",
                "Self-development",
                "Premium ebooks",
              ].map((word) => (
                <span key={`${word}-repeat`} className="text-sm font-semibold uppercase tracking-[0.3em] text-(--muted)">
                  {word}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-(--border) bg-white p-4 transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                Editorial focus
              </p>
              <p className="mt-3 text-2xl font-display font-bold text-(--text)">Outcome first</p>
              <p className="mt-2 text-sm leading-6 text-(--muted)">
                Every shelf is designed around what the reader wants to do next.
              </p>
            </div>
            <div className="rounded-3xl border border-(--border) bg-white p-4 transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                Knowledge capture
              </p>
              <p className="mt-3 text-2xl font-display font-bold text-(--text)">Bookmarks</p>
              <p className="mt-2 text-sm leading-6 text-(--muted)">
                Save titles, revisit them, and build a reading stack over time.
              </p>
            </div>
            <div className="rounded-3xl border border-(--border) bg-white p-4 transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                High trust
              </p>
              <p className="mt-3 text-2xl font-display font-bold text-(--text)">Premium flow</p>
              <p className="mt-2 text-sm leading-6 text-(--muted)">
                Strong hierarchy, clear CTAs, and just enough whitespace to breathe.
              </p>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex items-center justify-center" data-reveal data-reveal-delay="2">
          <div className="relative w-full max-w-[52rem] rounded-4xl border border-(--border) bg-white p-4 shadow-[0_36px_100px_rgba(15,23,42,0.08)] backdrop-blur-xl animate-float-slow sm:p-5">
            <div className="absolute -left-4 top-8 hidden w-44 rounded-3xl border border-(--border) bg-white px-4 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] lg:block animate-float">
              <p className="text-xs uppercase tracking-[0.28em] text-(--muted)">Now reading</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-(--text)">The Focus Protocol</p>
            </div>
            <div className="absolute -right-5 bottom-12 hidden w-40 rounded-3xl border border-(--border) bg-white px-4 py-2.5 shadow-[0_18px_50px_rgba(0,0,0,0.08)] lg:block animate-float delay-1400">
              <p className="text-xs uppercase tracking-[0.28em] text-(--muted)">Saved</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-(--text)">Quiet Wealth</p>
            </div>
            <div className="rounded-3xl border border-(--border) bg-linear-to-br from-white via-[#fbfbf9] to-[#f2f4f7] p-4 transition duration-300 hover:scale-[1.01] sm:p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
                    Featured shelf
                  </p>
                  <h2 className="mt-2 max-w-[12ch] font-display text-[2.65rem] font-bold leading-[0.96] tracking-[-0.06em] text-(--text) sm:text-5xl">
                    {featuredBook.title}
                  </h2>
                  <p className="mt-2 text-sm text-(--muted)">By {featuredBook.author}</p>
                </div>
                <div className="rounded-full border border-(--border) bg-white px-3 py-1.5 text-sm font-semibold text-(--text)">
                  {featuredBook.rating.toFixed(1)}
                </div>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-(--muted)">
                {featuredBook.summary}
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl border border-(--border) bg-white p-4 transition duration-300 hover:scale-[1.02]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                    What you unlock
                  </p>
                  <p className="mt-2 text-sm leading-6 text-(--text)">{featuredBook.outcome}</p>
                </div>
                <div className="rounded-3xl border border-(--border) bg-white p-4 transition duration-300 hover:scale-[1.02]">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
                    Read time
                  </p>
                  <p className="mt-2 text-sm leading-6 text-(--text)">{featuredBook.readTime}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {featuredBook.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-(--border) bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-(--muted)"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-(--border) bg-white p-4 transition duration-300 hover:scale-[1.03]">
                  <p className="text-2xl font-display text-(--text)">{stat.value}</p>
                  <p className="mt-1 text-sm font-semibold text-(--text)">{stat.label}</p>
                  <p className="mt-2 text-xs leading-5 text-(--muted)">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
