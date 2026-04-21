/**
 * Device-level unlock for gated community reports.
 * Stores per-slug unlock with a 30-day TTL in localStorage.
 */

const KEY_PREFIX = "echelon_community_unlock_";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function isUnlocked(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(KEY_PREFIX + slug);
    if (!raw) return false;
    const expires = parseInt(raw, 10);
    if (!Number.isFinite(expires)) return false;
    if (Date.now() > expires) {
      localStorage.removeItem(KEY_PREFIX + slug);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function setUnlocked(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY_PREFIX + slug, String(Date.now() + TTL_MS));
    // Notify any mounted components that this slug just unlocked so they
    // can update without a full reload.
    window.dispatchEvent(new CustomEvent("echelon:community-unlocked", { detail: { slug } }));
  } catch {
    /* ignore */
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = params.get(k);
    if (v) out[k] = v;
  });
  return out;
}
