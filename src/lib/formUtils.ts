/**
 * Shared form utilities for lead capture forms.
 * Phone formatting and timestamp generation.
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
