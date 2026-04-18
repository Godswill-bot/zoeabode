"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "@/lib/session";

export function AdminLoginPanel() {
  const router = useRouter();
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const heading = useMemo(() => {
    return session?.role === "admin" ? "Admin access granted" : "Admin login";
  }, [session?.role]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const result = await signIn(email.trim(), password);
    if (!("data" in result)) {
      setError(result.error.message);
      return;
    }

    const role = String(result.data.session?.user.app_metadata?.role ?? "user");
    if (role !== "admin") {
      await signOut();
      setError("This account is not allowed to access the admin console.");
      return;
    }

    setMessage("Admin access verified. Redirecting to the console...");
    router.push("/admin-console");
  }

  if (session?.role === "admin") {
    return (
      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">{heading}</p>
        <p className="mt-3 text-base leading-7 text-(--muted)">You are already signed in as an admin.</p>
        <button
          type="button"
          onClick={() => router.push("/admin-console")}
          className="mt-5 inline-flex items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white"
        >
          Open admin console
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">Secure admin access</p>
        <h2 className="mt-4 font-display text-4xl font-semibold leading-none text-(--text)">{heading}</h2>
        <p className="mt-4 text-base leading-7 text-(--muted)">
          Admin access is separate from reader sign-up. Only existing admins or accounts created in Supabase with admin role can enter here.
        </p>
      </div>

      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Admin email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" type="email" placeholder="admin@zoesbooksphere.com" />
          </label>
          <label className="block space-y-2">
            <span className="text-sm font-semibold text-(--text)">Password</span>
            <input value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--text)" type="password" placeholder="Password" />
          </label>
          <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Sign in as admin
          </button>
          {message ? <p className="text-sm font-semibold text-(--text)">{message}</p> : null}
          {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}
        </form>
      </div>
    </div>
  );
}


