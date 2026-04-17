"use client";

import Link from "next/link";
import { useProfiles } from "@/lib/user-space";

export function ProfileDirectory() {
  const profiles = useProfiles();

  return (
    <section className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Reader directory</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile) => (
          <Link key={profile.id} href={`/profiles/${profile.username}`} className="rounded-3xl border border-(--border) bg-(--surface-soft) p-4 transition hover:border-(--border-strong)">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-(--border) bg-white">
                {profile.avatarUrl ? <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" /> : null}
              </div>
              <div>
                <p className="font-semibold text-(--text)">{profile.name}</p>
                <p className="text-sm text-(--muted)">@{profile.username}</p>
              </div>
            </div>
            <p className="mt-4 max-h-20 overflow-hidden text-sm leading-6 text-(--muted)">{profile.bio}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
