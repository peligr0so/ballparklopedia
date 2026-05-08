"use client";

const STORAGE_KEY = "ballparklopedia_bucket_list";

export function getBucketList(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleBucketList(slug: string): string[] {
  const current = getBucketList();
  const updated = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function isInBucketList(slug: string): boolean {
  return getBucketList().includes(slug);
}
