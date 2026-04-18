"use client";

import { useSyncExternalStore } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase";
import { ensureProfileFromAuthUser, getProfileById, getProfiles, upsertProfileFromSession, useProfiles } from "@/lib/user-space";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatarUrl: string;
  bio: string;
  theme: "light" | "dark";
  joinedAt: string;
  verified: boolean;
  role: "user" | "admin";
  accessToken: string;
};

const subscribers = new Set<() => void>();
let cachedAuthSession: Session | null = null;
let cachedSessionUser: SessionUser | null = null;
let authInitialized = false;
let authListenerReady = false;

function authUserToSessionUser(user: User, accessToken: string): SessionUser {
  const profile = getProfileById(user.id) ?? ensureProfileFromAuthUser(user);
  return {
    id: user.id,
    name: profile.name,
    email: user.email ?? profile.email,
    username: profile.username,
    avatarUrl: profile.avatarUrl,
    bio: profile.bio,
    theme: profile.theme,
    joinedAt: profile.joinedAt,
    verified: Boolean(user.email_confirmed_at),
    role: (user.app_metadata?.role as "user" | "admin" | undefined) ?? "user",
    accessToken,
  };
}

function setCachedSessionUser(session: Session | null) {
  cachedSessionUser = session?.user ? authUserToSessionUser(session.user, session.access_token) : null;
}

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

async function syncUserRegistration(payload: {
  userId: string;
  email: string;
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  theme?: "light" | "dark";
  role?: "user" | "admin";
}) {
  try {
    await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    // Registration sync is best-effort; auth still works even if the route is unavailable.
  }
}

async function initializeAuth() {
  const client = getSupabaseClient();
  if (!client || authInitialized) {
    return;
  }

  authInitialized = true;

  const { data } = await client.auth.getSession();
  cachedAuthSession = data.session;
  setCachedSessionUser(cachedAuthSession);
  if (cachedAuthSession?.user) {
    ensureProfileFromAuthUser(cachedAuthSession.user);
    void syncUserRegistration({
      userId: cachedAuthSession.user.id,
      email: cachedAuthSession.user.email ?? "",
      name: String(cachedAuthSession.user.user_metadata?.name ?? cachedAuthSession.user.email ?? "Reader"),
      username: String(cachedAuthSession.user.user_metadata?.username ?? cachedAuthSession.user.email ?? "reader"),
      avatarUrl: String(cachedAuthSession.user.user_metadata?.avatarUrl ?? ""),
      bio: String(cachedAuthSession.user.user_metadata?.bio ?? "Curating a better reading stack."),
      theme: (cachedAuthSession.user.user_metadata?.theme as "light" | "dark" | undefined) ?? "light",
      role: (cachedAuthSession.user.app_metadata?.role as "user" | "admin" | undefined) ?? "user",
    });
    upsertProfileFromSession(
      cachedAuthSession.user.id,
      cachedAuthSession.user.email ?? "",
      String(cachedAuthSession.user.user_metadata?.name ?? cachedAuthSession.user.email ?? "Reader"),
    );
  }
  notifySubscribers();

  if (!authListenerReady) {
    authListenerReady = true;
    client.auth.onAuthStateChange((_event, session) => {
      cachedAuthSession = session;
      setCachedSessionUser(session);
      if (session?.user) {
        ensureProfileFromAuthUser(session.user);
        void syncUserRegistration({
          userId: session.user.id,
          email: session.user.email ?? "",
          name: String(session.user.user_metadata?.name ?? session.user.email ?? "Reader"),
          username: String(session.user.user_metadata?.username ?? session.user.email ?? "reader"),
          avatarUrl: String(session.user.user_metadata?.avatarUrl ?? ""),
          bio: String(session.user.user_metadata?.bio ?? "Curating a better reading stack."),
          theme: (session.user.user_metadata?.theme as "light" | "dark" | undefined) ?? "light",
          role: (session.user.app_metadata?.role as "user" | "admin" | undefined) ?? "user",
        });
        upsertProfileFromSession(
          session.user.id,
          session.user.email ?? "",
          String(session.user.user_metadata?.name ?? session.user.email ?? "Reader"),
        );
      }
      notifySubscribers();
    });
  }
}

function readSession() {
  if (typeof window === "undefined") {
    return null;
  }

  return cachedSessionUser;
}

function subscribe(callback: () => void) {
  subscribers.add(callback);

  void initializeAuth();

  return () => {
    subscribers.delete(callback);
  };
}

export function useSession() {
  return useSyncExternalStore(subscribe, readSession, () => null);
}

export async function signIn(email: string, password: string) {
  const client = getSupabaseClient();
  if (!client) {
    return { error: new Error("Supabase is not configured.") };
  }

  return client.auth.signInWithPassword({ email, password });
}

export async function signUp(payload: {
  name: string;
  username: string;
  email: string;
  password: string;
}) {
  const client = getSupabaseClient();
  if (!client) {
    return { error: new Error("Supabase is not configured.") };
  }

  const result = await client.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
        username: payload.username,
        role: "user",
      },
      emailRedirectTo: `${window.location.origin}/account?verified=1`,
    },
  });

  const userId = result.data.user?.id;
  if (userId) {
    await fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email: payload.email,
        name: payload.name,
        username: payload.username,
      }),
    });
  }

  return result;
}

export async function signInWithGoogle() {
  const client = getSupabaseClient();
  if (!client) {
    return { error: new Error("Supabase is not configured.") };
  }

  return client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/account`,
    },
  });
}

export async function resetPassword(email: string) {
  const client = getSupabaseClient();
  if (!client) {
    return { error: new Error("Supabase is not configured.") };
  }

  return client.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/account?reset=1`,
  });
}

export async function signOut() {
  const client = getSupabaseClient();
  if (!client) {
    return { error: new Error("Supabase is not configured.") };
  }

  return client.auth.signOut();
}

export async function updateSupabaseProfile(_profileId: string, data: {
  name?: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  theme?: "light" | "dark";
}) {
  const client = getSupabaseClient();
  if (!client) {
    return { error: new Error("Supabase is not configured.") };
  }

  return client.auth.updateUser({
    data: {
      name: data.name,
      username: data.username,
      avatarUrl: data.avatarUrl,
      bio: data.bio,
      theme: data.theme,
    },
  });
}

export function getStoredSession() {
  return readSession();
}

export function useRegisteredUsers() {
  return useProfiles();
}

export function getRegisteredUsers() {
  return getProfiles().map((profile) => ({
    id: profile.id,
    name: profile.name,
    email: profile.email,
    joinedAt: profile.joinedAt,
    username: profile.username,
    avatarUrl: profile.avatarUrl,
  }));
}

