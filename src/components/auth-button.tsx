"use client";

import Link from "next/link";
import { signOut, useSession } from "@/lib/session";

export function AuthButton() {
  const session = useSession();

  if (!session) {
    return (
      <Link
        href="/signup"
        className="inline-flex items-center justify-center rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)"
      >
        Sign up
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-4 py-2 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)"
      >
        <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-(--text) text-xs font-bold text-white">
          {session.avatarUrl ? (
            <img src={session.avatarUrl} alt={session.name} className="h-full w-full object-cover" />
          ) : (
            session.name.slice(0, 1).toUpperCase()
          )}
        </span>
        <span className="max-w-32 truncate">{session.username}</span>
      </Link>
      <button
        type="button"
        onClick={() => void signOut()}
        className="inline-flex items-center justify-center rounded-full border border-(--border) bg-transparent px-4 py-2 text-sm font-semibold text-(--text) transition duration-300 hover:scale-[1.03] hover:border-(--border-strong)"
      >
        Sign out
      </button>
    </div>
  );
}
