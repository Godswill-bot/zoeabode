"use client";

import { useMemo, useState } from "react";
import type { Book } from "@/data/books";
import type { CmsSettings } from "@/lib/cms";
import { saveCmsSettings, useCmsSettings } from "@/lib/cms";

type CmsEditorProps = {
  books: Book[];
};

export function CmsEditor({ books }: CmsEditorProps) {
  const settings = useCmsSettings();
  const [draft, setDraft] = useState<CmsSettings>(settings);

  const selectedBook = useMemo(
    () => books.find((book) => book.slug === draft.featuredShelfSlug) ?? books[0],
    [books, draft.featuredShelfSlug],
  );

  function updateField<K extends keyof CmsSettings>(field: K, value: CmsSettings[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleSave() {
    saveCmsSettings(draft);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">CMS-ready editor</p>
        <h2 className="mt-3 font-display text-4xl leading-none text-(--text)">Edit the homepage copy locally.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-(--muted)">
          This page demonstrates a lightweight content-management layer. It stores changes in local
          storage so the product structure is ready for a real CMS later.
        </p>

        <div className="mt-6 grid gap-4">
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Hero label</span>
            <input
              value={draft.heroLabel}
              onChange={(event) => updateField("heroLabel", event.target.value)}
              className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Hero headline</span>
            <textarea
              value={draft.heroHeadline}
              onChange={(event) => updateField("heroHeadline", event.target.value)}
              className="min-h-24 w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Hero description</span>
            <textarea
              value={draft.heroDescription}
              onChange={(event) => updateField("heroDescription", event.target.value)}
              className="min-h-30 w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Primary CTA</span>
              <input
                value={draft.primaryCta}
                onChange={(event) => updateField("primaryCta", event.target.value)}
                className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Secondary CTA</span>
              <input
                value={draft.secondaryCta}
                onChange={(event) => updateField("secondaryCta", event.target.value)}
                className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)"
              />
            </label>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Featured shelf slug</span>
            <select
              value={draft.featuredShelfSlug}
              onChange={(event) => updateField("featuredShelfSlug", event.target.value)}
              className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)"
            >
              {books.map((book) => (
                <option key={book.slug} value={book.slug}>
                  {book.title}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Save CMS draft
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Preview</p>
          <p className="mt-3 font-display text-4xl leading-none text-(--text)">{draft.heroHeadline}</p>
          <p className="mt-4 text-base leading-7 text-(--muted)">{draft.heroDescription}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full border border-(--border) bg-(--surface-soft) px-4 py-2 text-sm font-semibold text-(--text)">
              {draft.primaryCta}
            </span>
            <span className="rounded-full border border-(--border) bg-(--surface-soft) px-4 py-2 text-sm font-semibold text-(--text)">
              {draft.secondaryCta}
            </span>
          </div>
        </div>

        <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Selected shelf</p>
          <h3 className="mt-3 font-display text-3xl text-(--text)">{selectedBook.title}</h3>
          <p className="mt-2 text-sm text-(--muted)">{selectedBook.summary}</p>
        </div>
      </div>
    </div>
  );
}
