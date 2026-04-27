/**
 * Shared form utilities for lead capture forms.
 * Phone formatting, timestamp generation, and the centralized
 * Zapier webhook submitter used by every lead/contact form site-wide.
 */

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

  // Validation — never trigger the webhook on incomplete data
  if (!name) return { ok: false, error: "Name is required." };
  if (!email) return { ok: false, error: "Email is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!phone && !message) {
    return { ok: false, error: "Please provide a phone number or a message." };
  }

  const page =
    typeof window !== "undefined" ? window.location.href : "";
  const time = getTimestamp();

  // Canonical payload — keys must match the Zap field mapping exactly
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

  // Console-log the payload so submissions can be verified live
  // eslint-disable-next-line no-console
  console.log("[Zapier lead submission] →", webhookUrl, payload);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error(
        "[Zapier lead submission] ✗ HTTP",
        response.status,
        response.statusText
      );
      return {
        ok: false,
        error: `Submission failed (${response.status}).`,
      };
    }
    // eslint-disable-next-line no-console
    console.log("[Zapier lead submission] ✓ delivered");
    return { ok: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[Zapier lead submission] ✗ network error", err);
    return { ok: false, error: "Network error. Please try again." };
  }
}
