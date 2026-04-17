"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSession, signIn, signOut, signUp, resetPassword, signInWithGoogle } from "@/lib/session";

export function AuthPanel() {
  return <AuthPanelContent initialMode="signin" />;
}

type AuthPanelContentProps = {
  initialMode: "signin" | "signup" | "reset";
};

export function AuthPanelContent({ initialMode }: AuthPanelContentProps) {
  const session = useSession();
  const [mode, setMode] = useState<"signin" | "signup" | "reset">(initialMode);
  const [name, setName] = useState(session?.name ?? "");
  const [username, setUsername] = useState(session?.username ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const title = useMemo(() => {
    if (session) {
      return "Your authenticated account";
    }

    return mode === "signup" ? "Create your reader account" : mode === "reset" ? "Reset your password" : "Sign in to your account";
  }, [mode, session]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (mode === "signin") {
      if (!email.trim() || !password.trim()) {
        setError("Enter your email and password.");
        return;
      }

      void signIn(email.trim(), password).then(({ error: authError }) => {
        if (authError) {
          setError(authError.message);
          return;
        }

        setMessage("You are signed in.");
      });
      return;
    }

    if (mode === "signup") {
      if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
        setError("Fill in name, username, email, and password.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      void signUp({
        name: name.trim(),
        username: username.trim().replace(/^@/, ""),
        email: email.trim(),
        password,
      }).then(({ error: authError }) => {
        if (authError) {
          setError(authError.message);
          return;
        }

        setMessage("Check your email to verify the account before signing in.");
        setMode("signin");
        setPassword("");
        setConfirmPassword("");
      });
      return;
    }

    if (!email.trim()) {
      setError("Enter the email address to receive the reset link.");
      return;
    }

    void resetPassword(email.trim()).then(({ error: authError }) => {
      if (authError) {
        setError(authError.message);
        return;
      }

      setMessage("Password reset email sent.");
      setMode("signin");
    });
  }

  function handleGoogleSignIn() {
    void signInWithGoogle().then(({ error: authError }) => {
      if (authError) {
        setError(authError.message);
      }
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center gap-3">
          {(["signin", "signup", "reset"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`tab-chip rounded-full border px-4 py-2 text-sm font-semibold ${
                mode === item
                  ? "border-(--text) bg-(--text) text-white"
                  : "border-(--border) bg-white text-(--text) hover:border-(--border-strong)"
              }`}
            >
              {item === "signin" ? "Sign in" : item === "signup" ? "Sign up" : "Forgot password"}
            </button>
          ))}
        </div>

        <h2 className="mt-5 font-display text-4xl font-semibold leading-none text-(--text)">{title}</h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-(--muted)">
          Sign in with Supabase, create a verified account, or send a password reset link. The profile,
          settings, and community features use the same account identity.
        </p>

        {session ? (
          <div className="mt-6 space-y-4 rounded-3xl border border-(--border) bg-(--surface-soft) p-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-2xl border border-(--border) bg-white">
                {session.avatarUrl ? <img src={session.avatarUrl} alt={session.name} className="h-full w-full object-cover" /> : null}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-(--muted)">Signed in as</p>
                <p className="mt-1 font-semibold text-(--text)">{session.name}</p>
                <p className="text-sm text-(--muted)">@{session.username}</p>
              </div>
            </div>
            <p className="text-sm text-(--muted)">
              {session.verified ? "Email verified" : "Check your inbox for verification if this is a new account."}
            </p>
            <button
              type="button"
              onClick={() => void signOut()}
              className="inline-flex items-center justify-center rounded-full border border-(--border) bg-white px-4 py-2 text-sm font-semibold text-(--text) transition hover:border-(--text)"
            >
              Sign out
            </button>
          </div>
        ) : null}
      </div>

      <div className="rounded-4xl border border-(--border) bg-(--surface) p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-(--muted)">
          {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your profile" : "Reset access"}
        </p>
        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          {mode !== "reset" ? (
            <>
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
                <span className="text-sm font-semibold text-(--text)">Username</span>
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--text)"
                  placeholder="amina.taylor"
                />
              </label>
            </>
          ) : null}

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

          {mode !== "reset" ? (
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--text)"
                placeholder="••••••••"
                type="password"
              />
            </label>
          ) : null}

          {mode === "signup" ? (
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-(--text)">Confirm password</span>
              <input
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="w-full rounded-2xl border border-(--border) bg-white px-4 py-3 text-sm text-(--text) outline-none transition focus:border-(--text)"
                placeholder="••••••••"
                type="password"
              />
            </label>
          ) : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-(--text) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {mode === 'signup' && <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-2 h-4 w-4 shrink-0" focusable="false"><path fill="#4285F4" d="M21.35 10.1H12v3.9h5.35c-.23 1.24-.93 2.29-1.99 3l3.22 2.5c1.88-1.73 2.97-4.27 2.97-7.28 0-.72-.06-1.28-.2-2.12Z" /><path fill="#34A853" d="M12 22c2.7 0 4.96-.89 6.61-2.4l-3.22-2.5c-.89.6-2.03.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H2.06v2.59A10 10 0 0 0 12 22Z" /><path fill="#FBBC05" d="M6.39 13.93A5.99 5.99 0 0 1 6.07 12c0-.67.11-1.32.32-1.93V7.48H2.06A10 10 0 0 0 2 12c0 1.61.38 3.13 1.06 4.48l3.33-2.55Z" /><path fill="#EA4335" d="M12 5.85c1.48 0 2.8.51 3.85 1.5l2.89-2.89A9.73 9.73 0 0 0 12 2C8.35 2 5.17 4.1 3.39 7.48l3.33 2.58C7.18 7.61 9.39 5.85 12 5.85Z" /></svg>}
            {mode === 'signin' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
          </button>

          {mode !== "reset" ? (
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="inline-flex w-full items-center justify-center rounded-full border border-(--border) bg-white px-5 py-3 text-sm font-semibold text-(--text) transition hover:border-(--text)"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="mr-2 h-4 w-4 shrink-0" focusable="false">
                <path fill="#4285F4" d="M21.35 10.1H12v3.9h5.35c-.23 1.24-.93 2.29-1.99 3l3.22 2.5c1.88-1.73 2.97-4.27 2.97-7.28 0-.72-.06-1.28-.2-2.12Z" />
                <path fill="#34A853" d="M12 22c2.7 0 4.96-.89 6.61-2.4l-3.22-2.5c-.89.6-2.03.96-3.39.96-2.61 0-4.82-1.76-5.61-4.13H2.06v2.59A10 10 0 0 0 12 22Z" />
                <path fill="#FBBC05" d="M6.39 13.93A5.99 5.99 0 0 1 6.07 12c0-.67.11-1.32.32-1.93V7.48H2.06A10 10 0 0 0 2 12c0 1.61.38 3.13 1.06 4.48l3.33-2.55Z" />
                <path fill="#EA4335" d="M12 5.85c1.48 0 2.8.51 3.85 1.5l2.89-2.89A9.73 9.73 0 0 0 12 2C8.35 2 5.17 4.1 3.39 7.48l3.33 2.58C7.18 7.61 9.39 5.85 12 5.85Z" />
              </svg>
              Continue with Google
            </button>
          ) : null}

          <div className="space-y-2 rounded-3xl border border-(--border) bg-(--surface-soft) p-4 text-sm">
            {message ? <p className="font-semibold text-(--text)">{message}</p> : null}
            {error ? <p className="font-semibold text-red-600">{error}</p> : null}
            <p className="text-(--muted)">
              {mode === "signup"
                ? "Sign-up sends an email verification link through Supabase."
                : mode === "reset"
                  ? "Use the email field above to send a password reset link."
                  : "Sign in uses your verified Supabase account and keeps your profile synced."}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

