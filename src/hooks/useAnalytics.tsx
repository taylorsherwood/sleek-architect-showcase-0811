import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent, trackPageView } from "@/lib/analytics";

/**
 * Mount once at the app root. Handles:
 *  - SPA page_view on every route change
 *  - scroll depth milestones (25/50/75/90%)
 *  - delegated click tracking on links and buttons
 *  - delegated form_submit tracking on every <form>
 *
 * All events are queued safely until GA4 finishes its deferred load.
 */
export function useAnalytics(): void {
  const location = useLocation();
  const lastPathRef = useRef<string>("");

  // SPA page_view
  useEffect(() => {
    const path = location.pathname + location.search;
    if (path === lastPathRef.current) return;
    lastPathRef.current = path;
    // Defer so document.title reflects the new route's <Helmet> title.
    const id = window.setTimeout(() => trackPageView(path), 60);
    return () => window.clearTimeout(id);
  }, [location.pathname, location.search]);

  // Scroll depth + delegated click + form_submit (mount once)
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ── Scroll depth ────────────────────────────────────────────────
    const milestones = [25, 50, 75, 90];
    let fired = new Set<number>();
    let ticking = false;

    const resetForRoute = () => {
      fired = new Set<number>();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const viewport = window.innerHeight;
        const full = doc.scrollHeight - viewport;
        if (full <= 0) return;
        const pct = Math.min(100, Math.round((scrollTop / full) * 100));
        for (const m of milestones) {
          if (pct >= m && !fired.has(m)) {
            fired.add(m);
            trackEvent("scroll", { percent_scrolled: m });
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Delegated click ─────────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest(
        "a, button, [role='button']"
      ) as HTMLElement | null;
      if (!el) return;

      const anchor = el.tagName === "A" ? (el as HTMLAnchorElement) : null;
      const href = anchor?.getAttribute("href") || "";
      const text = (el.innerText || el.getAttribute("aria-label") || "")
        .trim()
        .slice(0, 80);
      const isExternal =
        anchor &&
        href &&
        /^https?:\/\//i.test(href) &&
        !href.includes(window.location.hostname);

      trackEvent("click", {
        element: el.tagName.toLowerCase(),
        link_text: text || undefined,
        link_url: href || undefined,
        outbound: isExternal || false,
      });
    };
    document.addEventListener("click", onClick, { capture: true });

    // ── Delegated form_submit ───────────────────────────────────────
    const onSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;
      trackEvent("form_submit", {
        form_id: form.id || undefined,
        form_name: form.getAttribute("name") || undefined,
        form_location: window.location.pathname,
      });
    };
    document.addEventListener("submit", onSubmit, { capture: true });

    // Reset scroll milestones on every SPA nav.
    const onPopState = () => resetForRoute();
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, { capture: true } as never);
      document.removeEventListener("submit", onSubmit, { capture: true } as never);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);
}
