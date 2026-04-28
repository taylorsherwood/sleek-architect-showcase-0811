/**
 * Shared form utilities for lead capture forms.
 * Phone formatting, timestamp generation, and the centralized
 * lead submitter used by every lead/contact form site-wide.
 *
 * Every submission is permanently captured in the `leads` table
 * BEFORE the Zapier webhook is called, so no lead is ever lost
 * even if Zapier fails or the webhook URL changes.
 */
import { supabase } from "@/integrations/supabase/client";

/** Reads UTM parameters from the current URL. */
function getUtmFromUrl(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
    (k) => {
      const v = params.get(k);
      if (v) out[k] = v;
    }
  );
  return out;
}

/**
 * Formats a phone string as (xxx) xxx-xxxx as user types.
 * Strips non-digits, then applies US format progressively.
 */
export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Returns raw digits from a formatted phone string.
 */
export function getPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Returns a CST/CDT timestamp string for submission payloads.
 */
export function getTimestamp(): string {
  return new Date().toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });
}

/* ────────────────────────────────────────────────────────────────
   Centralized Zapier webhook submission
   ──────────────────────────────────────────────────────────────── */

// The two Zapier webhooks the site uses
export const ZAPIER_LEAD_WEBHOOK =
  "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/";
export const ZAPIER_BOOKING_WEBHOOK =
  "https://hooks.zapier.com/hooks/catch/26916347/u7plp1z/";

export interface LeadSubmission {
  /** Required. Full name. */
  name: string;
  /** Required. Email address. */
  email: string;
  /** Phone number. Required if `message` is empty. */
  phone?: string;
  /** Free-form message / notes. Required if `phone` is empty. */
  message?: string;
  /** Required. Friendly name of the form/source. */
  source: string;
  /** Optional extra fields appended to the payload (e.g. address, budget). */
  extra?: Record<string, string | number | boolean | null | undefined>;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Submits a lead to the Zapier webhook with a complete, normalized JSON
 * payload. Always sends the seven canonical fields the Zap expects:
 *   name, email, phone, message, source, page, time
 *
 * Any additional fields can be passed via `extra` and will be merged into
 * the payload (so the Zap can use them downstream if mapped).
 *
 * Validation: name + email + (phone OR message) are required.
 * Logs the payload to the console before submission.
 */
export async function submitLeadToZapier(
  data: LeadSubmission,
  webhookUrl: string = ZAPIER_LEAD_WEBHOOK
): Promise<SubmitResult> {
  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const message = (data.message || "").trim();
  const source = (data.source || "").trim();

  const page =
    typeof window !== "undefined" ? window.location.href : "";
  const time = getTimestamp();

  // Canonical payload — keys must match the Zap field mapping exactly.
  // Built from live submit-time values, never from stale refs.
  const payload: Record<string, string> = {
    name,
    email,
    phone: phone || "",
    message: message || "",
    source: source || "Website Form",
    page,
    time,
  };

  // Merge any extra fields without overwriting canonical keys
  if (data.extra) {
    for (const [k, v] of Object.entries(data.extra)) {
      if (v === undefined || v === null) continue;
      if (k in payload) continue; // never overwrite canonical fields
      payload[k] = String(v);
    }
  }

  // ── HARD VALIDATION GUARD ──────────────────────────────────────
  // Block empty/incomplete payloads from ever reaching Zapier.
  if (
    !payload.name ||
    !payload.email ||
    (!payload.phone && !payload.message)
  ) {
    // eslint-disable-next-line no-console
    console.warn("Blocked empty Zapier payload", payload);
    if (!payload.name) return { ok: false, error: "Name is required." };
    if (!payload.email) return { ok: false, error: "Email is required." };
    return { ok: false, error: "Please provide a phone number or a message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    // eslint-disable-next-line no-console
    console.warn("Blocked empty Zapier payload", payload);
    return { ok: false, error: "Please enter a valid email address." };
  }

  // Log only on valid, about-to-fire submissions
  // eslint-disable-next-line no-console
  console.log("[Zapier lead submission] payload:", payload);

  // ── PERMANENT CAPTURE: write to `leads` table BEFORE calling Zapier ──
  // This guarantees we never lose a lead, even if Zapier fails downstream.
  const utmFromUrl = getUtmFromUrl();
  const extraForDb: Record<string, unknown> = {};
  if (data.extra) {
    for (const [k, v] of Object.entries(data.extra)) {
      if (v === undefined || v === null) continue;
      // Strip UTM keys out of `extra` since they have dedicated columns
      if (k.startsWith("utm_")) continue;
      extraForDb[k] = v;
    }
  }
  const utmMerged = { ...utmFromUrl, ...(data.extra || {}) };

  // Generate the lead ID client-side so we can both insert it AND
  // update its zapier_status later WITHOUT needing SELECT permission
  // (anon role has no SELECT policy on `leads` — admin-only reads).
  const leadId: string =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  let leadSaved = false;
  try {
    const { error: dbError } = await supabase.from("leads").insert({
      id: leadId,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      message: payload.message || null,
      source: payload.source,
      page_url: page || null,
      referrer:
        typeof document !== "undefined" ? document.referrer || null : null,
      user_agent:
        typeof navigator !== "undefined" ? navigator.userAgent || null : null,
      utm_source: (utmMerged as Record<string, unknown>).utm_source
        ? String((utmMerged as Record<string, unknown>).utm_source)
        : null,
      utm_medium: (utmMerged as Record<string, unknown>).utm_medium
        ? String((utmMerged as Record<string, unknown>).utm_medium)
        : null,
      utm_campaign: (utmMerged as Record<string, unknown>).utm_campaign
        ? String((utmMerged as Record<string, unknown>).utm_campaign)
        : null,
      utm_term: (utmMerged as Record<string, unknown>).utm_term
        ? String((utmMerged as Record<string, unknown>).utm_term)
        : null,
      utm_content: (utmMerged as Record<string, unknown>).utm_content
        ? String((utmMerged as Record<string, unknown>).utm_content)
        : null,
      extra: extraForDb as never,
      zapier_status: "pending" as const,
    } as never);
    if (dbError) {
      // eslint-disable-next-line no-console
      console.error("[Lead capture] DB insert failed", dbError);
    } else {
      leadSaved = true;
      // eslint-disable-next-line no-console
      console.log("[Lead capture] ✓ saved to database", leadId);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Lead capture] DB insert threw", err);
  }

  // Helper to update the lead's Zapier delivery status
  const markZapierStatus = async (
    status: "sent" | "failed",
    errorMsg?: string
  ) => {
    if (!leadSaved) return;
    try {
      await supabase
        .from("leads")
        .update({ zapier_status: status, zapier_error: errorMsg ?? null })
        .eq("id", leadId);
    } catch {
      /* swallow — DB record exists, status update is best-effort */
    }
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams(payload).toString(),
    });
    // eslint-disable-next-line no-console
    console.log("[Zapier lead submission] ✓ dispatched");
    void markZapierStatus("sent");
    return { ok: true };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Network error";
    // eslint-disable-next-line no-console
    console.error("[Zapier lead submission] ✗ dispatch error", err);
    void markZapierStatus("failed", errMsg);
    return leadSaved
      ? { ok: true }
      : { ok: false, error: "Network error. Please try again." };
  }
}
