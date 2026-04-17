import Link from "next/link";
import type { GuidePath } from "@/data/guides";

type GuideGridProps = {
  guides: GuidePath[];
};

export function GuideGrid({ guides }: GuideGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {guides.map((guide) => (
        <article
          key={guide.slug}
          className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">
            <span>{guide.duration}</span>
            <span className="h-1 w-1 rounded-full bg-(--muted-soft)" />
            <span>{guide.audience}</span>
          </div>
          <h3 className="mt-4 font-display text-3xl text-(--text)">{guide.title}</h3>
          <p className="mt-4 text-base leading-7 text-(--muted)">{guide.summary}</p>
          <div className="mt-5 rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Outcome</p>
            <p className="mt-2 text-sm leading-6 text-(--text)">{guide.outcome}</p>
          </div>
          <ul className="mt-5 space-y-3">
            {guide.steps.map((step) => (
              <li key={step} className="flex items-start gap-3 text-sm leading-6 text-(--text)">
                <span className="mt-2 h-2 w-2 rounded-full bg-(--text)" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/books/${guide.slug === "focus-and-deep-work" ? "focus-protocol" : guide.slug === "reading-consistency" ? "reading-loop" : guide.slug === "knowledge-compounding" ? "notes-that-compound" : "quiet-wealth"}`}
            className="mt-6 inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-semibold text-(--text) transition hover:border-(--text)"
          >
            Explore related book
          </Link>
        </article>
      ))}
    </div>
  );
}
