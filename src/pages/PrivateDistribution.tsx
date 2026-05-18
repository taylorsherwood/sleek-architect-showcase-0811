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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

/* ─────────────────────────────────────────────
   Editorial hero
   ───────────────────────────────────────────── */

const BriefHero = ({ edition }: { edition: BriefEdition }) => (
  <section
    className="relative w-full overflow-hidden"
    style={{ background: "#0C0F24", color: "#F5F3EF" }}
  >
    <div className="max-w-[980px] mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28">
      <div
        className="h-px w-16 mb-8"
        style={{ background: "rgba(184,160,109,0.6)" }}
        aria-hidden="true"
      />
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
        <p
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "10.5px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#b9a06c",
          }}
        >
          Private Distribution · {edition.issueNumber}
        </p>
        <p
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: "10.5px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,243,239,0.55)",
          }}
        >
          {edition.market} · {formatDate(edition.publishedAt)}
        </p>
      </div>
      <h1
        className="font-display text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] mb-8"
        style={{ fontWeight: 400, letterSpacing: "0.005em" }}
      >
        {edition.title}
      </h1>
      <p
        className="max-w-[640px] text-[17px] md:text-[20px] leading-[1.55]"
        style={{
          fontFamily: '"Jost", sans-serif',
          color: "rgba(245,243,239,0.85)",
          fontWeight: 300,
        }}
      >
        {edition.subtitle}
      </p>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Teaser (always public, indexable)
   ───────────────────────────────────────────── */

const BriefTeaser = ({ edition }: { edition: BriefEdition }) => (
  <section className="w-full" style={{ background: "#F5F3EF" }}>
    <div className="max-w-[760px] mx-auto px-6 md:px-10 py-20 md:py-28">
      <p
        className="font-display text-[22px] md:text-[26px] leading-[1.55] mb-10"
        style={{ color: "#0C0F24", fontWeight: 400, fontStyle: "italic" }}
      >
        {edition.dek}
      </p>
      <div className="space-y-7">
        {edition.teaserParagraphs.map((p, i) => (
          <p
            key={i}
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "16.5px",
              lineHeight: 1.85,
              color: "rgba(12,15,36,0.82)",
              fontWeight: 300,
            }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  </section>
);

/* ─────────────────────────────────────────────
   Locked sections (rendered only after unlock)
   ───────────────────────────────────────────── */

const BriefBody = ({ edition }: { edition: BriefEdition }) => (
  <>
    {edition.sections.map((s) => (
      <BriefSectionBlock key={s.id} section={s} />
    ))}
    {edition.closingNote && (
      <section className="w-full" style={{ background: "#F5F3EF" }}>
        <div className="max-w-[760px] mx-auto px-6 md:px-10 py-14 md:py-20">
          <div
            className="h-px w-12 mb-6"
            style={{ background: "rgba(184,160,109,0.5)" }}
            aria-hidden="true"
          />
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "13.5px",
              lineHeight: 1.85,
              color: "rgba(12,15,36,0.6)",
              fontWeight: 300,
              fontStyle: "italic",
            }}
          >
            {edition.closingNote}
          </p>
        </div>
      </section>
    )}
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
    <div className="min-h-screen" style={{ background: "#F5F3EF" }}>
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
      <BriefTeaser edition={edition} />

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
        <section className="w-full" style={{ background: "#0C0F24" }}>
          <div className="max-w-[760px] mx-auto px-6 md:px-10 py-14 text-center">
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
                color: "#b9a06c",
                borderBottom: "1px solid rgba(184,160,109,0.4)",
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
   Index view (lists editions)
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
    <div className="min-h-screen" style={{ background: "#F5F3EF" }}>
      <SEOHead
        title="Private Distribution — Austin Luxury Market Intelligence"
        description="Recurring private market intelligence on Austin's most guarded zip codes. Off-market trades, properties whispered before listing, and advisory commentary for qualified buyers and sellers."
        canonical={canonical}
        noindex
      />
      <Navigation />

      <section
        className="relative w-full overflow-hidden"
        style={{ background: "#0C0F24", color: "#F5F3EF" }}
      >
        <div className="max-w-[980px] mx-auto px-6 md:px-10 pt-36 md:pt-44 pb-20 md:pb-28">
          <div
            className="h-px w-16 mb-8"
            style={{ background: "rgba(184,160,109,0.6)" }}
            aria-hidden="true"
          />
          <p
            className="mb-6"
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: "10.5px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#b9a06c",
            }}
          >
            Private Distribution
          </p>
          <h1
            className="font-display text-[40px] md:text-[60px] leading-[1.05] mb-7"
            style={{ fontWeight: 400, letterSpacing: "0.005em" }}
          >
            Private market intelligence for Austin's most guarded zip codes.
          </h1>
          <p
            className="max-w-[640px] text-[17px] md:text-[19px] leading-[1.6]"
            style={{
              fontFamily: '"Jost", sans-serif',
              color: "rgba(245,243,239,0.82)",
              fontWeight: 300,
            }}
          >
            A confidential, recurring brief distributed privately to a narrow
            audience of buyers, sellers, and capital allocators. Off-market
            trades, properties whispered before listing, and the strategic
            posture of the principals currently active in the field.
          </p>
        </div>
      </section>

      {featured && (
        <section className="w-full" style={{ background: "#F5F3EF" }}>
          <div className="max-w-[980px] mx-auto px-6 md:px-10 py-20 md:py-28">
            <p
              className="mb-5"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10.5px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#b9a06c",
              }}
            >
              Current Edition
            </p>
            <Link to={`/private-distribution/${featured.slug}`} className="group block">
              <h2
                className="font-display text-[30px] md:text-[44px] leading-[1.15] mb-5 max-w-[760px]"
                style={{ color: "#0C0F24", fontWeight: 400 }}
              >
                {featured.title} — {featured.market}
              </h2>
              <p
                className="max-w-[640px] mb-7"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "16.5px",
                  lineHeight: 1.8,
                  color: "rgba(12,15,36,0.78)",
                  fontWeight: 300,
                }}
              >
                {featured.dek}
              </p>
              <span
                className="inline-flex items-center gap-3"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "#b9a06c",
                  borderBottom: "1px solid rgba(184,160,109,0.4)",
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
        <section className="w-full" style={{ background: "#FAFAF8" }}>
          <div className="max-w-[980px] mx-auto px-6 md:px-10 py-20 md:py-24">
            <p
              className="mb-9"
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: "10.5px",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "#b9a06c",
              }}
            >
              Archive
            </p>
            <ul className="divide-y divide-[rgba(12,15,36,0.1)]">
              {archive.map((e) => (
                <li key={e.slug}>
                  <Link
                    to={`/private-distribution/${e.slug}`}
                    className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-3 md:gap-10 py-6 group"
                  >
                    <span
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: "11px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(12,15,36,0.55)",
                      }}
                    >
                      {formatDate(e.publishedAt)}
                    </span>
                    <span
                      className="font-display text-[20px] md:text-[22px]"
                      style={{ color: "#0C0F24", fontWeight: 400 }}
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

/* ─────────────────────────────────────────────
   Route entry
   ───────────────────────────────────────────── */

const PrivateDistribution = () => {
  const { slug } = useParams<{ slug?: string }>();

  if (!slug) {
    return <PrivateDistributionIndex />;
  }

  const edition = getEditionBySlug(slug);
  if (!edition || edition.active === false) {
    return <Navigate to="/private-distribution" replace />;
  }

  return <PrivateDistributionEdition edition={edition} />;
};

export default PrivateDistribution;
export { getFeaturedEdition };
