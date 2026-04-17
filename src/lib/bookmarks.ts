"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "zoeabode-bookmarks";
const subscribers = new Set<() => void>();
const EMPTY_BOOKMARKS: string[] = [];
let cachedRawBookmarks = "";
let cachedBookmarks: string[] = EMPTY_BOOKMARKS;

function readBookmarkIds() {
  if (typeof window === "undefined") {
    return EMPTY_BOOKMARKS;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    cachedRawBookmarks = "";
    cachedBookmarks = EMPTY_BOOKMARKS;
    return EMPTY_BOOKMARKS;
  }

  if (stored === cachedRawBookmarks) {
    return cachedBookmarks;
  }

  try {
    const parsed = JSON.parse(stored) as string[];
    cachedRawBookmarks = stored;
    cachedBookmarks = Array.isArray(parsed) ? parsed : EMPTY_BOOKMARKS;
    return cachedBookmarks;
  } catch {
    cachedRawBookmarks = "";
    cachedBookmarks = EMPTY_BOOKMARKS;
    return EMPTY_BOOKMARKS;
  }
}

function writeBookmarkIds(bookmarkIds: string[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarkIds));
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

export function useBookmarks() {
  return useSyncExternalStore(subscribe, readBookmarkIds, () => EMPTY_BOOKMARKS);
}

export function toggleBookmarkId(bookId: string) {
  const current = readBookmarkIds();
  const nextBookmarks = current.includes(bookId)
    ? current.filter((savedId) => savedId !== bookId)
    : [...current, bookId];

  writeBookmarkIds(nextBookmarks);
}

export function getBookmarkIds() {
  return readBookmarkIds();
}
