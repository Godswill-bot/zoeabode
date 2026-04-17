"use client";

import Link from "next/link";
import { useSession } from "@/lib/session";
import { AdminDashboard } from "@/components/admin-dashboard";

export function AdminAccessGate() {
  const session = useSession();

  if (!session || session.role !== "admin") {
    return (
      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Restricted area</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none text-(--text)">Admin login required</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-(--muted)">
          This console is private. Only verified admins can proceed.
        </p>
        <Link href="/admin-login" className="mt-6 inline-flex items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white">
          Go to admin login
        </Link>
      </div>
    );
  }

  return <AdminDashboard />;
}
