import { Lock, TrendingDown, TrendingUp } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { isUnlocked, setUnlocked, getUtmParams } from "@/lib/communityUnlock";
import { getTimestamp } from "@/lib/formUtils";

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/26916347/upj5fa0/";

interface LockedReportPreviewProps {
  slug: string;
  communityName: string;
  /** Hash target id of the primary access form to scroll to. */
  formTargetId?: string;
}

interface Metric {
  label: string;
  value: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
}

const DEFAULT_METRICS: Metric[] = [
  { label: "MEDIAN PRICE TREND", value: "+6.2%", trend: "up", hint: "Trailing 12 months" },
  { label: "AVG DAYS ON MARKET", value: "38", trend: "down", hint: "Down from 51 last quarter" },
  { label: "OFF-MARKET ACTIVITY", value: "1 in 4", trend: "flat", hint: "Of recent transactions" },
];

const BLURRED_CARDS: { eyebrow: string; title: string; preview: string }[] = [
  {
    eyebrow: "PRICE SEGMENTATION",
    title: "Where the market is actually clearing",
    preview:
      "$2.4M – $3.1M tier moving fastest · $4M+ tier sitting · entry-level under contract within 12 days on average.",
  },
  {
    eyebrow: "RECENT SALES",
    title: "Last 90 days, mapped to street and lot context",
    preview:
      "12 closed sales · 4 of which never hit MLS · spread across the 78746 corridor with notable outliers near Eanes.",
  },
  {
    eyebrow: "BUYER DEMAND",
    title: "Where pressure is building right now",
    preview:
      "Showings up 22% MoM in the under-$3.5M tier · multiple-offer activity returning · cash share at 41%.",
  },
  {
    eyebrow: "OFF-MARKET INVENTORY",
    title: "What we know is quietly available",
    preview:
      "Six properties currently exposed only to private channels · two value-add · one waterfront-adjacent estate.",
  },
];

const TrendIndicator = ({ trend }: { trend?: Metric["trend"] }) => {
  if (trend === "up") {
    return <TrendingUp className="w-4 h-4 text-gold" aria-hidden />;
  }
  if (trend === "down") {
    return <TrendingDown className="w-4 h-4 text-gold" aria-hidden />;
  }
  return null;
};

/**
 * Conversion-focused locked preview block. Shows three real-feeling
 * top-line metrics plus a 4-card blurred dataset preview. Each card is
 * masked with a soft dark gradient + lock icon and a "Full dataset
 * unlocked after access" affordance. CTAs scroll smoothly to the gate
 * form lower on the page.
 *
 * Hidden once the visitor has unlocked the briefing on this device.
 */
const LockedReportPreview = ({
  slug,
  communityName,
  formTargetId = "unlock-report",
}: LockedReportPreviewProps) => {
  const [unlocked, setUnlockedLocal] = useState(false);
  const [formExpanded, setFormExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUnlockedLocal(isUnlocked(slug));
    const onUnlock = (e: Event) => {
      const detail = (e as CustomEvent<{ slug?: string }>).detail;
      if (detail?.slug === slug) setUnlockedLocal(true);
    };
    window.addEventListener("echelon:community-unlocked", onUnlock as EventListener);
    return () => {
      window.removeEventListener("echelon:community-unlocked", onUnlock as EventListener);
    };
  }, [slug]);

  if (unlocked) return null;

  const handleQuickUnlock = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) || trimmed.length > 255) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    const sourceTag = `Community Report Quick Unlock - ${communityName}`;
    const utm = getUtmParams();

    const dbPromise = supabase.from("community_leads").insert({
      community_slug: slug,
      community_name: communityName,
      first_name: "(quick unlock)",
      last_name: "(quick unlock)",
      email: trimmed,
      phone: "",
      interest: null,
      utm_source: utm.utm_source || null,
      utm_medium: utm.utm_medium || null,
      utm_campaign: utm.utm_campaign || null,
      utm_term: utm.utm_term || null,
      utm_content: utm.utm_content || null,
      referrer: typeof document !== "undefined" ? document.referrer : null,
      page_url: typeof window !== "undefined" ? window.location.href : null,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      source_tag: sourceTag,
    });

    const formData = new URLSearchParams();
    formData.append("first_name", "(quick unlock)");
    formData.append("last_name", "(quick unlock)");
    formData.append("name", "(quick unlock)");
    formData.append("email", trimmed);
    formData.append("phone", "");
    formData.append("interest", "");
    formData.append("source", sourceTag);
    formData.append("community_slug", slug);
    formData.append("community_name", communityName);
    formData.append("page", typeof window !== "undefined" ? window.location.href : "");
    formData.append("timestamp", getTimestamp());
    Object.entries(utm).forEach(([k, v]) => formData.append(k, v));

    const zapPromise = fetch(ZAPIER_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }).catch(() => null);

    await Promise.allSettled([dbPromise, zapPromise]);

    setUnlocked(slug); // Dispatches echelon:community-unlocked event
    setSubmitting(false);
    setUnlockedLocal(true);

    requestAnimationFrame(() => {
      const el = document.getElementById(formTargetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section
      aria-labelledby="locked-report-preview-heading"
      className="py-16 md:py-24 bg-secondary"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl">
            <p className="text-minimal text-gold mb-4 tracking-[0.25em]">
              ECHELON PRIVATE MARKET REPORT
            </p>
            <h2
              id="locked-report-preview-heading"
              className="text-3xl md:text-5xl font-display font-normal text-architectural leading-[1.15] mb-5"
            >
              {communityName} Private Market Report
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A deeper layer of data not visible on public platforms.
            </p>
          </div>

          {/* Visible top-line metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border mt-12">
            {DEFAULT_METRICS.map((m) => (
              <div key={m.label} className="bg-secondary p-7 md:p-8">
                <p className="text-minimal text-muted-foreground tracking-[0.2em] mb-4">
                  {m.label}
                </p>
                <div className="flex items-baseline gap-3">
                  <p className="text-3xl md:text-4xl font-display font-normal text-architectural">
                    {m.value}
                  </p>
                  <TrendIndicator trend={m.trend} />
                </div>
                {m.hint && (
                  <p className="text-sm text-muted-foreground mt-3">{m.hint}</p>
                )}
              </div>
            ))}
          </div>

          {/* Blurred dataset preview grid */}
          <div className="mt-10">
            <p className="text-minimal text-muted-foreground tracking-[0.2em] mb-5 uppercase">
              {communityName} Community Profile
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {BLURRED_CARDS.map((card) => (
                <div
                  key={card.eyebrow}
                  className="relative overflow-hidden border border-border bg-background"
                >
                  {/* Blurred content */}
                  <div
                    aria-hidden
                    className="p-7 md:p-8 select-none pointer-events-none"
                    style={{ filter: "blur(6px)" }}
                  >
                    <p className="text-minimal text-gold mb-3 tracking-[0.15em]">
                      {card.eyebrow}
                    </p>
                    <h3 className="text-xl md:text-2xl font-display font-normal text-architectural mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {card.preview}
                    </p>
                    {/* Faux chart bars to add visual texture under blur */}
                    <div className="mt-6 flex items-end gap-2 h-16">
                      {[60, 80, 45, 95, 70, 55, 88, 40].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gold/40"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Dark gradient overlay */}
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, hsl(var(--background) / 0.35) 0%, hsl(var(--background) / 0.85) 100%)",
                    }}
                  />

                  {/* Lock affordance */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gold/60 mb-4">
                      <Lock className="w-4 h-4 text-gold" aria-hidden />
                    </span>
                    <p className="text-minimal text-gold tracking-[0.2em] mb-2">
                      {card.eyebrow}
                    </p>
                    <p className="text-foreground text-sm md:text-base">
                      {"\n"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA — button morphs into email field on click */}
          <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <p className="text-muted-foreground max-w-xl leading-relaxed">
              Reserved for buyers and sellers actively evaluating {communityName}.<br />
              &nbsp;Instant access. No spam. Updated regularly.
            </p>
            <div className="w-full">
              {!formExpanded ? (
                <button
                  type="button"
                  onClick={() => setFormExpanded(true)}
                  className="inline-flex items-center justify-center px-8 py-4 border border-solid border-[#b9a06c] bg-transparent text-gold tracking-[0.2em] text-sm hover:bg-transparent hover:text-gold transition-colors duration-300 whitespace-nowrap"
                >
                  UNLOCK FULL REPORT
                </button>
              ) : (
                <form
                  onSubmit={handleQuickUnlock}
                  className="w-full animate-fade-in"
                  aria-label={`Unlock ${communityName} private market report`}
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <label htmlFor="locked-report-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="locked-report-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(ev) => setEmail(ev.target.value)}
                      required
                      maxLength={255}
                      disabled={submitting}
                      autoFocus
                      className="flex-1 min-w-0 px-4 py-4 bg-transparent border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-8 py-4 border border-gold text-gold tracking-[0.2em] text-sm hover:bg-gold hover:text-background transition-colors duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "UNLOCKING…" : "GET ACCESS"}
                    </button>
                  </div>
                  {error && (
                    <p className="text-sm text-gold mt-3" role="alert">
                      {error}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-3 tracking-wide">
                    Instant access. No spam. We&apos;ll never share your email.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LockedReportPreview;
