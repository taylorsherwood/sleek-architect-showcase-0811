/**
 * Server-verified unlock for gated community reports.
 *
 * Security model: the full community report is fetched from the
 * `get-community-report` edge function, which verifies a recent
 * `community_leads` row matches the submitted {slug, email}. Only after
 * that server-side check does the full payload reach the browser.
 *
 * localStorage is used ONLY as a UI convenience cache (so returning
 * visitors don't see the gate again for 30 days), it never grants
 * access to data on its own.
 */
import { supabase } from "@/integrations/supabase/client";
import type { CommunityRecord } from "@/types/community";

const DATA_PREFIX = "echelon_community_unlock_v2_";
const LEGACY_FLAG_PREFIX = "echelon_community_unlock_";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface CachedUnlock {
  expires: number;
  community: CommunityRecord;
}

export function getCachedUnlock(slug: string): CommunityRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(DATA_PREFIX + slug);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedUnlock;
    if (!parsed?.community || typeof parsed.expires !== "number") return null;
    if (Date.now() > parsed.expires) {
      localStorage.removeItem(DATA_PREFIX + slug);
      return null;
    }
    return parsed.community;
  } catch {
    return null;
  }
}

export function clearLegacyUnlockFlag(slug: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(LEGACY_FLAG_PREFIX + slug);
  } catch {
    /* ignore */
  }
}

export interface UnlockSubmission {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  community_name: string;
  interest?: string;
}

/**
 * Calls the get-community-report edge function. The function inserts a
 * community_lead and returns the full community row (including gated
 * columns), the gated data only ever reaches the browser through this
 * server-verified path.
 */
export async function fetchUnlockedReport(
  slug: string,
  submission: UnlockSubmission,
): Promise<CommunityRecord | null> {
  try {
    const utm = getUtmParams();
    const { data, error } = await supabase.functions.invoke("get-community-report", {
      body: {
        slug,
        email: submission.email,
        first_name: submission.first_name,
        last_name: submission.last_name,
        phone: submission.phone,
        community_name: submission.community_name,
        interest: submission.interest ?? "",
        ...utm,
        referrer: typeof document !== "undefined" ? document.referrer || "" : "",
        page_url: typeof window !== "undefined" ? window.location.href : "",
        source_tag: `Community Report - ${submission.community_name}`,
      },
    });
    if (error || !data?.community) return null;
    const community = data.community as CommunityRecord;
    try {
      const payload: CachedUnlock = {
        expires: Date.now() + TTL_MS,
        community,
      };
      localStorage.setItem(DATA_PREFIX + slug, JSON.stringify(payload));
      clearLegacyUnlockFlag(slug);
      window.dispatchEvent(
        new CustomEvent("echelon:community-unlocked", {
          detail: { slug, community },
        }),
      );
    } catch {
      /* storage full or disabled, payload is still returned for in-memory use */
    }
    return community;
  } catch {
    return null;
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

// --- Legacy named exports retained so any straggling imports do not crash ---
// These are intentional no-ops; unlock state is now driven by getCachedUnlock.
export function isUnlocked(slug: string): boolean {
  return getCachedUnlock(slug) !== null;
}

export function setUnlocked(_slug: string): void {
  /* deprecated: use fetchUnlockedReport which performs server verification */
}
