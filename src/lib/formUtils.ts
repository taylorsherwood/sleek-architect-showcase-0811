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
import { trackLead, getAdsClickIds } from "@/lib/analytics";

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

/** Splits a "First Last" string into first/last name parts. */
function splitName(full: string): { firstName?: string; lastName?: string } {
  const parts = full.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return {};
  if (parts.length === 1) return { firstName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
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
  const submittedAt = new Date().toISOString();

  // Canonical payload, keys must match the Zap field mapping exactly.
  // Built from live submit-time values, never from stale refs.
  const payload: Record<string, string> = {
    name,
    email,
    phone: phone || "",
    message: message || "",
    source: source || "Website Form",
    page,
    page_url: page, // duplicate under explicit name in case Zap mapping uses page_url
    time,
    submittedAt,
  };

  // Dynamically collect ALL extra/custom fields. We do TWO things:
  //   1. Flatten them onto the top-level payload (back-compat with existing
  //      Zapier field mappings that expect e.g. {{budget}}).
  //   2. Build a humanized `fields_summary` block and a `fields_json` blob
  //      so the Zap email template can render every submitted field
  //      automatically, even brand-new ones, with just one merge tag.
  const fields: Record<string, string> = {};
  if (data.extra) {
    for (const [k, v] of Object.entries(data.extra)) {
      if (v === undefined || v === null) continue;
      const value = String(v).trim();
      if (!value) continue;
      if (!(k in payload)) payload[k] = value;
      fields[k] = value;
    }
  }

  const humanLabel = (key: string) =>
    key
      .replace(/[_-]+/g, " ")
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const summaryLines: string[] = [];
  if (payload.message) summaryLines.push(`Notes: ${payload.message}`);
  for (const [k, v] of Object.entries(fields)) {
    summaryLines.push(`${humanLabel(k)}: ${v}`);
  }
  payload.fields_summary = summaryLines.join("\n");
  payload.fields_json = JSON.stringify(fields);

  // ── HARD VALIDATION GUARD ──────────────────────────────────────
  // Block empty/incomplete payloads from ever reaching Zapier.
  if (
    !payload.name ||
    !payload.email ||
    (!payload.phone && !payload.message)
  ) {
    if (!payload.name) return { ok: false, error: "Name is required." };
    if (!payload.email) return { ok: false, error: "Email is required." };
    return { ok: false, error: "Please provide a phone number or a message." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  try {
    const { data: response, error } = await supabase.functions.invoke("submit-lead", {
      body: {
        payload,
        webhookUrl,
        extra: data.extra || {},
        utm: getUtmFromUrl(),
        referrer: typeof document !== "undefined" ? document.referrer || "" : "",
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent || "" : "",
      },
    });

    if (error) throw error;
    if (response && typeof response === "object" && "ok" in response && !response.ok) {
      return { ok: false, error: String(response.error || "Submission failed.") };
    }

    // Fire GA4 conversion for every successful lead capture site-wide.
    trackLead({ source: payload.source, email: payload.email });

    return { ok: true };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Network error";
    return { ok: false, error: errMsg || "Network error. Please try again." };
  }
}
