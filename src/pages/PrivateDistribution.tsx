import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import PrivateBriefGate from "@/components/private-distribution/PrivateBriefGate";
import BriefSectionBlock from "@/components/private-distribution/BriefSectionBlock";
import {
  PRIVATE_DISTRIBUTION,
  getEditionBySlug,
  getFeaturedEdition,
  type BriefEdition,
} from "@/data/privateDistribution";

const SITE = "https://www.echelonpropertygroup.com";
const NAVY = "#0C0F24";
const PAPER = "#FAFAF8";
const GOLD = "#b9a06c";
const GOLD_DEEP = "#8e7a4a";
const RULE = "#d9cfb8";
const MUTED = "#6b6557";

const formatMonthYear = (iso: string) => {
  const [y, m] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

/* ─────────────────────────────────────────────
   Editorial hero — meta strip, oversized watermark,
   centered headline, italic deck.
   ───────────────────────────────────────────── */

const BriefHero = ({ edition }: { edition: BriefEdition }) => (
  <section
    className="relative w-full overflow-hidden"
    style={{ background: PAPER, color: NAVY }}
  >
    {/* Faint editorial grid */}
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(12,15,36,0.04) 1px, transparent 1px)",
        backgroundSize: "minmax(120px, 16.6666%) 100%",
        opacity: 0.6,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, #000 18%, #000 82%, transparent 100%)",
      }}
    />
    {/* Soft top gold wash */}
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[260px] pointer-events-none"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(185,160,108,0.10), transparent 65%)",
      }}
    />

    <div className="max-w-[920px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-16 md:pb-24 relative">
      {/* Oversized watermark */}
      {edition.watermark && (
        <span
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            bottom: "-12px",
            right: "-14px",
            fontFamily: '"Cinzel", serif',
            fontWeight: 400,
            fontSize: "clamp(140px, 26vw, 260px)",
            lineHeight: 0.82,
            letterSpacing: "0.02em",
            color: NAVY,
            opacity: 0.045,
            whiteSpace: "nowrap",
            zIndex: 0,
          }}
        >
          {edition.watermark}
        </span>
      )}

      <div className="relative z-10">
        {/* Top meta rail — confidential ledger feel */}
        <div
          className="flex items-center justify-between pb-5 mb-10"
          style={{ borderBottom: `1px solid rgba(12,15,36,0.12)` }}
        >
          <span
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "9.5px",
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: GOLD_DEEP,
              fontWeight: 500,
            }}
          >
            Echelon · Private Distribution
          </span>
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "9.5px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            Confidential · Not for redistribution
          </span>
        </div>

        {/* Volume / issue / date / market */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-10 md:mb-14">
          {[edition.volume, edition.issueNumber, formatMonthYear(edition.publishedAt), edition.market]
            .filter(Boolean)
            .map((v, i, arr) => (
              <span key={i} className="flex items-center gap-5">
                <span
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10px",
                    letterSpacing: "0.34em",
                    textTransform: "uppercase",
                    color: i === arr.length - 1 ? NAVY : MUTED,
                    fontWeight: i === arr.length - 1 ? 500 : 400,
                  }}
                >
                  {v}
                </span>
                {i < arr.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="h-[3px] w-[3px] rounded-full"
                    style={{ background: GOLD, opacity: 0.7 }}
                  />
                )}
              </span>
            ))}
        </div>

        {/* Headline */}
        <h1
          className="mb-10 md:mb-12"
          style={{
            fontFamily: '"Cinzel", serif',
            fontWeight: 500,
            fontSize: "clamp(34px, 6.4vw, 64px)",
            letterSpacing: "0.04em",
            lineHeight: 1.06,
            color: NAVY,
            maxWidth: "880px",
          }}
        >
          {edition.title}
        </h1>

        {/* Two-column deck + advisory line */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-start">
          <p
            style={{
              fontFamily: '"Cinzel", serif',
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: 1.75,
              color: NAVY,
              opacity: 0.72,
            }}
          >
            {edition.subtitle}
          </p>
          <div
            className="md:text-right"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: GOLD_DEEP,
              fontWeight: 500,
              lineHeight: 1.9,
            }}
          >
            Prepared by
            <span
              className="block mt-1"
              style={{
                fontFamily: '"Cinzel", serif',
                textTransform: "none",
                letterSpacing: "0.05em",
                fontSize: "15px",
                color: NAVY,
                fontWeight: 500,
              }}
            >
              {edition.signOff?.name ?? "Echelon Advisory Desk"}
            </span>
            <span
              className="block mt-1"
              style={{
                color: MUTED,
                fontWeight: 400,
                letterSpacing: "0.26em",
                fontSize: "9.5px",
              }}
            >
              {edition.signOff?.title ?? "Private Market Desk"}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
);


/* ─── Editor's note (public, indexable teaser) ─── */

const FromTheDesk = ({ edition }: { edition: BriefEdition }) => {
  if (!edition.fromTheDesk) return null;
  return (
    <section className="w-full" style={{ background: PAPER }}>
      <div className="max-w-[880px] mx-auto px-6 md:px-12 py-10 md:py-14">
        <div
          className="pl-6 md:pl-7"
          style={{ borderLeft: `1px solid ${GOLD}`, maxWidth: 720 }}
        >
          <span
            className="block mb-3"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "10px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: GOLD_DEEP,
              fontWeight: 500,
            }}
          >
            From the Desk
          </span>
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "16.5px",
              lineHeight: 1.85,
              color: NAVY,
              opacity: 0.9,
              fontWeight: 300,
            }}
          >
            {edition.fromTheDesk}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ─── Gated: full sections + how-this-works + sign-off ─── */

const HowThisWorks = ({ text }: { text: string }) => (
  <section className="w-full" style={{ background: PAPER }}>
    <div className="max-w-[820px] mx-auto px-6 md:px-12 py-14 md:py-16">
      <h3
        className="mb-5"
        style={{
          fontFamily: '"Cinzel", serif',
          fontWeight: 500,
          fontSize: "16px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: NAVY,
        }}
      >
        How This Works
      </h3>
      <p
        style={{
          fontFamily: '"Jost", sans-serif',
          fontSize: "16px",
          lineHeight: 1.75,
          color: "#1a1a1a",
          fontWeight: 300,
          maxWidth: 680,
        }}
      >
        {text}
      </p>
    </div>
  </section>
);

const SignOffBlock = ({ edition }: { edition: BriefEdition }) => {
  if (!edition.signOff) return null;
  const s = edition.signOff;
  return (
    <section className="w-full" style={{ background: PAPER }}>
      <div
        className="max-w-[820px] mx-auto px-6 md:px-12 pt-10 md:pt-12 pb-10"
        style={{ borderTop: `3px solid ${NAVY}` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h3
              className="mb-3.5"
              style={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 500,
                fontSize: "16px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: NAVY,
              }}
            >
              Reply to discuss
            </h3>
            <p
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "15px",
                lineHeight: 1.65,
                color: "#1a1a1a",
                fontWeight: 300,
              }}
            >
              Reply to the email this came attached to, or contact directly using the details opposite. Each conversation is held in confidence.
            </p>
          </div>
          <div className="md:text-right">
            <p
              style={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 500,
                fontSize: "18px",
                letterSpacing: "0.06em",
                color: NAVY,
                marginBottom: "6px",
              }}
            >
              {s.name}
            </p>
            <p
              className="mb-4"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              {s.title}
            </p>
            <div
              className="space-y-1.5"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "13px",
                color: NAVY,
                lineHeight: 1.7,
              }}
            >
              {s.phone && (
                <div>
                  <a href={`tel:${s.phone.replace(/[^0-9+]/g, "")}`} style={{ color: NAVY, borderBottom: `1px solid ${GOLD}` }}>
                    {s.phone}
                  </a>
                </div>
              )}
              {s.email && (
                <div>
                  <a href={`mailto:${s.email}`} style={{ color: NAVY, borderBottom: `1px solid ${GOLD}` }}>
                    {s.email}
                  </a>
                </div>
              )}
              {s.website && (
                <div>
                  <a href={`https://${s.website}`} target="_blank" rel="noopener noreferrer" style={{ color: NAVY, borderBottom: `1px solid ${GOLD}` }}>
                    {s.website}
                  </a>
                </div>
              )}
              {s.handle && <div style={{ color: NAVY }}>{s.handle}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinePrint = ({ text }: { text: string }) => (
  <section className="w-full" style={{ background: PAPER }}>
    <div
      className="max-w-[820px] mx-auto px-6 md:px-12 pt-5 pb-14 md:pb-20"
      style={{ borderTop: `1px solid ${RULE}` }}
    >
      <p
        className="text-center"
        style={{
          fontFamily: '"Jost", sans-serif',
          fontSize: "9.5px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: MUTED,
          lineHeight: 1.7,
        }}
      >
        {text}
      </p>
    </div>
  </section>
);

const BriefBody = ({ edition }: { edition: BriefEdition }) => (
  <>
    {edition.sections.map((s) => (
      <BriefSectionBlock key={s.id} section={s} />
    ))}
    {edition.howThisWorks && <HowThisWorks text={edition.howThisWorks} />}
    <SignOffBlock edition={edition} />
    {edition.closingNote && <FinePrint text={edition.closingNote} />}
  </>
);

/* ─────────────────────────────────────────────
   Single-edition view
   ───────────────────────────────────────────── */

const PrivateDistributionEdition = ({ edition }: { edition: BriefEdition }) => {
  const storageKey = `echelon_private_distribution_${edition.slug}`;
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(storageKey)) setUnlocked(true);
    } catch {
      /* ignore */
    }
    const onUnlock = (e: Event) => {
      const detail = (e as CustomEvent<{ slug: string }>).detail;
      if (detail?.slug === edition.slug) setUnlocked(true);
    };
    window.addEventListener("echelon:private-distribution-unlocked", onUnlock);
    return () =>
      window.removeEventListener(
        "echelon:private-distribution-unlocked",
        onUnlock
      );
  }, [edition.slug, storageKey]);

  const canonical = `${SITE}/private-distribution/${edition.slug}`;

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <SEOHead
        title={`${edition.title} — ${edition.market}`}
        description={edition.subtitle}
        canonical={canonical}
        ogType="article"
        noindex
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: `${SITE}/` },
          { name: "Private Distribution", url: `${SITE}/private-distribution` },
          { name: edition.title, url: canonical },
        ])}
      />

      <Navigation />
      <BriefHero edition={edition} />
      <FromTheDesk edition={edition} />

      {unlocked ? (
        <BriefBody edition={edition} />
      ) : (
        <PrivateBriefGate
          editionSlug={edition.slug}
          editionTitle={`${edition.title} — ${edition.edition}`}
          onUnlock={() => setUnlocked(true)}
        />
      )}

      {unlocked && edition.pdfUrl && (
        <section className="w-full" style={{ background: NAVY }}>
          <div className="max-w-[820px] mx-auto px-6 md:px-12 py-14 text-center">
            <a
              href={edition.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 500,
                color: GOLD,
                borderBottom: `1px solid rgba(185,160,108,0.4)`,
                paddingBottom: "6px",
              }}
            >
              Download Print Edition (PDF) →
            </a>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

/* ─────────────────────────────────────────────
   Index view — lists current edition + archive
   ───────────────────────────────────────────── */

const PrivateDistributionIndex = () => {
  const editions = useMemo(
    () => PRIVATE_DISTRIBUTION.filter((e) => e.active !== false),
    []
  );
  const featured = editions[0];
  const archive = editions.slice(1);
  const canonical = `${SITE}/private-distribution`;

  return (
    <div className="min-h-screen" style={{ background: PAPER }}>
      <SEOHead
        title="Private Distribution — Austin Private Market Intelligence"
        description="A recurring private brief on Austin's most guarded zip codes — off-market trades, pocket inventory, and advisory commentary for qualified buyers and sellers."
        canonical={canonical}
        noindex
      />
      <Navigation />

      <section
        className="relative w-full overflow-hidden"
        style={{ background: NAVY, color: PAPER }}
      >
        {/* Ultra-subtle paper grain across navy */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 0.94  0 0 0 0 0.82  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
            backgroundSize: "220px 220px",
            opacity: 0.18,
            mixBlendMode: "overlay",
          }}
        />
        {/* Faint diagonal grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,243,239,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,243,239,0.02) 1px, transparent 1px)",
            backgroundSize: "140px 140px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 30% 45%, #000 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 30% 45%, #000 30%, transparent 100%)",
          }}
        />
        {/* Warm spotlight glow behind headline */}
        <div
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{
            top: "18%",
            left: "-8%",
            width: "780px",
            height: "560px",
            background:
              "radial-gradient(ellipse, rgba(185,160,108,0.14), rgba(185,160,108,0.045) 40%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        {/* Oversized watermark — embedded, blurred */}
        <span
          aria-hidden="true"
          className="absolute pointer-events-none select-none hidden md:block"
          style={{
            bottom: "-60px",
            left: "-40px",
            fontFamily: '"Cinzel", serif',
            fontSize: "clamp(180px, 30vw, 360px)",
            lineHeight: 0.82,
            letterSpacing: "0.02em",
            color: PAPER,
            opacity: 0.014,
            whiteSpace: "nowrap",
            filter: "blur(1.5px)",
          }}
        >
          Private
        </span>

        <div className="relative max-w-[1180px] mx-auto px-6 md:px-12 pt-36 md:pt-56 pb-28 md:pb-44">



          {/* Asymmetric editorial composition */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-20 md:gap-y-0 md:gap-x-12">
            {/* LEFT — headline & deck (cols 1-8) */}
            <div className="md:col-span-8 md:pr-6">
              <div className="flex items-center gap-3 mb-8">
                <span
                  className="h-px w-10"
                  style={{ background: GOLD, opacity: 0.7 }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10px",
                    letterSpacing: "0.36em",
                    textTransform: "uppercase",
                    color: GOLD,
                    fontWeight: 500,
                  }}
                >
                  Private Market Intelligence
                </span>
              </div>
              <h1
                className="mb-10 max-w-[14ch]"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 500,
                  fontSize: "clamp(34px, 5.2vw, 60px)",
                  letterSpacing: "0.035em",
                  lineHeight: 1.02,
                }}
              >
                Private market intelligence for Austin's most guarded zip codes.
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-6 gap-y-4 items-start max-w-[640px]">
                <span
                  aria-hidden="true"
                  className="hidden md:block mt-3 h-px w-10"
                  style={{ background: "rgba(185,160,108,0.55)" }}
                />
                <p
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontStyle: "italic",
                    fontSize: "17px",
                    lineHeight: 1.75,
                    color: "rgba(245,243,239,0.74)",
                    fontWeight: 400,
                  }}
                >
                  {featured?.subtitle ??
                    "A confidential brief distributed monthly to a narrow audience of buyers, sellers, and capital allocators."}
                </p>
              </div>

              {/* Pull-stat treatment */}
              <div
                className="mt-14 md:mt-20 inline-flex items-end gap-5 pl-5"
                style={{ borderLeft: `1px solid rgba(185,160,108,0.45)` }}
              >
                <span
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontWeight: 500,
                    fontSize: "clamp(38px, 4.4vw, 54px)",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    color: PAPER,
                  }}
                >
                  ≈ 68%
                </span>
                <span
                  className="pb-2 max-w-[220px]"
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10.5px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(245,243,239,0.55)",
                    lineHeight: 1.6,
                  }}
                >
                  of featured opportunities transact before reaching the open market
                </span>
              </div>
            </div>

            {/* RIGHT — metadata panel (cols 10-12), pushed down */}
            <div className="hidden md:block md:col-span-4 md:col-start-10 md:pt-40">
              <div className="relative">
                {/* Layered transparency panel */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-x-5 -inset-y-6 pointer-events-none"
                  style={{
                    background: "rgba(245,243,239,0.018)",
                    border: "1px solid rgba(245,243,239,0.05)",
                  }}
                />
                {/* Registration crosshairs */}
                {[
                  { top: -10, left: -10 },
                  { top: -10, right: -10 },
                  { bottom: -10, left: -10 },
                  { bottom: -10, right: -10 },
                ].map((p, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="absolute pointer-events-none"
                    style={{
                      ...p,
                      width: 9,
                      height: 9,
                    }}
                  >
                    <span
                      className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                      style={{ background: "rgba(185,160,108,0.55)" }}
                    />
                    <span
                      className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
                      style={{ background: "rgba(185,160,108,0.55)" }}
                    />
                  </span>
                ))}

                <div
                  className="relative pl-7 space-y-5"
                  style={{ borderLeft: `1px solid rgba(185,160,108,0.4)` }}
                >
                  <p
                    className="-ml-7 pl-7 pb-3 mb-1"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "9px",
                      letterSpacing: "0.36em",
                      textTransform: "uppercase",
                      color: "rgba(185,160,108,0.85)",
                      borderBottom: "1px solid rgba(245,243,239,0.07)",
                    }}
                  >
                    Memorandum · Section Index
                  </p>
                  {[
                    { i: "I", k: "Frequency", v: "Monthly · Recurring" },
                    { i: "II", k: "Audience", v: "Qualified · Narrow" },
                    { i: "III", k: "Format", v: "Off-MLS · Advisory" },
                    { i: "IV", k: "Origin", v: "Austin, TX" },
                  ].map((row) => (
                    <div key={row.k} className="grid grid-cols-[18px_1fr] gap-x-3">
                      <span
                        style={{
                          fontFamily: '"Cinzel", serif',
                          fontSize: "10px",
                          letterSpacing: "0.18em",
                          color: "rgba(185,160,108,0.75)",
                          paddingTop: "2px",
                        }}
                      >
                        {row.i}
                      </span>
                      <div>
                        <p
                          style={{
                            fontFamily: '"Jost", sans-serif',
                            fontSize: "9px",
                            letterSpacing: "0.32em",
                            textTransform: "uppercase",
                            color: "rgba(185,160,108,0.85)",
                            marginBottom: "4px",
                          }}
                        >
                          {row.k}
                        </p>
                        <p
                          style={{
                            fontFamily: '"Cinzel", serif',
                            fontSize: "13.5px",
                            letterSpacing: "0.04em",
                            color: PAPER,
                            fontWeight: 400,
                          }}
                        >
                          {row.v}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="relative w-full" style={{ background: PAPER }}>
          {/* Soft top gold rule across panel */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(185,160,108,0.4), transparent)",
            }}
          />
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-28">
            <div className="flex items-center gap-3 mb-10">
              <span
                className="h-px w-10"
                style={{ background: GOLD, opacity: 0.7 }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "10.5px",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: GOLD_DEEP,
                  fontWeight: 500,
                }}
              >
                CURRENT EDITION · MAY 2026
              </span>
            </div>

            <Link
              to={`/private-distribution/${featured.slug}`}
              className="group block relative"
            >
              <div
                className="relative grid grid-cols-1 md:grid-cols-[1fr_280px] gap-10 md:gap-16 p-8 md:p-12"
                style={{
                  background: "#FFFFFF",
                  border: `1px solid ${RULE}`,
                  transition: "border-color 0.5s ease, transform 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = RULE;
                }}
              >
                {/* Gold corner brackets */}
                {[
                  { top: -1, left: -1, borderTop: true, borderLeft: true },
                  { top: -1, right: -1, borderTop: true, borderRight: true },
                  { bottom: -1, left: -1, borderBottom: true, borderLeft: true },
                  { bottom: -1, right: -1, borderBottom: true, borderRight: true },
                ].map((c, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="absolute w-4 h-4 pointer-events-none"
                    style={{
                      top: c.top,
                      left: c.left,
                      right: c.right,
                      bottom: c.bottom,
                      borderTop: c.borderTop ? `1px solid ${GOLD}` : undefined,
                      borderLeft: c.borderLeft ? `1px solid ${GOLD}` : undefined,
                      borderRight: c.borderRight ? `1px solid ${GOLD}` : undefined,
                      borderBottom: c.borderBottom ? `1px solid ${GOLD}` : undefined,
                    }}
                  />
                ))}

                <div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                    {[featured.issueNumber, formatMonthYear(featured.publishedAt), featured.market]
                      .filter(Boolean)
                      .map((v, i, arr) => (
                        <span key={i} className="flex items-center gap-4">
                          <span
                            style={{
                              fontFamily: '"Jost", sans-serif',
                              fontSize: "9.5px",
                              letterSpacing: "0.32em",
                              textTransform: "uppercase",
                              color: MUTED,
                            }}
                          >
                            {v}
                          </span>
                          {i < arr.length - 1 && (
                            <span
                              aria-hidden="true"
                              className="h-[3px] w-[3px] rounded-full"
                              style={{ background: GOLD, opacity: 0.7 }}
                            />
                          )}
                        </span>
                      ))}
                  </div>
                  <h2
                    className="mb-5 max-w-[680px]"
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontWeight: 500,
                      fontSize: "clamp(26px, 3.6vw, 40px)",
                      letterSpacing: "0.03em",
                      lineHeight: 1.15,
                      color: NAVY,
                    }}
                  >
                    {featured.title}
                  </h2>
                  <p
                    className="max-w-[600px] mb-8"
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontStyle: "italic",
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: NAVY,
                      opacity: 0.7,
                    }}
                  >
                    {featured.subtitle}
                  </p>
                  <span
                    className="inline-flex items-center gap-3 transition-colors"
                    style={{
                      fontFamily: '"Jost", sans-serif',
                      fontSize: "11px",
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      fontWeight: 500,
                      color: GOLD_DEEP,
                      borderBottom: `1px solid ${GOLD}`,
                      paddingBottom: "5px",
                    }}
                  >
                    Read this edition →
                  </span>
                </div>

                <div
                  className="md:border-l md:pl-10 space-y-5"
                  style={{ borderColor: RULE }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "9px",
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        color: GOLD_DEEP,
                        marginBottom: "5px",
                      }}
                    >
                      Inside this edition
                    </p>
                    <p
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: "13.5px",
                        letterSpacing: "0.04em",
                        color: NAVY,
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      {featured.sections.reduce((n, s: any) => n + (s.properties?.length || s.watching?.length || 0), 0)} opportunities
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "9px",
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        color: GOLD_DEEP,
                        marginBottom: "5px",
                      }}
                    >
                      Distribution
                    </p>
                    <p
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: "13.5px",
                        letterSpacing: "0.04em",
                        color: NAVY,
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      Private · Gated
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "9px",
                        letterSpacing: "0.32em",
                        textTransform: "uppercase",
                        color: GOLD_DEEP,
                        marginBottom: "5px",
                      }}
                    >
                      Prepared by
                    </p>
                    <p
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: "13.5px",
                        letterSpacing: "0.04em",
                        color: NAVY,
                        fontWeight: 500,
                        lineHeight: 1.6,
                      }}
                    >
                      {featured.signOff?.name ?? "Echelon Desk"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {archive.length > 0 && (
        <section
          className="w-full"
          style={{ background: "#FFFFFF", borderTop: `1px solid ${RULE}` }}
        >
          <div className="max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-24">
            <div className="flex items-center gap-3 mb-10">
              <span
                className="h-px w-10"
                style={{ background: GOLD, opacity: 0.7 }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "10.5px",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: GOLD_DEEP,
                  fontWeight: 500,
                }}
              >
                Archive
              </span>
            </div>
            <ul>
              {archive.map((e) => (
                <li key={e.slug} style={{ borderBottom: `1px solid ${RULE}` }}>
                  <Link
                    to={`/private-distribution/${e.slug}`}
                    className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-3 md:gap-10 py-7 group items-center"
                  >
                    <span
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "10.5px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: MUTED,
                      }}
                    >
                      {formatMonthYear(e.publishedAt)}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontWeight: 500,
                        fontSize: "19px",
                        letterSpacing: "0.03em",
                        color: NAVY,
                        transition: "color 0.4s ease",
                      }}
                      className="group-hover:text-[color:#8e7a4a]"
                    >
                      {e.title} — {e.market}
                    </span>
                    <span
                      className="hidden md:inline opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "10px",
                        letterSpacing: "0.28em",
                        textTransform: "uppercase",
                        color: GOLD_DEEP,
                      }}
                    >
                      Open →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}


      <Footer />
    </div>
  );
};

/* ─── Route entry ─── */

const PrivateDistribution = () => {
  const { slug } = useParams<{ slug?: string }>();

  if (!slug) return <PrivateDistributionIndex />;

  const edition = getEditionBySlug(slug);
  if (!edition || edition.active === false) {
    return <Navigate to="/private-distribution" replace />;
  }

  return <PrivateDistributionEdition edition={edition} />;
};

export default PrivateDistribution;
export { getFeaturedEdition };
