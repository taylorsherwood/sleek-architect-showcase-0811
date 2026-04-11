import { useState, useEffect, useCallback } from "react";
import { X, Check } from "lucide-react";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { formatPhoneNumber, getTimestamp } from "@/lib/formUtils";
import echelonLogo from "@/assets/echelon-logo-gold.png";
import { useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription } from
"@/components/ui/dialog";

const SESSION_KEY = "echelon_advisory_bar_dismissed";
const SCROLL_THRESHOLD = 0.4;

const formSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(1, "Phone is required").max(20),
});

const HIDDEN_ROUTES = ["/contact", "/connect", "/austin-multifamily-report-2026"];

const AdvisoryBar = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [timerReady, setTimerReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", lookingFor: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isOffMarket = location.pathname === "/off-market-real-estate-austin";

  const dismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    window.dispatchEvent(new CustomEvent("advisory-bar-dismissed"));
  }, []);

  // 20-second delay before allowing visibility
  useEffect(() => {
    const t = setTimeout(() => setTimerReady(true), 20000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setDismissed(true);
      return;
    }
    if (!timerReady) return;

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const hero = document.getElementById("hero") || document.querySelector("section");
      const triggerPoint = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      const pastHero = window.scrollY >= triggerPoint;
      const scrollingUp = window.scrollY < lastScrollY;
      lastScrollY = window.scrollY;

      if (isHomePage) {
        const finalCta = document.getElementById("final-cta-section");
        const insightsSection = document.getElementById("insights-section");

        if (finalCta) {
          const finalCtaTop = finalCta.getBoundingClientRect().top;
          // Hide when FinalCTA enters viewport
          if (finalCtaTop <= window.innerHeight) {
            setVisible(false);
            lastScrollY = window.scrollY;
            return;
          }
        }

        if (insightsSection && scrollingUp) {
          const insightsBottom = insightsSection.getBoundingClientRect().bottom;
          // Re-show when scrolling up and insights section is visible
          if (insightsBottom >= 0 && pastHero) {
            setVisible(true);
            lastScrollY = window.scrollY;
            return;
          }
        }

        // Default: show when past hero, hide when at hero
        if (pastHero && !finalCta) {
          setVisible(true);
        } else if (pastHero) {
          // Only set visible if we haven't been hidden by finalCta logic
          const finalCtaTop = finalCta!.getBoundingClientRect().top;
          if (finalCtaTop > window.innerHeight) {
            setVisible(pastHero);
          }
        } else {
          setVisible(false);
        }
      } else {
        // On other pages, show once past equivalent scroll depth
        if (pastHero) setVisible(true);
      }
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) setVisible(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isHomePage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[String(err.path[0])] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError(false);
    try {
      const response = await fetch("https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          looking_for: form.lookingFor.trim() || "Not specified",
          source: "Homepage Advisory Bar",
          page_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: getTimestamp(),
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const isHiddenRoute = HIDDEN_ROUTES.includes(location.pathname);
  if (isHiddenRoute || dismissed) return null;

  return (
    <>
      {/* Advisory bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          opacity: visible ? 1 : 0,
        }}>
        
        {/* Gold divider */}
        <div className="h-[2.5px]" style={{ background: "hsl(var(--gold))" }} />

        <div className={`${isOffMarket ? "bg-[hsl(220,15%,8%)]" : "bg-primary"} h-20 flex items-center`} style={{ fontFamily: "'Jost', sans-serif" }}>
          <div className="container mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-primary-foreground font-semibold text-sm md:text-base leading-tight truncate">
                <span className="inline md:hidden">Unlock Off-Market Homes</span>
                <span className="hidden md:inline">See Austin Homes Before They Hit Zillow</span>
              </p>
              <p className="text-primary-foreground/70 text-xs md:text-sm leading-tight mt-0.5 hidden sm:block truncate">
                Private + off-market homes, development sites, and investment opportunities
              </p>
            </div>

            {/* CTA + microcopy + close */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-5 py-2 text-sm font-medium border rounded transition-all duration-200 hover:bg-[hsl(var(--gold))] hover:text-white hero-cta-btn"
                  style={{ fontFamily: '"Cinzel", serif', borderColor: 'hsl(var(--gold))', color: '#fff' }}>
                  GET ACCESS
                </button>
                <span className="text-primary-foreground/60 text-[11px] tracking-wide mt-1 hidden sm:block">
                  Takes 10 seconds · No spam
                </span>
              </div>
              <button
                onClick={dismiss}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                aria-label="Dismiss">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md bg-primary border-[hsl(var(--gold)/0.2)] gap-6 shadow-[0_0_80px_rgba(0,0,0,0.6),0_0_20px_hsl(var(--gold)/0.06)]" style={{ fontFamily: "'Jost', sans-serif" }}>
          {submitted ? (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>Submission Confirmed</DialogTitle>
                <DialogDescription>Your request has been received.</DialogDescription>
              </DialogHeader>
              <div className="py-10 text-center animate-in fade-in duration-300">
                {/* Logo — refined supporting element */}
                <div className="relative mx-auto w-fit mb-10">
                  <div className="absolute inset-0 blur-3xl opacity-10 bg-[hsl(var(--gold))] rounded-full scale-150" />
                  <img src={echelonLogo} alt="Echelon Property Group" className="relative h-[8rem] w-auto mx-auto drop-shadow-[0_0_20px_hsl(var(--gold)/0.1)]"
                    loading="lazy" decoding="async"
                    />
                </div>

                {/* Gold divider */}
                <div className="flex items-center justify-center gap-4 mb-10">
                  <div className="h-px w-8 bg-gradient-to-r from-transparent to-[hsl(var(--gold)/0.4)]" />
                  <div className="w-1 h-1 rounded-full bg-[hsl(var(--gold)/0.4)]" />
                  <div className="h-px w-8 bg-gradient-to-l from-transparent to-[hsl(var(--gold)/0.4)]" />
                </div>

                {/* Headline — primary focal point */}
                <p className="text-white font-display text-[2rem] tracking-[-0.02em] leading-none mb-6 drop-shadow-[0_0_12px_rgba(255,255,255,0.06)]">
                  You're In
                </p>

                {/* Body */}
                <p className="text-white/[0.85] text-sm font-normal leading-[1.8] max-w-[280px] mx-auto mb-7">
                  Thanks — I've got your request.<br />
                  I'll personally send you opportunities aligned with what you're looking for.
                </p>

                {/* Subtext */}
                <p className="text-[hsl(var(--gold)/0.7)] text-[11px] tracking-[0.22em] font-light mb-3">
                  Discreet. Curated. No spam.
                </p>

                {/* Micro-trust */}
                <p className="text-white/[0.38] text-[10px] tracking-[0.15em] mb-12">
                  Expect a quick follow-up.
                </p>

                {/* CTA */}
                <button
                  onClick={() => { setModalOpen(false); dismiss(); }}
                  className="inline-flex items-center gap-2 px-12 py-3.5 text-[11px] tracking-[0.2em] uppercase font-medium text-white/90 border border-white/30 rounded transition-all duration-300 hover:bg-[hsl(var(--gold))] hover:border-[hsl(var(--gold))] hover:text-white hover:shadow-[0_0_24px_hsl(var(--gold)/0.25)] hero-cta-btn">
                  Continue <span className="text-[10px]">→</span>
                </button>
              </div>
            </>
          ) : (
          <>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-primary-foreground text-xl">
              Get Access to Private Listings in Austin
            </DialogTitle>
            <DialogDescription className="text-primary-foreground/70">
              See off-market homes and investment opportunities handpicked for you before they hit Zillow.
            </DialogDescription>
            <p className="text-[hsl(var(--gold))] text-xs tracking-widest uppercase font-medium mt-1">
            </p>
          </DialogHeader>

          {submitError ? (
            <div className="py-8 text-center space-y-5">
              <div className="space-y-3">
                <p className="text-primary-foreground font-display text-2xl">
                  Something Went Wrong
                </p>
                <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs mx-auto">
                  Please try again in a moment.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitError(false)}
                  className="px-8 py-2.5 text-sm font-medium text-primary-foreground border border-primary-foreground/30 rounded transition-all duration-200 hover:bg-[hsl(var(--gold))] hover:border-[hsl(var(--gold))] hover:text-white hero-cta-btn">
                  TRY AGAIN
                </button>
              </div>
            </div>
          ) : (
          <>
            {/* Value bullets */}
            <div className="flex flex-col gap-2.5 mt-2 mb-4">
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <span className="text-[hsl(var(--gold))]">✔</span> Off-market homes
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <span className="text-[hsl(var(--gold))]">✔</span> Development + investment deals
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <span className="text-[hsl(var(--gold))]">✔</span> Sent directly to you
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-primary-foreground/80 text-sm font-medium">
                Where should we send your curated listings?
              </p>
              <div>
                <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                {errors.name &&
              <p className="text-destructive text-xs mt-1">{errors.name}</p>
              }
              </div>
              <div>
                <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                {errors.email &&
              <p className="text-destructive text-xs mt-1">{errors.email}</p>
              }
              </div>
              <div>
                <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatPhoneNumber(e.target.value) })}
                maxLength={20}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
                {errors.phone &&
              <p className="text-destructive text-xs mt-1">{errors.phone}</p>
              }
              </div>
              <div>
                <input
                type="text"
                placeholder="Budget, areas, property type (optional)"
                value={form.lookingFor}
                onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
                maxLength={200}
                className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded text-primary-foreground placeholder:text-primary-foreground/40 text-sm focus:outline-none focus:border-[hsl(var(--gold))] transition-colors" />
              </div>
              <div className="pt-2">
                <button
                type="submit"
                disabled={submitting}
                className="w-full px-5 py-3 text-sm font-medium text-primary-foreground border border-primary-foreground rounded transition-all duration-200 hover:bg-[hsl(var(--gold))] hover:border-[hsl(var(--gold))] hover:text-white disabled:opacity-50 hero-cta-btn">
                  {submitting ? "Submitting…" : "GET ACCESS"}
                </button>
              </div>
              <p className="text-primary-foreground/40 text-xs text-center">
                No spam. Just relevant opportunities.
              </p>
            </form>
          </>
          )}
          </>
          )}
        </DialogContent>
      </Dialog>

    </>);

};

export default AdvisoryBar;