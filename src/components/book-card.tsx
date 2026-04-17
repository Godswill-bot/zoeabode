import Link from "next/link";
import type { Book } from "@/data/books";

const accentMap: Record<Book["accent"], string> = {
  ember: "from-[#f2b36f] via-[#ef8d5f] to-[#cf5e4f]",
  sage: "from-[#d6e8c5] via-[#94b89f] to-[#4f7662]",
  ocean: "from-[#d6ecf7] via-[#7daed1] to-[#3d6f9f]",
  violet: "from-[#eadcf8] via-[#b89bdd] to-[#7561b8]",
  gold: "from-[#f8e1b5] via-[#d7a85d] to-[#a56f22]",
  rose: "from-[#f4d6da] via-[#d993a0] to-[#ab546a]",
};

type BookCardProps = {
  book: Book;
  compact?: boolean;
  selected?: boolean;
  bookmarked?: boolean;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  showBookmarkButton?: boolean;
  onToggleBookmark?: () => void;
  revealDelay?: string;
};

export function BookCard({
  book,
  compact = false,
  selected = false,
  bookmarked = false,
  actionLabel = "Preview",
  actionHref,
  onAction,
  showBookmarkButton = false,
  onToggleBookmark,
  revealDelay,
}: BookCardProps) {
  const frame = selected
    ? "border-(--border-strong) bg-(--surface-strong) shadow-[0_24px_70px_rgba(15,23,42,0.08)]"
    : "border-(--border) bg-(--surface) hover:border-(--border-strong)";

  const actionButton = actionHref ? (
    <Link
      href={actionHref}
      className="inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-5 py-2.5 text-base font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--text)"
    >
      {actionLabel}
    </Link>
  ) : (
    <button
      type="button"
      onClick={onAction}
      className="inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-5 py-2.5 text-base font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--text)"
    >
      {actionLabel}
    </button>
  );

  return (
    <article
      data-reveal
      data-reveal-delay={revealDelay}
      className={`group self-start overflow-hidden rounded-[32px] border p-5 md:p-6 transition duration-300 hover:scale-[1.03] ${frame}`}
    >
      <div className={`h-2 rounded-full bg-linear-to-r transition duration-300 group-hover:scale-x-[1.01] ${accentMap[book.accent]}`} />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
            <span>{book.category}</span>
            <span className="h-1 w-1 rounded-full bg-(--muted-soft)" />
            <span>{book.format}</span>
          </div>
          <h3 className="font-display text-3xl font-semibold leading-tight text-(--text)">
            {book.title}
          </h3>
          <p className="text-base font-medium text-(--muted)">By {book.author}</p>
        </div>
        <div className="rounded-full border border-(--border) bg-white px-3 py-1 text-sm font-semibold text-(--text)">
          {book.rating.toFixed(1)}
        </div>
      </div>

      <p className={`mt-5 text-base leading-7 text-(--muted) ${compact ? "line-clamp-3" : "line-clamp-4"}`}>
        {book.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {book.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-(--border) bg-(--surface-soft) px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-(--muted)">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-left text-xs font-medium text-(--muted)">
        <div className="rounded-2xl bg-(--surface-soft) px-4 py-4">
          <div className="font-semibold text-(--text)">{book.price}</div>
          <div>Editorial price</div>
        </div>
        <div className="rounded-2xl bg-(--surface-soft) px-4 py-4">
          <div className="font-semibold text-(--text)">{book.readTime}</div>
          <div>Read time</div>
        </div>
        <div className="rounded-2xl bg-(--surface-soft) px-4 py-4">
          <div className="font-semibold text-(--text)">{book.audience}</div>
          <div>Best for</div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {actionButton}
        {showBookmarkButton ? (
          <button
            type="button"
            onClick={onToggleBookmark}
            className={`inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-base font-semibold transition duration-300 hover:scale-[1.03] ${
              bookmarked
                ? "border-(--text) bg-(--text) text-white"
                : "border-(--border) bg-transparent text-(--text) hover:border-(--text)"
            }`}
          >
            {bookmarked ? "Saved" : "Save book"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
