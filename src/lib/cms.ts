"use client";

import { useSyncExternalStore } from "react";

export type CmsSettings = {
  heroLabel: string;
  heroHeadline: string;
  heroDescription: string;
  featuredShelfSlug: string;
  primaryCta: string;
  secondaryCta: string;
};

const STORAGE_KEY = "zoes-booksphere-cms";
const subscribers = new Set<() => void>();

export const defaultCmsSettings: CmsSettings = {
  heroLabel: "Curated reading, built like a product",
  heroHeadline: "The reading system for people who want more than a bookshelf.",
  heroDescription:
    "Zoe's BookSphere is a premium knowledge platform for discovery, self-development, and digital content. It turns books into guided journeys that help readers choose faster, learn better, and return often.",
  featuredShelfSlug: "focus-protocol",
  primaryCta: "Start a reading stack",
  secondaryCta: "See why it works",
};

let cachedRawSettings = "";
let cachedSettings = defaultCmsSettings;

function readSettings() {
  if (typeof window === "undefined") {
    return defaultCmsSettings;
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    cachedRawSettings = "";
    cachedSettings = defaultCmsSettings;
    return defaultCmsSettings;
  }

  if (stored === cachedRawSettings) {
    return cachedSettings;
  }

  try {
    cachedRawSettings = stored;
    cachedSettings = { ...defaultCmsSettings, ...(JSON.parse(stored) as Partial<CmsSettings>) };
    return cachedSettings;
  } catch {
    cachedRawSettings = "";
    cachedSettings = defaultCmsSettings;
    return defaultCmsSettings;
  }
}

function writeSettings(settings: CmsSettings) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
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

export function useCmsSettings() {
  return useSyncExternalStore(subscribe, readSettings, () => defaultCmsSettings);
}

export function saveCmsSettings(settings: CmsSettings) {
  writeSettings(settings);
}
