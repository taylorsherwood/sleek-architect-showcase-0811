/**
 * Site-wide analytics helper.
 *
 * GA4 (G-Y84Q0NX0NE) is loaded by the deferred bootstrap in index.html
 * after the first user interaction (or ~15s idle). This module is a
 * safe, queue-aware abstraction so every component fires events the
 * same way without having to know about gtag's timing.
 *
 * Standard events used across the site:
 *   - page_view       (auto, also re-fired on SPA route change)
 *   - scroll          (auto, 25/50/75/90% depth milestones)
 *   - click           (auto, delegated on links + buttons)
 *   - form_submit     (auto, delegated on every <form>)
 *   - generate_lead   (fired from submitLeadToZapier on success)
 *
 * Add new events with:  trackEvent("event_name", { ...params })
 */

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

const MEASUREMENT_ID = "G-Y84Q0NX0NE";

/** Fire a GA4 event. Safe to call before gtag has loaded. */
export function trackEvent(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    } else {
      // Queue until gtag loads. dataLayer is what gtag flushes on init.
      window.dataLayer.push(["event", name, params]);
    }
  } catch {
    /* never break the app for analytics */
  }
}

/** Fire a GA4 page_view (used for SPA route changes). */
export function trackPageView(path?: string): void {
  if (typeof window === "undefined") return;
  const page_path = path || window.location.pathname + window.location.search;
  trackEvent("page_view", {
    page_path,
    page_location: window.location.href,
    page_title: document.title,
    send_to: MEASUREMENT_ID,
  });
}

/**
 * Google Ads conversion ID for the "Submit lead form" conversion action.
 * Fired site-wide on every successful lead submission via submitLeadToZapier().
 */
export const GOOGLE_ADS_LEAD_CONVERSION_ID =
  "AW-17598090760/BHb7CPuQr4scEIictsdB";

/* ──────────────────────────────────────────────────────────────────
   Google Ads click-ID persistence (GCLID / GBRAID / WBRAID)
   ──────────────────────────────────────────────────────────────── */

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;
type ClickIdKey = (typeof CLICK_ID_KEYS)[number];
const CLICK_ID_STORAGE = "epg_ads_click_ids";
const CLICK_ID_TTL_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

type StoredClickIds = { ids: Partial<Record<ClickIdKey, string>>; ts: number };

/** Capture GCLID/GBRAID/WBRAID from the current URL and persist them.
 *  Call once on app mount. Survives SPA navigation via localStorage. */
export function captureAdsClickIds(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Partial<Record<ClickIdKey, string>> = {};
    for (const k of CLICK_ID_KEYS) {
      const v = params.get(k);
      if (v) found[k] = v;
    }
    if (Object.keys(found).length === 0) return;
    const payload: StoredClickIds = { ids: found, ts: Date.now() };
    localStorage.setItem(CLICK_ID_STORAGE, JSON.stringify(payload));
  } catch {
    /* storage may be unavailable */
  }
}

/** Read persisted Google Ads click identifiers, if still within TTL. */
export function getAdsClickIds(): Partial<Record<ClickIdKey, string>> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(CLICK_ID_STORAGE);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as StoredClickIds;
    if (!parsed?.ts || Date.now() - parsed.ts > CLICK_ID_TTL_MS) return {};
    return parsed.ids || {};
  } catch {
    return {};
  }
}

/* ──────────────────────────────────────────────────────────────────
   Enhanced Conversions normalization
   Google requires lowercased/trimmed values; phones in E.164. gtag
   hashes (SHA-256) client-side before transmission when user_data
   is provided as plain text.
   ──────────────────────────────────────────────────────────────── */

function normEmail(v?: string): string | undefined {
  const t = (v || "").trim().toLowerCase();
  return t && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t) ? t : undefined;
}

function normPhoneE164(v?: string): string | undefined {
  const digits = (v || "").replace(/\D/g, "");
  if (!digits) return undefined;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return `+${digits}`;
}

function normName(v?: string): string | undefined {
  const t = (v || "").trim().toLowerCase();
  return t || undefined;
}

/** Fire a GA4 generate_lead event AND the Google Ads conversion for "Submit lead form".
 *  Called centrally from submitLeadToZapier() after a successful response. */
export function trackLead(params: {
  source: string;
  value?: number;
  currency?: string;
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
}): void {
  const value = params.value ?? 1.0;
  const currency = params.currency || "USD";

  // GA4 lead event (no PII in params)
  trackEvent("generate_lead", {
    currency,
    value,
    lead_source: params.source,
  });

  // Enhanced Conversions: set user_data for Ads identity matching.
  const email = normEmail(params.email);
  const phone_number = normPhoneE164(params.phone);
  const first_name = normName(params.firstName);
  const last_name = normName(params.lastName);
  const address =
    first_name || last_name ? { first_name, last_name } : undefined;

  const user_data: Record<string, unknown> = {};
  if (email) user_data.email = email;
  if (phone_number) user_data.phone_number = phone_number;
  if (address) user_data.address = address;

  if (typeof window !== "undefined" && Object.keys(user_data).length > 0) {
    try {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag === "function") {
        window.gtag("set", "user_data", user_data);
      } else {
        window.dataLayer.push(["set", "user_data", user_data]);
      }
    } catch {
      /* never break the app for analytics */
    }
  }

  // Google Ads "Submit lead form" conversion. Click IDs forwarded explicitly so
  // attribution survives SPA navigation even if the auto-tagging cookie is missing.
  const clickIds = getAdsClickIds();
  trackEvent("conversion", {
    send_to: GOOGLE_ADS_LEAD_CONVERSION_ID,
    value,
    currency,
    ...(clickIds.gclid ? { gclid: clickIds.gclid } : {}),
    ...(clickIds.gbraid ? { gbraid: clickIds.gbraid } : {}),
    ...(clickIds.wbraid ? { wbraid: clickIds.wbraid } : {}),
  });
}
