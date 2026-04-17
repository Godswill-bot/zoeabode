"use client";

import { useMemo, useSyncExternalStore } from "react";
import type { User } from "@supabase/supabase-js";
import type { Book } from "@/data/books";

export type ThemeMode = "light" | "dark";
export type CollectionKey = "saved" | "cart" | "bought" | "read";

export type UserSettings = {
  emailDigest: boolean;
  chatEnabled: boolean;
  commentsEnabled: boolean;
  discoverable: boolean;
};

export type UserProfile = {
  id: string;
  email: string;
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  theme: ThemeMode;
  joinedAt: string;
  updatedAt: string;
  collections: Record<CollectionKey, string[]>;
  settings: UserSettings;
};

export type CommunityComment = {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  text: string;
  createdAt: string;
};

export type CommunityPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  text: string;
  createdAt: string;
  likes: string[];
  comments: CommunityComment[];
};

export type ChatMessage = {
  id: string;
  authorId: string;
  authorName: string;
  authorUsername: string;
  text: string;
  createdAt: string;
};

type UserSpaceStore = {
  profiles: UserProfile[];
  posts: CommunityPost[];
  messages: ChatMessage[];
};

const STORAGE_KEY = "zoeabode-user-space";
const subscribers = new Set<() => void>();
const EMPTY_STORE: UserSpaceStore = { profiles: [], posts: [], messages: [] };
let cachedRawStore = "";
let cachedStore: UserSpaceStore = EMPTY_STORE;

function createId(seed: string) {
  return `${seed}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

function toTitleCase(value: string) {
  return value
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function createAvatarDataUrl(name: string, username: string) {
  const initials = (name || username || "Z")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
  const palette = ["#141414", "#4f7662", "#3d6f9f", "#a56f22", "#ab546a", "#7561b8"];
  const index = (name.length + username.length) % palette.length;
  const color = palette[index] ?? palette[0];

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160" role="img" aria-label="${name}">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f5f5f5"/>
        </linearGradient>
      </defs>
      <rect width="160" height="160" rx="48" fill="url(#g)"/>
      <circle cx="80" cy="60" r="34" fill="${color}"/>
      <text x="80" y="108" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700" fill="#141414">${initials}</text>
    </svg>`,
  )}`;
}

function createDefaultProfile(user: User): UserProfile {
  const name = String(user.user_metadata?.name ?? user.email?.split("@")[0] ?? "Reader");
  const username = String(
    user.user_metadata?.username ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 16) ?? "reader",
  ) || "reader";

  return {
    id: user.id,
    email: user.email ?? "",
    name,
    username,
    bio: String(user.user_metadata?.bio ?? "Curating a better reading stack."),
    avatarUrl: String(user.user_metadata?.avatarUrl ?? createAvatarDataUrl(name, username)),
    theme: (user.user_metadata?.theme as ThemeMode) ?? "light",
    joinedAt: user.created_at ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    collections: {
      saved: [],
      cart: [],
      bought: [],
      read: [],
    },
    settings: {
      emailDigest: true,
      chatEnabled: true,
      commentsEnabled: true,
      discoverable: true,
    },
  };
}

function readStore() {
  if (typeof window === "undefined") {
    return EMPTY_STORE;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    cachedRawStore = "";
    cachedStore = EMPTY_STORE;
    return EMPTY_STORE;
  }

  if (stored === cachedRawStore) {
    return cachedStore;
  }

  try {
    cachedRawStore = stored;
    cachedStore = JSON.parse(stored) as UserSpaceStore;
    return cachedStore;
  } catch {
    cachedRawStore = "";
    cachedStore = EMPTY_STORE;
    return EMPTY_STORE;
  }
}

function writeStore(store: UserSpaceStore) {
  if (typeof window === "undefined") {
    return;
  }

  const serialized = JSON.stringify(store);
  cachedRawStore = serialized;
  cachedStore = store;
  window.localStorage.setItem(STORAGE_KEY, serialized);
  subscribers.forEach((callback) => callback());
}

function mutateStore(mutator: (store: UserSpaceStore) => UserSpaceStore) {
  writeStore(mutator(readStore()));
}

function ensureProfile(profile: UserProfile) {
  mutateStore((store) => {
    const existingIndex = store.profiles.findIndex((entry) => entry.id === profile.id);
    const nextProfiles = [...store.profiles];

    if (existingIndex >= 0) {
      nextProfiles[existingIndex] = {
        ...nextProfiles[existingIndex],
        ...profile,
        collections: nextProfiles[existingIndex].collections,
        settings: nextProfiles[existingIndex].settings,
      };
    } else {
      nextProfiles.unshift(profile);
    }

    return {
      ...store,
      profiles: nextProfiles,
    };
  });
}

export function ensureProfileFromAuthUser(user: User) {
  const profile = getProfileById(user.id) ?? createDefaultProfile(user);
  ensureProfile(profile);
  return profile;
}

export function getProfiles() {
  return readStore().profiles;
}

export function getProfileById(profileId?: string | null) {
  if (!profileId) {
    return null;
  }

  return getProfiles().find((profile) => profile.id === profileId) ?? null;
}

export function getProfileByUsername(username?: string | null) {
  if (!username) {
    return null;
  }

  const normalized = username.replace(/^@/, "").toLowerCase();
  return (
    getProfiles().find((profile) => profile.username.toLowerCase() === normalized) ?? null
  );
}

export function updateProfile(profileId: string, patch: Partial<UserProfile>) {
  mutateStore((store) => ({
    ...store,
    profiles: store.profiles.map((profile) =>
      profile.id === profileId
        ? {
            ...profile,
            ...patch,
            collections: patch.collections ?? profile.collections,
            settings: patch.settings ?? profile.settings,
            updatedAt: new Date().toISOString(),
          }
        : profile,
    ),
  }));
}

export function updateProfileSettings(profileId: string, patch: Partial<UserSettings>) {
  const profile = getProfileById(profileId);
  if (!profile) {
    return;
  }

  updateProfile(profileId, {
    settings: {
      ...profile.settings,
      ...patch,
    },
  });
}

export function setProfileTheme(profileId: string, theme: ThemeMode) {
  updateProfile(profileId, { theme });
}

export function upsertProfileFromSession(profileId: string, email: string, name: string) {
  const existing = getProfileById(profileId);
  if (existing) {
    updateProfile(profileId, {
      name,
      email,
      updatedAt: new Date().toISOString(),
    });
    return;
  }

  ensureProfile({
    id: profileId,
    email,
    name,
    username: name.toLowerCase().replace(/[^a-z0-9]+/g, "").slice(0, 16) || "reader",
    bio: "Curating a better reading stack.",
    avatarUrl: createAvatarDataUrl(name, name),
    theme: "light",
    joinedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    collections: {
      saved: [],
      cart: [],
      bought: [],
      read: [],
    },
    settings: {
      emailDigest: true,
      chatEnabled: true,
      commentsEnabled: true,
      discoverable: true,
    },
  });
}

export function toggleCollectionItem(profileId: string, collection: CollectionKey, bookId: string) {
  const profile = getProfileById(profileId);
  if (!profile) {
    return;
  }

  const current = profile.collections[collection];
  const exists = current.includes(bookId);
  const nextCollection = exists ? current.filter((item) => item !== bookId) : [bookId, ...current];

  updateProfile(profileId, {
    collections: {
      ...profile.collections,
      [collection]: nextCollection,
    },
  });
}

export function useProfiles() {
  return useSyncExternalStore(
    subscribe,
    () => readStore().profiles,
    () => [],
  );
}

export function useUserProfile(profileId?: string | null) {
  const profiles = useProfiles();
  return useMemo(() => profiles.find((profile) => profile.id === profileId) ?? null, [profiles, profileId]);
}

export function useProfileByUsername(username?: string | null) {
  const profiles = useProfiles();
  return useMemo(
    () =>
      getProfileByUsername(username) ??
      profiles.find((profile) => profile.username.toLowerCase() === String(username ?? "").replace(/^@/, "").toLowerCase()) ??
      null,
    [profiles, username],
  );
}

export function getProfilesCount() {
  return getProfiles().length;
}

export function getProfileByIdOrUsername(identifier?: string | null) {
  return getProfileById(identifier) ?? getProfileByUsername(identifier);
}

export function useCommunityPosts() {
  return useSyncExternalStore(
    subscribe,
    () => readStore().posts,
    () => [],
  );
}

export function createPost(author: UserProfile, text: string) {
  const cleanText = text.trim();
  if (!cleanText) {
    return;
  }

  mutateStore((store) => ({
    ...store,
    posts: [
      {
        id: createId("post"),
        authorId: author.id,
        authorName: author.name,
        authorUsername: author.username,
        text: cleanText,
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
      },
      ...store.posts,
    ],
  }));
}

export function togglePostLike(postId: string, userId: string) {
  mutateStore((store) => ({
    ...store,
    posts: store.posts.map((post) => {
      if (post.id !== postId) {
        return post;
      }

      const liked = post.likes.includes(userId);
      return {
        ...post,
        likes: liked ? post.likes.filter((like) => like !== userId) : [userId, ...post.likes],
      };
    }),
  }));
}

export function addPostComment(postId: string, author: UserProfile, text: string) {
  const cleanText = text.trim();
  if (!cleanText) {
    return;
  }

  mutateStore((store) => ({
    ...store,
    posts: store.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            comments: [
              {
                id: createId("comment"),
                authorId: author.id,
                authorName: author.name,
                authorUsername: author.username,
                text: cleanText,
                createdAt: new Date().toISOString(),
              },
              ...post.comments,
            ],
          }
        : post,
    ),
  }));
}

export function useChatMessages() {
  return useSyncExternalStore(
    subscribe,
    () => readStore().messages,
    () => [],
  );
}

export function sendChatMessage(author: UserProfile, text: string) {
  const cleanText = text.trim();
  if (!cleanText) {
    return;
  }

  mutateStore((store) => ({
    ...store,
    messages: [
      {
        id: createId("message"),
        authorId: author.id,
        authorName: author.name,
        authorUsername: author.username,
        text: cleanText,
        createdAt: new Date().toISOString(),
      },
      ...store.messages.slice(0, 39),
    ],
  }));
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
