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

/** Fire a GA4 generate_lead conversion. Used by the central form submitter. */
export function trackLead(params: {
  source: string;
  value?: number;
  currency?: string;
  email?: string;
}): void {
  trackEvent("generate_lead", {
    currency: params.currency || "USD",
    value: params.value ?? 0,
    lead_source: params.source,
    // Don't send PII as event params; hashing/identity is left to GA config.
  });
}
