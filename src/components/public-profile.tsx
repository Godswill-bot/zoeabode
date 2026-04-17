"use client";

import Link from "next/link";
import { books } from "@/data/books";
import { useCommunityPosts, useProfileByUsername, useProfiles } from "@/lib/user-space";

type PublicProfileProps = {
  username: string;
};

export function PublicProfile({ username }: PublicProfileProps) {
  const profile = useProfileByUsername(username);
  const profiles = useProfiles();
  const communityPosts = useCommunityPosts();

  if (!profile) {
    return (
      <section className="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">Profile not found</p>
        <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">This reader profile does not exist yet.</p>
        <Link href="/profiles" className="mt-5 inline-flex rounded-full bg-[color:var(--text)] px-5 py-3 text-sm font-semibold text-white">
          Back to directory
        </Link>
      </section>
    );
  }

  const profileBooks = books.filter((book) =>
    [
      ...profile.collections.saved,
      ...profile.collections.cart,
      ...profile.collections.bought,
      ...profile.collections.read,
    ].includes(book.id),
  );

  return (
    <section className="space-y-6">
      <div className="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-white">
            {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" /> : null}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">Public profile</p>
            <h1 className="mt-2 font-display text-4xl text-[color:var(--text)]">{profile.name}</h1>
            <p className="text-sm text-[color:var(--muted)]">@{profile.username}</p>
          </div>
          <Link href="/profiles" className="rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition hover:border-[color:var(--border-strong)]">
            Back to directory
          </Link>
        </div>

        <p className="mt-5 max-w-3xl text-base leading-7 text-[color:var(--muted)]">{profile.bio}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">Saved</p>
            <p className="mt-2 font-display text-3xl text-[color:var(--text)]">{profile.collections.saved.length}</p>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">Cart</p>
            <p className="mt-2 font-display text-3xl text-[color:var(--text)]">{profile.collections.cart.length}</p>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">Bought</p>
            <p className="mt-2 font-display text-3xl text-[color:var(--text)]">{profile.collections.bought.length}</p>
          </div>
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--muted)]">Read</p>
            <p className="mt-2 font-display text-3xl text-[color:var(--text)]">{profile.collections.read.length}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">Shelves</p>
          <div className="mt-4 grid gap-3">
            {profileBooks.map((book) => (
              <Link key={book.id} href={`/books/${book.slug}`} className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4 transition hover:border-[color:var(--border-strong)]">
                <p className="text-sm font-semibold text-[color:var(--text)]">{book.title}</p>
                <p className="text-sm text-[color:var(--muted)]">{book.author}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">Recent posts</p>
          <div className="mt-4 space-y-3">
            {communityPosts
              .filter((post) => post.authorId === profile.id)
              .map((post) => (
                <article key={post.id} className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4">
                  <p className="text-sm leading-6 text-[color:var(--text)]">{post.text}</p>
                  <p className="mt-2 text-xs text-[color:var(--muted)]">{post.likes.length} likes · {post.comments.length} comments</p>
                </article>
              ))}
          </div>
        </div>
      </div>

      <div className="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">People related to this profile</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {profiles
            .filter((item) => item.id !== profile.id)
            .slice(0, 6)
            .map((item) => (
              <Link key={item.id} href={`/profiles/${item.username}`} className="rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4 transition hover:border-[color:var(--border-strong)]">
                <p className="font-semibold text-[color:var(--text)]">{item.name}</p>
                <p className="text-sm text-[color:var(--muted)]">@{item.username}</p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
