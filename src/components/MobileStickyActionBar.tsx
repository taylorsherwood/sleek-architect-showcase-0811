import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

/**
 * Mobile-only sticky action bar.
 *
 * Appears after the visitor has scrolled ~25% of the page. Stays minimal:
 * three editorial actions on a navy bar with a thin gold hairline. No
 * popups, no animations beyond a calm fade/translate.
 *
 * Hidden on /connect (the bar's third action targets it), on the
 * private-distribution edition gate routes, on admin routes, and once
 * the footer is in view (so the bar never overlaps the legal area).
 *
 * Analytics:
 *  - mobile_sticky_impression  once per route, when the bar first reveals
 *  - mobile_sticky_click       on each action tap (with action + href)
 */
const SUPPRESSED_PREFIXES = ["/connect", "/admin", "/sell-private/thank-you"];

const ACTIONS = [
  { label: "Private Listings", href: "/private-opportunities", key: "private_listings" },
  { label: "Market Reports", href: "/market-intelligence", key: "market_reports" },
  { label: "Contact Taylor", href: "/connect", key: "contact_taylor" },
];

const MobileStickyActionBar = () => {
  const { pathname } = useLocation();
  const [revealed, setRevealed] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const firedImpressionRef = useRef(false);

  const suppressedRoute =
    SUPPRESSED_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  // Reset reveal state + impression flag on every route change.
  useEffect(() => {
    setRevealed(false);
    firedImpressionRef.current = false;
  }, [pathname]);

  // Scroll progress watcher (25% of total scrollable height).
  useEffect(() => {
    if (suppressedRoute) return;
    if (typeof window === "undefined") return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const scrollTop = window.scrollY || doc.scrollTop;
        const full = doc.scrollHeight - window.innerHeight;
        if (full <= 0) return;
        const pct = scrollTop / full;
        if (pct >= 0.25) setRevealed(true);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [suppressedRoute]);

  // Hide once the footer scrolls into view.
  useEffect(() => {
    if (suppressedRoute) return;
    const footer = document.querySelector("footer");
    if (!footer || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(footer);
    return () => io.disconnect();
  }, [suppressedRoute, pathname]);

  const visible = revealed && !footerVisible && !suppressedRoute;

  useEffect(() => {
    if (visible && !firedImpressionRef.current) {
      firedImpressionRef.current = true;
      trackEvent("mobile_sticky_impression", { page_path: pathname });
    }
  }, [visible, pathname]);

  if (suppressedRoute) return null;

  const onClick = (key: string, href: string) => () => {
    trackEvent("mobile_sticky_click", { action: key, href, page_path: pathname });
  };

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}
      style={{
        background: "#0C0F24",
        borderTop: "1px solid #b9a06c",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      role="navigation"
      aria-label="Quick actions"
      aria-hidden={!visible}
    >
      <ul className="grid grid-cols-3">
        {ACTIONS.map((a) => (
          <li key={a.key}>
            <Link
              to={a.href}
              onClick={onClick(a.key, a.href)}
              className="flex items-center justify-center text-center px-2 py-4 min-h-[56px] text-[#F5F3EF] hover:text-[#b9a06c] active:text-[#b9a06c] transition-colors"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10.5px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 400,
                lineHeight: 1.25,
              }}
            >
              {a.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileStickyActionBar;
