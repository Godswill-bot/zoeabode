"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/session";

export function AuthButton() {
  const session = useSession();

  if (!session) {
    return (
      <Link
        href="/account"
        className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition duration-300 hover:scale-[1.03] hover:border-[color:var(--border-strong)]"
      >
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition duration-300 hover:scale-[1.03] hover:border-[color:var(--border-strong)]"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[color:var(--text)] text-xs font-bold text-white">
          {session.name.slice(0, 1).toUpperCase()}
        </span>
        {session.name}
      </Link>
      <button
        type="button"
        onClick={() => signOut()}
        className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-transparent px-4 py-2 text-sm font-semibold text-[color:var(--text)] transition duration-300 hover:scale-[1.03] hover:border-[color:var(--border-strong)]"
      >
        Sign out
      </button>
    </div>
  );
}
