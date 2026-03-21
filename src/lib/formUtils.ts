/**
 * Shared form utilities for lead capture forms.
 * Phone formatting, Web3Forms payload building, timestamp generation.
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

/**
 * Builds standardized Web3Forms payload with consistent field naming.
 * Always includes: replyto (for reply-to header), source, page_url, submitted_at.
 */
export function buildWeb3Payload({
  accessKey,
  subject,
  name,
  email,
  phone,
  source,
  extra = {},
}: {
  accessKey: string;
  subject: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  extra?: Record<string, string>;
}): Record<string, string> {
  return {
    access_key: accessKey,
    subject,
    from_name: "Echelon Property Group Website",
    replyto: email,
    name,
    email,
    phone: phone || "Not provided",
    source,
    page_url: typeof window !== "undefined" ? window.location.href : "",
    submitted_at: getTimestamp(),
    ...extra,
  };
}
