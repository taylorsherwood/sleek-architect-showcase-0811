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

const formatMonthYear = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric" });

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
          <span
            aria-hidden="true"
            className="hidden md:block self-stretch w-px"
            style={{ background: "rgba(185,160,108,0.45)" }}
          />
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
        <div className="max-w-[980px] mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-20 md:pb-28">
          <div
            className="h-px w-16 mb-8"
            style={{ background: "rgba(185,160,108,0.6)" }}
            aria-hidden="true"
          />
          <p
            className="mb-6"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "10.5px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: GOLD,
            }}
          >
            Private Distribution
          </p>
          <h1
            className="mb-7"
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 500,
              fontSize: "clamp(34px, 5.5vw, 60px)",
              letterSpacing: "0.03em",
              lineHeight: 1.08,
            }}
          >
            Private market intelligence for Austin's most guarded zip codes.
          </h1>
          <p
            className="max-w-[640px]"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "17px",
              lineHeight: 1.65,
              color: "rgba(245,243,239,0.82)",
              fontWeight: 300,
            }}
          >
            A confidential brief distributed monthly to a narrow audience of buyers, sellers, and capital allocators. Off-MLS inventory, pre-market introductions, and advisory commentary on the corridors that move privately.
          </p>
        </div>
      </section>

      {featured && (
        <section className="w-full" style={{ background: PAPER }}>
          <div className="max-w-[980px] mx-auto px-6 md:px-12 py-20 md:py-28">
            <p
              className="mb-5"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10.5px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: GOLD_DEEP,
              }}
            >
              Current Edition · {formatMonthYear(featured.publishedAt)}
            </p>
            <Link to={`/private-distribution/${featured.slug}`} className="group block">
              <h2
                className="mb-5 max-w-[760px]"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontWeight: 500,
                  fontSize: "clamp(28px, 4vw, 44px)",
                  letterSpacing: "0.025em",
                  lineHeight: 1.15,
                  color: NAVY,
                }}
              >
                {featured.title} — {featured.market}
              </h2>
              <p
                className="max-w-[640px] mb-7"
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontStyle: "italic",
                  fontSize: "17px",
                  lineHeight: 1.7,
                  color: NAVY,
                  opacity: 0.7,
                }}
              >
                {featured.subtitle}
              </p>
              <span
                className="inline-flex items-center gap-3"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: GOLD_DEEP,
                  borderBottom: `1px solid rgba(185,160,108,0.4)`,
                  paddingBottom: "6px",
                }}
              >
                Read this edition →
              </span>
            </Link>
          </div>
        </section>
      )}

      {archive.length > 0 && (
        <section className="w-full" style={{ background: "#FFFFFF" }}>
          <div className="max-w-[980px] mx-auto px-6 md:px-12 py-20 md:py-24">
            <p
              className="mb-9"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10.5px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: GOLD_DEEP,
              }}
            >
              Archive
            </p>
            <ul style={{ borderTop: `1px solid ${RULE}` }}>
              {archive.map((e) => (
                <li key={e.slug} style={{ borderBottom: `1px solid ${RULE}` }}>
                  <Link
                    to={`/private-distribution/${e.slug}`}
                    className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-3 md:gap-10 py-6"
                  >
                    <span
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "11px",
                        letterSpacing: "0.22em",
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
                        fontSize: "20px",
                        color: NAVY,
                      }}
                    >
                      {e.title} — {e.market}
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
