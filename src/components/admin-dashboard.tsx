"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { BookAccent } from "@/data/books";
import { books as baseBooks } from "@/data/books";
import { useBookmarks } from "@/lib/bookmarks";
import { addUploadedBook, clearUploadedBooks, useUploadedBooks } from "@/lib/admin";
import { getProfiles, useProfiles } from "@/lib/user-space";

const accentOptions: { label: string; value: BookAccent }[] = [
  { label: "Ember", value: "ember" },
  { label: "Sage", value: "sage" },
  { label: "Ocean", value: "ocean" },
  { label: "Violet", value: "violet" },
  { label: "Gold", value: "gold" },
  { label: "Rose", value: "rose" },
];

const defaultDraft = {
  title: "New reading system",
  author: "ZoeAbode Editorial",
  category: "Knowledge Work",
  format: "Premium ebook",
  summary: "A focused summary that turns a book into an actionable reading system.",
  outcome: "Help readers move from reading to implementation.",
  price: "$19",
  readTime: "3 hours",
  audience: "Readers and creators",
  tags: "reading, habits, systems",
  accent: "ember" as BookAccent,
  featured: false,
};

export function AdminDashboard() {
  const uploadedBooks = useUploadedBooks();
  const profiles = useProfiles();
  const bookmarkIds = useBookmarks();
  const [draft, setDraft] = useState(defaultDraft);

  const totalCatalog = baseBooks.length + uploadedBooks.length;
  const totalSaved = bookmarkIds.length;
  const latestUsers = getProfiles().slice(0, 5);

  function updateField<K extends keyof typeof defaultDraft>(field: K, value: (typeof defaultDraft)[K]) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.summary.trim()) {
      return;
    }

    addUploadedBook(draft);
    setDraft(defaultDraft);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6 rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Admin overview</p>
          <h2 className="mt-3 font-display text-4xl leading-none text-(--text)">
            Upload books, review users, and manage the site.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-(--muted)">
            CMS means Content Management System. In practice, this admin area is where content,
            books, and user activity are organized before a real backend is connected.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Total books</p>
            <p className="mt-2 font-display text-3xl text-(--text)">{totalCatalog}</p>
          </div>
          <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Uploaded books</p>
            <p className="mt-2 font-display text-3xl text-(--text)">{uploadedBooks.length}</p>
          </div>
          <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Signed up users</p>
            <p className="mt-2 font-display text-3xl text-(--text)">{profiles.length}</p>
          </div>
          <div className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Saved books</p>
            <p className="mt-2 font-display text-3xl text-(--text)">{totalSaved}</p>
          </div>
        </div>

        <form className="space-y-4 rounded-4xl border border-(--border) bg-(--surface-soft) p-5" onSubmit={handleSubmit}>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Upload a book</p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Title</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.title} onChange={(event) => updateField("title", event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Author</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.author} onChange={(event) => updateField("author", event.target.value)} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Category</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.category} onChange={(event) => updateField("category", event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Format</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.format} onChange={(event) => updateField("format", event.target.value)} />
            </label>
          </div>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Summary</span>
            <textarea className="min-h-28 w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.summary} onChange={(event) => updateField("summary", event.target.value)} />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Outcome</span>
            <textarea className="min-h-24 w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.outcome} onChange={(event) => updateField("outcome", event.target.value)} />
          </label>
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Price</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.price} onChange={(event) => updateField("price", event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Read time</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.readTime} onChange={(event) => updateField("readTime", event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Audience</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.audience} onChange={(event) => updateField("audience", event.target.value)} />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Tags</span>
              <input className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.tags} onChange={(event) => updateField("tags", event.target.value)} />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Accent</span>
              <select className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" value={draft.accent} onChange={(event) => updateField("accent", event.target.value as BookAccent)}>
                {accentOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="flex items-center gap-3 text-sm font-semibold text-(--text)">
            <input type="checkbox" checked={draft.featured} onChange={(event) => updateField("featured", event.target.checked)} className="h-4 w-4 rounded border-(--border)" />
            Feature this book on the homepage
          </label>
          <button type="submit" className="inline-flex items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03]">
            Upload book
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Quick actions</p>
          <div className="mt-4 grid gap-3">
            <Link href="/cms" className="rounded-3xl border border-(--border) bg-white px-4 py-3 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.02]">Open CMS editor</Link>
            <Link href="/library" className="rounded-3xl border border-(--border) bg-white px-4 py-3 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.02]">Review library</Link>
            <Link href="/guides" className="rounded-3xl border border-(--border) bg-white px-4 py-3 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.02]">Edit reading guides</Link>
            <Link href="/account" className="rounded-3xl border border-(--border) bg-white px-4 py-3 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.02]">Check account flow</Link>
          </div>
        </div>

        <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Recent signups</p>
          <div className="mt-4 space-y-3">
            {latestUsers.length > 0 ? latestUsers.map((user) => (
              <div key={user.email} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                <p className="font-semibold text-(--text)">{user.name}</p>
                <p className="text-sm text-(--muted)">{user.email}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-(--muted)">{new Date(user.joinedAt).toLocaleDateString()}</p>
              </div>
            )) : <p className="text-sm text-(--muted)">No signups yet.</p>}
          </div>
        </div>

        <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Uploaded books</p>
          <div className="mt-4 space-y-3">
            {uploadedBooks.length > 0 ? uploadedBooks.map((book) => (
              <div key={book.id} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                <p className="font-semibold text-(--text)">{book.title}</p>
                <p className="text-sm text-(--muted)">{book.category} · {book.author}</p>
              </div>
            )) : <p className="text-sm text-(--muted)">No uploaded books yet.</p>}
          </div>
          <button type="button" onClick={() => clearUploadedBooks()} className="mt-5 inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.03]">
            Clear uploaded books
          </button>
        </div>
      </div>
    </div>
  );
}
