"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { books } from "@/data/books";
import { useSession, updateSupabaseProfile } from "@/lib/session";
import {
  addPostComment,
  createPost,
  getProfileByUsername,
  sendChatMessage,
  setProfileTheme,
  toggleCollectionItem,
  togglePostLike,
  updateProfile,
  useChatMessages,
  useCommunityPosts,
  useProfiles,
  useUserProfile,
} from "@/lib/user-space";

const collectionLabels = {
  saved: "Saved",
  cart: "Cart",
  bought: "Bought",
  read: "Read",
} as const;

export function ProfileWorkspace() {
  const session = useSession();
  const profile = useUserProfile(session?.id);
  const profiles = useProfiles();
  const communityPosts = useCommunityPosts();
  const chatMessages = useChatMessages();
  const [draftName, setDraftName] = useState("");
  const [draftUsername, setDraftUsername] = useState("");
  const [draftBio, setDraftBio] = useState("");
  const [draftAvatar, setDraftAvatar] = useState("");
  const [draftTheme, setDraftTheme] = useState<"light" | "dark">("light");
  const [postBody, setPostBody] = useState("");
  const [chatBody, setChatBody] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});

  const shelfCounts = useMemo(() => {
    if (!profile) {
      return { saved: 0, cart: 0, bought: 0, read: 0 };
    }

    return {
      saved: profile.collections.saved.length,
      cart: profile.collections.cart.length,
      bought: profile.collections.bought.length,
      read: profile.collections.read.length,
    };
  }, [profile]);

  async function handleAvatarUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const avatarUrl = String(reader.result ?? "");
      setDraftAvatar(avatarUrl);
      if (!session?.id) {
        return;
      }

      updateProfile(session.id, { avatarUrl });
      await updateSupabaseProfile(session.id, { avatarUrl });
    };
    reader.readAsDataURL(file);
  }

  async function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.id) {
      return;
    }

    const payload = {
      name: draftName.trim() || session.name,
      username: draftUsername.trim().replace(/^@/, "") || session.username,
      bio: draftBio.trim(),
      avatarUrl: draftAvatar.trim(),
      theme: draftTheme,
    };

    updateProfile(session.id, payload);
    setProfileTheme(session.id, draftTheme);
    await updateSupabaseProfile(session.id, payload);
  }

  function handleCollectionToggle(collection: "saved" | "cart" | "bought" | "read", bookId: string) {
    if (!session?.id) {
      return;
    }

    toggleCollectionItem(session.id, collection, bookId);
  }

  function handlePostSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.id || !postBody.trim()) {
      return;
    }

    createPost(profile!, postBody.trim());
    setPostBody("");
  }

  function handleCommentSubmit(postId: string, event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const draft = commentDrafts[postId]?.trim();
    if (!session?.id || !draft) {
      return;
    }

    addPostComment(postId, profile!, draft);
    setCommentDrafts((current) => ({ ...current, [postId]: "" }));
  }

  function handleChatSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.id || !chatBody.trim()) {
      return;
    }

    sendChatMessage(profile!, chatBody.trim());
    setChatBody("");
  }

  if (!session || !profile) {
    return (
      <section className="rounded-4xl border border-(--border) bg-(--surface) p-6 text-(--muted) shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em]">Profile workspace</p>
        <p className="mt-3 max-w-2xl text-base leading-7">
          Sign in to edit your profile, manage your book shelves, join community posts, and message other readers.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <form onSubmit={handleProfileSave} className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Profile</p>
              <h2 className="mt-2 font-display text-3xl text-(--text)">Edit your identity</h2>
            </div>
            <Link href={`/profiles/${profile.username}`} className="rounded-full border border-(--border) px-4 py-2 text-sm font-semibold text-(--text) transition hover:border-(--border-strong)">
              View public profile
            </Link>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[0.72fr_1.28fr]">
            <div className="space-y-4 rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
              <div className="h-32 w-32 overflow-hidden rounded-3xl border border-(--border) bg-white">
                {draftAvatar ? <img src={draftAvatar} alt={draftName || profile.name} className="h-full w-full object-cover" /> : null}
              </div>
              <label className="block text-sm font-semibold text-(--text)">
                Profile photo
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="mt-2 block w-full text-sm text-(--muted)" />
              </label>
            </div>

            <div className="grid gap-4">
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-(--text)">Name</span>
                <input value={draftName} onChange={(event) => setDraftName(event.target.value)} className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-(--text)">Username</span>
                <input value={draftUsername} onChange={(event) => setDraftUsername(event.target.value)} className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" />
              </label>
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-(--text)">Bio</span>
                <textarea value={draftBio} onChange={(event) => setDraftBio(event.target.value)} rows={5} className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-(--text)">Theme</span>
                  <select value={draftTheme} onChange={(event) => setDraftTheme(event.target.value as "light" | "dark")} className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </label>
                <div className="rounded-3xl border border-(--border) bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Profile status</p>
                  <p className="mt-2 text-sm text-(--text)">{session.verified ? "Email verified" : "Email verification pending"}</p>
                  <p className="text-sm text-(--muted)">@{profile.username}</p>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="mt-6 inline-flex items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Save profile
          </button>
        </form>

        <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Shelf summary</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(Object.keys(collectionLabels) as Array<keyof typeof collectionLabels>).map((collection) => (
              <div key={collection} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--muted)">{collectionLabels[collection]}</p>
                <p className="mt-2 font-display text-3xl text-(--text)">{shelfCounts[collection]}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Quick theme switch</p>
            <div className="flex flex-wrap gap-2">
              {(["light", "dark"] as const).map((theme) => (
                <button key={theme} type="button" onClick={() => setDraftTheme(theme)} className={`tab-chip rounded-full border px-4 py-2 text-sm font-semibold ${draftTheme === theme ? "border-(--text) bg-(--text) text-white" : "border-(--border) bg-white text-(--text)"}`}>
                  {theme === "light" ? "Light mode" : "Dark mode"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Library actions</p>
            <h3 className="mt-2 font-display text-3xl text-(--text)">Manage bought, saved, cart, and read</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-(--muted)">
            Tap a book to move it between your shelves. These actions update the shared profile store immediately.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {books.map((book) => {
            const collectionState = profile.collections;

            return (
              <div key={book.id} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">{book.category}</p>
                    <h4 className="mt-2 font-display text-2xl text-(--text)">{book.title}</h4>
                    <p className="mt-2 text-sm text-(--muted)">{book.author}</p>
                  </div>
                  <Link href={`/books/${book.slug}`} className="rounded-full border border-(--border) px-4 py-2 text-sm font-semibold text-(--text) transition hover:border-(--text)">
                    Open
                  </Link>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  {(Object.keys(collectionLabels) as Array<keyof typeof collectionLabels>).map((collection) => {
                    const active = collectionState[collection].includes(book.id);

                    return (
                      <button key={collection} type="button" onClick={() => handleCollectionToggle(collection, book.id)} className={`rounded-2xl border px-3 py-2 text-sm font-semibold transition ${active ? "border-(--text) bg-(--text) text-white" : "border-(--border) bg-white text-(--text)"}`}>
                        {active ? `In ${collectionLabels[collection]}` : `Add to ${collectionLabels[collection]}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Community</p>
              <h3 className="mt-2 font-display text-3xl text-(--text)">Posts, likes, and comments</h3>
            </div>
          </div>

          <form onSubmit={handlePostSubmit} className="mt-5 space-y-3 rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
            <textarea value={postBody} onChange={(event) => setPostBody(event.target.value)} rows={4} placeholder="Share what you are reading, thinking, or recommending." className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" />
            <button type="submit" className="rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
              Post update
            </button>
          </form>

          <div className="mt-5 space-y-4">
            {communityPosts.map((post) => {
              return (
                <article key={post.id} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-(--text)">{post.authorName}</p>
                      <p className="text-xs text-(--muted)">@{post.authorUsername}</p>
                    </div>
                    <button type="button" onClick={() => togglePostLike(post.id, session.id)} className="rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-semibold text-(--text) transition hover:border-(--text)">
                      Like {post.likes.length}
                    </button>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-(--text)">{post.text}</p>

                  <div className="mt-4 space-y-3">
                    {post.comments.map((comment) => {
                      return (
                        <div key={comment.id} className="rounded-2xl border border-(--border) bg-white p-3 text-sm">
                          <p className="font-semibold text-(--text)">{comment.authorName}</p>
                          <p className="text-(--muted)">{comment.text}</p>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={(event) => handleCommentSubmit(post.id, event)} className="mt-4 flex gap-2">
                    <input value={commentDrafts[post.id] ?? ""} onChange={(event) => setCommentDrafts((current) => ({ ...current, [post.id]: event.target.value }))} placeholder="Write a comment" className="min-w-0 flex-1 rounded-full border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" />
                    <button type="submit" className="rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                      Comment
                    </button>
                  </form>
                </article>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Chat</p>
            <h3 className="mt-2 font-display text-3xl text-(--text)">Live reader conversation</h3>

            <div className="mt-5 space-y-3">
              {chatMessages.map((message) => {
                return (
                  <div key={message.id} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4">
                    <p className="text-sm font-semibold text-(--text)">{message.authorName}</p>
                    <p className="text-xs text-(--muted)">@{message.authorUsername}</p>
                    <p className="mt-2 text-sm leading-6 text-(--text)">{message.text}</p>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleChatSubmit} className="mt-5 flex gap-2">
              <input value={chatBody} onChange={(event) => setChatBody(event.target.value)} placeholder="Send a message to other readers" className="min-w-0 flex-1 rounded-full border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" />
              <button type="submit" className="rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
                Send
              </button>
            </form>
          </div>

          <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Readers</p>
            <div className="mt-4 space-y-3">
              {profiles.map((item) => {
                const discoveredProfile = getProfileByUsername(item.username) ?? item;

                return (
                  <Link key={item.id} href={`/profiles/${discoveredProfile.username}`} className="flex items-center justify-between gap-3 rounded-3xl border border-(--border) bg-(--surface-soft) p-4 transition hover:border-(--border-strong)">
                    <div>
                      <p className="font-semibold text-(--text)">{discoveredProfile.name}</p>
                      <p className="text-sm text-(--muted)">@{discoveredProfile.username}</p>
                    </div>
                    <span className="text-sm font-semibold text-(--text)">Open profile</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
