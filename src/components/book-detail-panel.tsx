import type { Book } from "@/data/books";

const accentMap: Record<Book["accent"], string> = {
  ember: "from-[#f2b36f] via-[#ef8d5f] to-[#cf5e4f]",
  sage: "from-[#d6e8c5] via-[#94b89f] to-[#4f7662]",
  ocean: "from-[#d6ecf7] via-[#7daed1] to-[#3d6f9f]",
  violet: "from-[#eadcf8] via-[#b89bdd] to-[#7561b8]",
  gold: "from-[#f8e1b5] via-[#d7a85d] to-[#a56f22]",
  rose: "from-[#f4d6da] via-[#d993a0] to-[#ab546a]",
};

type BookDetailPanelProps = {
  book: Book;
  recommendations?: Book[];
};

export function BookDetailPanel({ book, recommendations }: BookDetailPanelProps) {
  return (
    <div className="overflow-hidden rounded-[2.25rem] border border-(--border) bg-(--surface) shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
      <div className={`h-2 bg-linear-to-r ${accentMap[book.accent]}`} />

      <div className="grid lg:grid-cols-[0.9fr_0.06fr_1.04fr] lg:gap-0">
        <aside className="relative overflow-hidden border-b border-(--border) bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(250,248,244,0.96))] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:border-(--border)">
          <div className={`absolute inset-x-0 top-0 h-20 bg-linear-to-r ${accentMap[book.accent]} opacity-15`} />
          <div className="relative flex h-full min-h-112 flex-col justify-between rounded-4xl border border-(--border) bg-white px-6 py-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:px-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-(--muted)">
                  Featured book
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
                  {book.category}
                </p>
              </div>
              <div className={`rounded-full bg-linear-to-r ${accentMap[book.accent]} px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.14)]`}>
                {book.rating.toFixed(1)}
              </div>
            </div>

            <div className="mt-10 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--muted)">
                  The BookSphere edition
                </p>
                <h3 className="font-display text-4xl font-bold leading-[0.95] tracking-[-0.05em] text-(--text) sm:text-5xl">
                  {book.title}
                </h3>
                <p className="text-sm font-medium text-(--muted)">By {book.author}</p>
              </div>

              <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
                  Promise
                </p>
                <p className="mt-3 text-base leading-7 text-(--text)">{book.outcome}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.25rem] border border-(--border) bg-(--surface-soft) px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Format</p>
                <p className="mt-2 text-sm font-semibold text-(--text)">{book.format}</p>
              </div>
              <div className="rounded-[1.25rem] border border-(--border) bg-(--surface-soft) px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Read time</p>
                <p className="mt-2 text-sm font-semibold text-(--text)">{book.readTime}</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="hidden lg:block bg-(--surface)" aria-hidden="true">
          <div className="mx-auto h-full w-px bg-(--border)" />
        </div>

        <section className="border-t border-(--border) bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(252,250,246,0.98))] p-6 sm:p-8 lg:border-l lg:border-t-0 lg:border-(--border)">
          <div className="grid gap-5 sm:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-[1.75rem] border border-(--border) bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
                Inside the cover
              </p>
              <p className="mt-3 text-base leading-7 text-(--muted)">
                {book.summary}
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-(--surface-soft) p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Audience</p>
                  <p className="mt-2 text-sm leading-6 text-(--text)">{book.audience}</p>
                </div>
                <div className="rounded-2xl bg-(--surface-soft) p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Saved theme</p>
                  <p className="mt-2 text-sm leading-6 text-(--text)">{book.tags[0]}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-(--border) bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
                Reading path
              </p>
              <ol className="mt-4 space-y-4">
                {book.chapters.map((chapter, index) => (
                  <li key={chapter} className="flex items-start gap-4 text-sm leading-6 text-(--text)">
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-(--border) bg-(--surface-soft) text-xs font-semibold text-(--muted)">
                      {index + 1}
                    </span>
                    <span>{chapter}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-[1.25rem] border border-(--border) bg-(--surface-soft) p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Why it matters</p>
              <div className="mt-3 space-y-3">
                {book.insights.map((insight) => (
                  <div key={insight} className="flex items-start gap-3 text-sm leading-6 text-(--text)">
                    <span className="mt-2 h-2 w-2 rounded-full bg-(--text)" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.25rem] border border-(--border) bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Price</p>
              <p className="mt-2 font-display text-2xl text-(--text)">{book.price}</p>
            </div>
            <div className="rounded-[1.25rem] border border-(--border) bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Rating</p>
              <p className="mt-2 font-display text-2xl text-(--text)">{book.rating.toFixed(1)} / 5</p>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-(--border) bg-(--surface-soft) p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
              Book notes
            </p>
            <p className="mt-3 text-sm leading-7 text-(--text)">
              The structure is intentionally book-like: a cover on the left, a spine in the middle,
              and a readable interior on the right. That makes The Focus Protocol feel like a real
              title instead of a generic product block.
            </p>
          </div>
        </section>
      </div>

      {recommendations && recommendations.length > 0 ? (
        <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Recommended next
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {recommendations.map((recommendation) => (
              <div key={recommendation.slug} className="rounded-2xl bg-white p-4">
                <p className="font-semibold text-(--text)">{recommendation.title}</p>
                <p className="mt-1 text-sm text-(--muted)">{recommendation.category}</p>
                <p className="mt-3 text-sm leading-6 text-(--muted)">
                  {recommendation.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
