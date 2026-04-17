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
    <div className="space-y-6 rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_28px_80px_rgba(15,23,42,0.12)]">
      <div className={`h-2 rounded-full bg-linear-to-r ${accentMap[book.accent]}`} />

      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
        <span>{book.category}</span>
        <span className="h-1 w-1 rounded-full bg-(--muted-soft)" />
        <span>{book.format}</span>
        <span className="h-1 w-1 rounded-full bg-(--muted-soft)" />
        <span>{book.readTime}</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-display text-3xl font-semibold leading-none text-(--text) sm:text-4xl">
            {book.title}
          </h3>
          <p className="text-sm font-medium text-(--muted)">By {book.author}</p>
        </div>
        <p className="max-w-2xl text-base leading-7 text-(--muted)">
          {book.summary}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-(--surface-soft) p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Outcome
          </p>
          <p className="mt-2 text-sm leading-6 text-(--text)">{book.outcome}</p>
        </div>
        <div className="rounded-2xl bg-(--surface-soft) p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Audience
          </p>
          <p className="mt-2 text-sm leading-6 text-(--text)">{book.audience}</p>
        </div>
        <div className="rounded-2xl bg-(--surface-soft) p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Rating
          </p>
          <p className="mt-2 text-sm leading-6 text-(--text)">{book.rating.toFixed(1)} / 5</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Why it matters
          </p>
          <div className="mt-4 space-y-3">
            {book.insights.map((insight) => (
              <div key={insight} className="flex items-start gap-3 text-sm leading-6 text-(--text)">
                <span className="mt-2 h-2 w-2 rounded-full bg-(--text)" />
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>

          <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Reading path
          </p>
          <ul className="mt-4 space-y-3">
            {book.chapters.map((chapter, index) => (
              <li key={chapter} className="flex items-start gap-3 text-sm leading-6 text-(--text)">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-(--border) bg-white text-xs font-semibold text-(--muted)">
                  {index + 1}
                </span>
                <span>{chapter}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Price</p>
          <p className="mt-2 font-display text-2xl text-(--text)">{book.price}</p>
        </div>
        <div className="rounded-2xl border border-(--border) bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Read time
          </p>
          <p className="mt-2 font-display text-2xl text-(--text)">{book.readTime}</p>
        </div>
        <div className="rounded-2xl border border-(--border) bg-white px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">
            Saved theme
          </p>
          <p className="mt-2 font-display text-2xl text-(--text)">{book.tags[0]}</p>
        </div>
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
