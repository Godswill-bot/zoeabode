"use client";

import { useSyncExternalStore } from "react";
import type { Book, BookAccent } from "@/data/books";

export type AdminBookDraft = {
  title: string;
  author: string;
  category: string;
  format: string;
  summary: string;
  outcome: string;
  price: string;
  readTime: string;
  audience: string;
  tags: string;
  accent: BookAccent;
  featured: boolean;
};

export type UploadedBook = Book & {
  uploadedAt: string;
};

const STORAGE_KEY = "zoes-booksphere-uploaded-books";
const subscribers = new Set<() => void>();
const EMPTY_BOOKS: UploadedBook[] = [];
let cachedRawBooks = "";
let cachedBooks: UploadedBook[] = EMPTY_BOOKS;

function createSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createBookFromDraft(draft: AdminBookDraft): UploadedBook {
  const slug = createSlug(draft.title) || `book-${Date.now().toString(36)}`;
  const tags = draft.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    id: `admin-${slug}-${Date.now().toString(36)}`,
    slug,
    title: draft.title.trim(),
    author: draft.author.trim(),
    category: draft.category.trim(),
    format: draft.format.trim(),
    summary: draft.summary.trim(),
    outcome: draft.outcome.trim(),
    price: draft.price.trim(),
    rating: 4.7,
    readTime: draft.readTime.trim(),
    audience: draft.audience.trim(),
    featured: draft.featured,
    tags: tags.length > 0 ? tags : [draft.category.trim().toLowerCase()],
    accent: draft.accent,
    chapters: [
      `Introduction to ${draft.title.trim()}`,
      `Using ${draft.title.trim()} in practice`,
      `Your next reading step`,
    ],
    insights: [draft.outcome.trim(), draft.summary.trim(), `Best for ${draft.audience.trim()}`],
    uploadedAt: new Date().toISOString(),
  };
}

function readBooks() {
  if (typeof window === "undefined") {
    return EMPTY_BOOKS;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    cachedRawBooks = "";
    cachedBooks = EMPTY_BOOKS;
    return EMPTY_BOOKS;
  }

  if (stored === cachedRawBooks) {
    return cachedBooks;
  }

  try {
    cachedRawBooks = stored;
    cachedBooks = JSON.parse(stored) as UploadedBook[];
    return cachedBooks;
  } catch {
    cachedRawBooks = "";
    cachedBooks = EMPTY_BOOKS;
    return EMPTY_BOOKS;
  }
}

function writeBooks(books: UploadedBook[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  cachedRawBooks = JSON.stringify(books);
  cachedBooks = books;
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

export function useUploadedBooks() {
  return useSyncExternalStore(subscribe, readBooks, () => EMPTY_BOOKS);
}

export function addUploadedBook(draft: AdminBookDraft) {
  const nextBooks = [createBookFromDraft(draft), ...readBooks()];
  writeBooks(nextBooks);
}

export function clearUploadedBooks() {
  writeBooks([]);
}
