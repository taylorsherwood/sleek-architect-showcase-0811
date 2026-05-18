import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import PrivateBriefGate from "@/components/private-distribution/PrivateBriefGate";
import BriefSectionBlock from "@/components/private-distribution/BriefSectionBlock";
import { useAuth } from "@/hooks/useAuth";
import {
  PRIVATE_DISTRIBUTION,
  getEditionBySlug,
  getFeaturedEdition,
  type BriefEdition,
} from "@/data/privateDistribution";
import privateCover from "@/assets/private-distribution-cover.jpg";

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

const BriefHero = ({ edition }: { edition: BriefEdition }) => {
  const metaLine = [
    edition.volume,
    edition.issueNumber,
    edition.edition,
    edition.market.split("·").pop()?.trim() || edition.market,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: PAPER, color: NAVY }}
    >
      <div className="max-w-[1180px] mx-auto px-6 md:px-12 pt-36 md:pt-48 pb-16 md:pb-24 relative">
        {/* Top hairline + centered meta strip */}
        <div
          className="pb-8 md:pb-10 mb-16 md:mb-24"
          style={{ borderBottom: `1px solid rgba(12,15,36,0.10)` }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "11px",
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color: MUTED,
              fontWeight: 400,
            }}
          >
            {metaLine}
          </p>
        </div>


        {/* Editorial cover block */}
        <div className="relative">
          {/* Left eyebrow with rule */}
          <div className="flex items-center gap-5 mb-10 md:mb-12">
            <span
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "11px",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                color: GOLD_DEEP,
                fontWeight: 500,
              }}
            >
              Private Distribution
            </span>
            <span
              aria-hidden="true"
              className="h-px flex-1 max-w-[180px]"
              style={{ background: "rgba(12,15,36,0.18)" }}
            />
          </div>

          {/* Title with oversized watermark behind */}
          <div className="relative">
            {edition.watermark && (
              <span
                aria-hidden="true"
                className="absolute pointer-events-none select-none hidden md:block"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 500,
                  fontSize: "clamp(180px, 22vw, 320px)",
                  lineHeight: 1,
                  color: NAVY,
                  opacity: 0.05,
                  right: "-2%",
                  top: "55%",
                  transform: "translateY(-50%)",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {edition.watermark}
              </span>
            )}

            <h1
              className="relative"
              style={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 500,
                fontSize: "clamp(48px, 8.4vw, 116px)",
                letterSpacing: "-0.01em",
                lineHeight: 1.02,
                color: NAVY,
                maxWidth: "14ch",
              }}
            >
              {edition.title}
            </h1>

            {/* Italic dek floated right */}
            <div className="relative mt-12 md:mt-16 flex md:justify-end">
              <p
                className="md:text-left md:max-w-[440px]"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: 1.7,
                  color: NAVY,
                  opacity: 0.78,
                  letterSpacing: "0.005em",
                }}
              >
                {edition.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


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
  const { isAdmin } = useAuth();
  const [unlocked, setUnlocked] = useState(false);
  const effectiveUnlocked = unlocked || isAdmin;

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

      {effectiveUnlocked ? (
        <BriefBody edition={edition} />
      ) : (
        <PrivateBriefGate
          editionSlug={edition.slug}
          editionTitle={`${edition.title} — ${edition.edition}`}
          onUnlock={() => setUnlocked(true)}
        />
      )}

      {effectiveUnlocked && edition.pdfUrl && (
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

      {/* ───────────── Editorial cover — asymmetric, atmospheric ───────────── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: PAPER, color: NAVY }}
      >
        {/* Whisper-soft gold wash at top */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[220px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(185,160,108,0.07), transparent 70%)",
          }}
        />
        {/* Ultra-faint paper grain across canvas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.05  0 0 0 0 0.06  0 0 0 0 0.14  0 0 0 0.45 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            backgroundSize: "240px 240px",
            opacity: 0.05,
            mixBlendMode: "multiply",
          }}
        />

        <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 pt-32 md:pt-44 pb-16 md:pb-24">
          {/* Top masthead rail */}
          <div
            className="flex items-center justify-between pb-5 mb-12 md:mb-16"
            style={{ borderBottom: `1px solid rgba(12,15,36,0.10)` }}
          >
            <span
              style={{
                fontFamily: '"Cinzel", serif',
                fontSize: "11px",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: NAVY,
                fontWeight: 500,
              }}
            >
              Echelon · Private Distribution
            </span>
            <span
              className="hidden sm:inline"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: MUTED,
              }}
            >
              EST. 2018 AUSTIN · BY INVITATION
            </span>
          </div>

          {/* Asymmetric cover: headline (7) + editorial image (5) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-16 items-start">
            <div className="md:col-span-7 md:pt-10">
              <div className="flex items-center gap-3 mb-8">
                <span
                  aria-hidden="true"
                  className="h-px w-7"
                  style={{ background: GOLD }}
                />
                <span
                  style={{
                    fontFamily: '"Jost", sans-serif',
                    fontSize: "10px",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: GOLD_DEEP,
                    fontWeight: 500,
                  }}
                >
                  Featured Market Intelligence
                </span>
              </div>

              <h1
                className="mb-10"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 500,
                  fontSize: "clamp(36px, 5.6vw, 72px)",
                  letterSpacing: "-0.005em",
                  lineHeight: 0.94,
                  color: NAVY,
                }}
              >
                Quiet markets,
                <br />
                <em
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: GOLD_DEEP,
                    letterSpacing: "0.005em",
                  }}
                >
                  carefully read.
                </em>
              </h1>

              <p
                className="max-w-[460px] mb-12"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "14.5px",
                  lineHeight: 1.85,
                  color: NAVY,
                  opacity: 0.72,
                  fontWeight: 300,
                }}
              >
                A rotating series of advisory briefings on the neighborhoods,
                off-market opportunities, and private collections worth knowing
                about — circulated to a narrow audience.
              </p>

              {/* Inline meta row — tightened utility band */}
              <div
                className="flex flex-wrap items-baseline gap-x-8 gap-y-3 pt-6"
                style={{ borderTop: `1px solid ${RULE}` }}
              >
                {[
                  { k: "Series", v: "Advisory Edition" },
                  { k: "Cadence", v: "Monthly" },
                  { k: "Audience", v: "By Invitation" },
                ].map((row) => (
                  <div key={row.k} className="flex items-baseline gap-2.5">
                    <span
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "9px",
                        letterSpacing: "0.36em",
                        textTransform: "uppercase",
                        color: GOLD_DEEP,
                        fontWeight: 500,
                      }}
                    >
                      {row.k}
                    </span>
                    <span
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontSize: "12px",
                        letterSpacing: "0.04em",
                        color: NAVY,
                      }}
                    >
                      {row.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right editorial image — asymmetric, framed, slightly offset */}
            <div className="md:col-span-5 relative md:-mt-2">
              <div className="relative md:translate-x-3">
                {/* Slim gold register lines — top-left & bottom-right only */}
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -left-2 w-5 h-px"
                  style={{ background: GOLD }}
                />
                <span
                  aria-hidden="true"
                  className="absolute -top-2 -left-2 h-5 w-px"
                  style={{ background: GOLD }}
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 w-5 h-px"
                  style={{ background: GOLD }}
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 -right-2 h-5 w-px"
                  style={{ background: GOLD }}
                />

                <div
                  className="relative overflow-hidden"
                  style={{
                    aspectRatio: "4 / 5",
                    background: NAVY,
                  }}
                >
                  <img
                    src={privateCover}
                    alt=""
                    width={1024}
                    height={1280}
                    className="absolute inset-0 w-full h-full object-cover will-change-transform"
                    style={{
                      filter:
                        "grayscale(0.28) contrast(0.92) brightness(1.02) sepia(0.08) saturate(0.92)",
                      animation: "pdCoverDrift 36s ease-in-out infinite alternate",
                    }}
                  />
                  {/* Warm tone wash */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none mix-blend-multiply"
                    style={{
                      background:
                        "linear-gradient(160deg, rgba(245,238,222,0.18), rgba(12,15,36,0.0) 45%, rgba(12,15,36,0.32))",
                    }}
                  />
                  {/* Film grain — fine, warm */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='g'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.96  0 0 0 0 0.88  0 0 0 0 0.74  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23g)'/></svg>\")",
                      backgroundSize: "180px 180px",
                      opacity: 0.22,
                      mixBlendMode: "overlay",
                    }}
                  />
                  {/* Caption — bottom-left */}
                  <div className="absolute left-5 bottom-5 right-5">
                    <p
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "9px",
                        letterSpacing: "0.4em",
                        textTransform: "uppercase",
                        color: "rgba(245,243,239,0.88)",
                        fontWeight: 500,
                      }}
                    >
                      Plate · {String(editions.length).padStart(2, "0")} / {String(editions.length).padStart(2, "0")}
                    </p>
                    <p
                      className="mt-1.5"
                      style={{
                        fontFamily: '"Cinzel", serif',
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "11.5px",
                        letterSpacing: "0.02em",
                        color: "rgba(245,243,239,0.82)",
                      }}
                    >
                      From the current edition
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tonal bleed into the next section — smoother flow */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(239,234,224,0.55))",
            }}
          />
        </div>

        {/* Subtle drift keyframes — slow, premium, never flashy */}
        <style>{`
          @keyframes pdCoverDrift {
            0%   { transform: scale(1.04) translate3d(0, 0, 0); }
            100% { transform: scale(1.07) translate3d(-1.2%, -1.2%, 0); }
          }
          @media (prefers-reduced-motion: reduce) {
            [style*="pdCoverDrift"] { animation: none !important; transform: scale(1.04); }
          }
        `}</style>
      </section>

      {/* ───────────── Market Pulse — focal tonal band, asymmetric ───────────── */}
      <section
        className="relative w-full"
        style={{
          background: "#EFEAE0",
          borderBottom: `1px solid ${RULE}`,
        }}
      >
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-16 items-end">
          <div className="md:col-span-5 md:col-start-1">
            <p
              className="mb-5"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10px",
                letterSpacing: "0.38em",
                textTransform: "uppercase",
                color: GOLD_DEEP,
                fontWeight: 500,
              }}
            >
              Market Pulse
            </p>
            <p
              style={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 500,
                fontSize: "clamp(72px, 9vw, 124px)",
                lineHeight: 0.9,
                letterSpacing: "-0.01em",
                color: NAVY,
              }}
            >
              ~68
              <em
                style={{
                  color: GOLD_DEEP,
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: 0,
                }}
              >
                %
              </em>
            </p>
            <p
              className="mt-5 max-w-[300px]"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "11.5px",
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: MUTED,
                lineHeight: 1.75,
                fontWeight: 400,
              }}
            >
              of featured opportunities transact before reaching the open market
            </p>
          </div>

          <div
            className="md:col-span-6 md:col-start-7 md:pl-12 md:border-l"
            style={{ borderColor: RULE }}
          >
            <p
              style={{
                fontFamily: '"Cinzel", serif',
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(19px, 1.95vw, 24px)",
                lineHeight: 1.55,
                color: NAVY,
                letterSpacing: "0.005em",
                opacity: 0.92,
              }}
            >
              “The most considered trades in Austin rarely surface in public.
              They are introduced — quietly, deliberately, between people who
              already know each other's standards.”
            </p>
            <p
              className="mt-7"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10px",
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: GOLD_DEEP,
                fontWeight: 500,
              }}
            >
              — From the Editor's Desk
            </p>
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
                Current Edition · {formatMonthYear(featured.publishedAt)}
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
