import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getTimestamp, submitLeadToZapier, formatPhoneNumber, getPhoneDigits } from "@/lib/formUtils";
const STORAGE_KEY = "echelon_exit_intent_v1";

// Routes where the modal should never appear (user already converting / dedicated lead pages)
const EXCLUDED_PATH_PREFIXES = [
  "/contact",
  "/sell-private/thank-you",
  "/off-market-real-estate-austin",
];

const ExitIntentModal = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const armedRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Determine eligibility for current route
  const isExcluded = EXCLUDED_PATH_PREFIXES.some((p) =>
    location.pathname.toLowerCase().startsWith(p)
  );

  // Has the user already seen / dismissed / submitted? — once-ever per browser
  const alreadyShown = (): boolean => {
    if (typeof window === "undefined") return true;
    try {
      return !!window.localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  };

  const markShown = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, getTimestamp());
    } catch {
      /* ignore */
    }
  };

  // Arm triggers after a short grace period so it never fires on initial entry
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isExcluded) return;
    if (alreadyShown()) return;

    let armTimer: number | undefined;
    armTimer = window.setTimeout(() => {
      armedRef.current = true;
    }, 8000); // 8s grace before any trigger can fire

    const triggerOpen = () => {
      if (!armedRef.current) return;
      if (alreadyShown()) return;
      armedRef.current = false;
      markShown();
      setOpen(true);
    };

    // Desktop — exit intent (cursor leaves through the top of the viewport)
    const onMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget) return; // moved to another element, not out of window
      if (e.clientY > 0) return; // only top edge
      triggerOpen();
    };

    // Mobile — fast scroll-up near the top of the page (equivalent of exit intent)
    const onScroll = () => {
      const y = window.scrollY;
      const last = lastScrollYRef.current;
      const delta = last - y; // positive = scrolling up
      lastScrollYRef.current = y;
      if (delta > 60 && y < 240) {
        triggerOpen();
      }
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (armTimer) window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isExcluded, location.pathname]);

  // Lock body scroll + focus management while open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    const res = await submitLeadToZapier({
      // No name field on exit-intent modal — use a clear default so the Zap
      // still receives a populated `name` and `message`.
      name: "Exit Intent Visitor",
      email,
      message: "Requested early access to private listings via exit-intent modal.",
      source: "Exit Intent — LUXURY LISTINGs",
    });
    if (res.ok) {
      setSubmitted(true);
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{
        background: "rgba(8, 11, 26, 0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "fadeIn 0.4s ease both",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-[460px] mx-auto overflow-hidden"
        style={{
          background: "#FFFFFF",
          border: "1px solid rgba(185, 160, 108, 0.22)",
          boxShadow:
            "0 30px 80px rgba(8, 11, 26, 0.35), 0 8px 24px rgba(8, 11, 26, 0.18)",
          padding: "clamp(36px, 5vw, 56px) clamp(28px, 4vw, 44px)",
          animation:
            "fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
        }}
      >
        {/* Close */}
        <button
          ref={closeBtnRef}
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors duration-300"
          style={{ background: "transparent", border: "none" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Top hairline ornament */}
        <div className="flex items-center justify-center gap-3 mb-7">
          <span style={{ width: "44px", height: "1px", background: "linear-gradient(to right, transparent, #b9a06c)" }} />
          <span style={{ width: "5px", height: "5px", transform: "rotate(45deg)", border: "1px solid #b9a06c" }} />
          <span style={{ width: "44px", height: "1px", background: "linear-gradient(to left, transparent, #b9a06c)" }} />
        </div>

        {!submitted ? (
          <>
            <p
              className="text-center text-gold mb-4"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              By Invitation
            </p>

            <h2
              id="exit-intent-title"
              className="text-center font-display font-normal text-foreground mb-5"
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "clamp(1.55rem, 2.6vw, 1.95rem)",
                lineHeight: 1.2,
                letterSpacing: "0.02em",
              }}
            >
              LUXURY LISTINGs, Before They&rsquo;re Public
            </h2>

            <p
              className="text-center text-foreground/70 mb-8 mx-auto"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontWeight: 300,
                fontSize: "0.95rem",
                lineHeight: 1.7,
                maxWidth: "340px",
              }}
            >
              Receive Echelon&rsquo;s curated off-market opportunities — quietly, before they reach MLS or Zillow.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Email address"
                className="w-full bg-transparent text-foreground placeholder:text-foreground/40 focus:outline-none transition-colors duration-300"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "0.95rem",
                  letterSpacing: "0.02em",
                  padding: "14px 4px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderRight: "none",
                  borderBottom: "1px solid rgba(0,0,0,0.18)",
                  borderRadius: 0,
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderBottomColor = "#b9a06c";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderBottomColor = "rgba(0,0,0,0.18)";
                }}
              />

              <button
                type="submit"
                disabled={loading}
                className="cta-luxury w-full mt-5"
                style={{ justifyContent: "center" }}
              >
                {loading ? "SENDING…" : "REQUEST ACCESS"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="block mx-auto mt-6 text-foreground/40 hover:text-foreground/70 transition-colors duration-300"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                background: "transparent",
                border: "none",
              }}
            >
              No thank you
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <p
              className="text-gold mb-4"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
              }}
            >
              Welcome
            </p>
            <h3
              className="font-display text-foreground mb-4"
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "clamp(1.4rem, 2.4vw, 1.75rem)",
                lineHeight: 1.25,
                letterSpacing: "0.02em",
              }}
            >
              You&rsquo;re on the list.
            </h3>
            <p
              className="text-foreground/70 mb-7 mx-auto"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontWeight: 300,
                fontSize: "0.92rem",
                lineHeight: 1.7,
                maxWidth: "320px",
              }}
            >
              We&rsquo;ll be in touch when the right opportunity surfaces.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="cta-luxury"
            >
              CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExitIntentModal;
