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
};

const subscribers = new Set<() => void>();
let cachedAuthSession: Session | null = null;
let authInitialized = false;
let authListenerReady = false;

function authUserToSessionUser(user: User): SessionUser {
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
  };
}

function notifySubscribers() {
  subscribers.forEach((callback) => callback());
}

async function initializeAuth() {
  const client = getSupabaseClient();
  if (!client || authInitialized) {
    return;
  }

  authInitialized = true;

  const { data } = await client.auth.getSession();
  cachedAuthSession = data.session;
  if (cachedAuthSession?.user) {
    ensureProfileFromAuthUser(cachedAuthSession.user);
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
      if (session?.user) {
        ensureProfileFromAuthUser(session.user);
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

  if (cachedAuthSession?.user) {
    return authUserToSessionUser(cachedAuthSession.user);
  }

  return null;
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

  return client.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
        username: payload.username,
      },
      emailRedirectTo: `${window.location.origin}/account?verified=1`,
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

