"use client";

import Link from "next/link";
import { useProfiles } from "@/lib/user-space";

export function ProfileDirectory() {
  const profiles = useProfiles();

  return (
    <section className="rounded-4xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--muted)]">Reader directory</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile) => (
          <Link key={profile.id} href={`/profiles/${profile.username}`} className="rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface-soft)] p-4 transition hover:border-[color:var(--border-strong)]">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-[color:var(--border)] bg-white">
                {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" /> : null}
              </div>
              <div>
                <p className="font-semibold text-[color:var(--text)]">{profile.name}</p>
                <p className="text-sm text-[color:var(--muted)]">@{profile.username}</p>
              </div>
            </div>
            <p className="mt-4 max-h-20 overflow-hidden text-sm leading-6 text-[color:var(--muted)]">{profile.bio}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
