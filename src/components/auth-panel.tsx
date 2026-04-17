"use client";

import { useMemo, useState, type FormEvent } from "react";
import { books } from "@/data/books";
import { useBookmarks } from "@/lib/bookmarks";
import { useSession, signIn, signOut } from "@/lib/session";

export function AuthPanel() {
  const session = useSession();
  const bookmarkIds = useBookmarks();
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const savedBooks = books.filter((book) => bookmarkIds.includes(book.id));

  const title = useMemo(() => (session ? "Your reading account" : "Sign in to sync your stack"), [session]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      return;
    }

    signIn(name.trim(), email.trim());
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Authentication</p>
        <h2 className="mt-3 font-display text-4xl leading-none text-(--text)">{title}</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-(--muted)">
          This is a mock authentication flow that stores a reader profile locally so you can test
          account behavior without wiring a backend yet.
        </p>

        {session ? (
          <div className="mt-6 space-y-4 rounded-[28px] border border-(--border) bg-(--surface-soft) p-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Signed in as</p>
              <p className="mt-2 font-semibold text-(--text)">{session.name}</p>
              <p className="text-sm text-(--muted)">{session.email}</p>
            </div>
            <button
              type="button"
              onClick={() => signOut()}
              className="inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-semibold text-(--text) transition hover:border-(--text)"
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>

      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Reader profile</p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--text)"
              placeholder="Amina Taylor"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Email</span>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--text)"
              placeholder="amina@zoeabode.com"
              type="email"
            />
          </label>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {session ? "Update profile" : "Create account"}
          </button>
        </form>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Saved books</p>
            <p className="mt-2 font-display text-2xl text-(--text)">{savedBooks.length}</p>
          </div>
          <div className="rounded-2xl bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Reading streak</p>
            <p className="mt-2 font-display text-2xl text-(--text)">{session ? "12d" : "0d"}</p>
          </div>
          <div className="rounded-2xl bg-(--surface-soft) p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">Focus area</p>
            <p className="mt-2 font-display text-xl text-(--text)">{savedBooks[0]?.category ?? "Discovery"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
