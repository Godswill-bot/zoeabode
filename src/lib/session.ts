"use client";

import { useSyncExternalStore } from "react";

export type SessionUser = {
  name: string;
  email: string;
  joinedAt: string;
};

const STORAGE_KEY = "zoeabode-session";
const USERS_STORAGE_KEY = "zoeabode-users";
const subscribers = new Set<() => void>();
const userSubscribers = new Set<() => void>();
const EMPTY_SESSION = null;
const EMPTY_USERS: SessionUser[] = [];
let cachedRawSession = "";
let cachedSession: SessionUser | null = EMPTY_SESSION;
let cachedRawUsers = "";
let cachedUsers: SessionUser[] = EMPTY_USERS;

function readSession() {
  if (typeof window === "undefined") {
    return EMPTY_SESSION;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    cachedRawSession = "";
    cachedSession = EMPTY_SESSION;
    return EMPTY_SESSION;
  }

  if (stored === cachedRawSession) {
    return cachedSession;
  }

  try {
    cachedRawSession = stored;
    cachedSession = JSON.parse(stored) as SessionUser;
    return cachedSession;
  } catch {
    cachedRawSession = "";
    cachedSession = EMPTY_SESSION;
    return EMPTY_SESSION;
  }
}

function writeSession(session: SessionUser | null) {
  if (session) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    const existingUsers = readUsers();
    const nextUsers = existingUsers.some((user) => user.email.toLowerCase() === session.email.toLowerCase())
      ? existingUsers.map((user) => (user.email.toLowerCase() === session.email.toLowerCase() ? session : user))
      : [session, ...existingUsers];
    window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers));
    cachedRawUsers = JSON.stringify(nextUsers);
    cachedUsers = nextUsers;
    userSubscribers.forEach((callback) => callback());
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  subscribers.forEach((callback) => callback());
}

function subscribe(callback: () => void) {
  subscribers.add(callback);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    subscribers.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function readUsers() {
  if (typeof window === "undefined") {
    return EMPTY_USERS;
  }

  const stored = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) {
    cachedRawUsers = "";
    cachedUsers = EMPTY_USERS;
    return EMPTY_USERS;
  }

  if (stored === cachedRawUsers) {
    return cachedUsers;
  }

  try {
    cachedRawUsers = stored;
    cachedUsers = JSON.parse(stored) as SessionUser[];
    return cachedUsers;
  } catch {
    cachedRawUsers = "";
    cachedUsers = EMPTY_USERS;
    return EMPTY_USERS;
  }
}

function subscribeUsers(callback: () => void) {
  userSubscribers.add(callback);

  const onStorage = (event: StorageEvent) => {
    if (event.key === USERS_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    userSubscribers.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSession() {
  return useSyncExternalStore(subscribe, readSession, () => EMPTY_SESSION);
}

export function signIn(name: string, email: string) {
  writeSession({
    name,
    email,
    joinedAt: new Date().toISOString(),
  });
}

export function signOut() {
  writeSession(null);
}

export function getStoredSession() {
  return readSession();
}

export function useRegisteredUsers() {
  return useSyncExternalStore(subscribeUsers, readUsers, () => EMPTY_USERS);
}

export function getRegisteredUsers() {
  return readUsers();
}
