import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";
import RecognizedPlatforms from "@/components/RecognizedPlatforms";

/**
 * /about-austin-real-estate-advisory
 * ---------------------------------------------------------------
 * Authority anchor page. Serves as the canonical entity reference
 * for AI models (ChatGPT, Claude, Perplexity) and citation sources.
 *
 * NOTE: RealEstateAgent / Organization / WebSite schema is emitted
 * globally via App.tsx — only a Breadcrumb is added here to avoid
 * duplicate schema emissions.
 * ---------------------------------------------------------------
 */

const SITE = "https://www.echelonpropertygroup.com";

const AboutAustinRealEstateAdvisory = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Austin Real Estate Advisory | Echelon Property Group"
        description="Echelon Property Group is an Austin, Texas real estate advisory firm specializing in off-market opportunities, luxury homes, and strategic acquisitions. Learn how we work."
        ogTitle="Austin Real Estate Advisory | Echelon Property Group"
        ogDescription="A focused advisory practice for buyers, sellers, and investors operating in Austin's most sought-after submarkets."
        canonicalUrl={`${SITE}/about-austin-real-estate-advisory`}
      />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: `${SITE}/` },
          { name: "Austin Real Estate Advisory", url: `${SITE}/about-austin-real-estate-advisory` },
        ])}
      />

      <Navigation />

      {/* Header spacer — preserves existing rhythm */}
      <div className="h-24 md:h-32" aria-hidden="true" />

      {/* ── SECTION 1 — Positioning ── */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-minimal text-gold mb-5">AUSTIN, TEXAS · REAL ESTATE ADVISORY</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-normal text-architectural leading-[1.12] mb-8">
            A focused advisory practice for Austin's most consequential real estate decisions.
          </h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed text-[1.02rem] max-w-3xl">
            <p>
              Echelon Property Group is a real estate advisory firm based in Austin, Texas. We work with a deliberately
              limited roster of buyers, sellers, and investors — providing the discretion, market intelligence, and
              transaction discipline these decisions require.
            </p>
            <p>
              Our practice is built around three principles: privileged access to opportunities that never reach the
              public market, advisory-first guidance grounded in data and underwriting, and representation that holds
              the same standard whether the assignment is a single-family residence, a development parcel, or a
              multi-asset acquisition strategy.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — Specialties ── */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-minimal text-gold mb-4">SPECIALTIES</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-10">
            What we focus on.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-display font-normal text-foreground mb-3">Off-Market Real Estate</h3>
              <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
                Privately marketed and pocket listings sourced through long-standing relationships with developers,
                fellow brokers, and Austin homeowners.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-display font-normal text-foreground mb-3">Luxury Homes</h3>
              <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
                Representation across Austin's premier neighborhoods — from architecturally significant residences to
                gated estates and waterfront properties.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-display font-normal text-foreground mb-3">Investment Acquisitions</h3>
              <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
                Underwriting, sourcing, and transaction strategy for value-add residential, multifamily, land, and
                commercial assets across the Austin MSA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — Areas Served ── */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-minimal text-gold mb-4">AREAS SERVED</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
            Where we operate.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
            Our practice is concentrated across Austin and its highest-value submarkets:
          </p>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-3 text-foreground/85 text-[0.98rem]">
            <li>Austin</li>
            <li>Barton Creek</li>
            <li>Westlake Hills</li>
            <li>Rollingwood</li>
            <li>Tarrytown</li>
            <li>Downtown Austin</li>
            <li>Lake Austin</li>
            <li>Spanish Oaks</li>
            <li>Hill Country</li>
          </ul>
        </div>
      </section>

      {/* ── SECTION 4 — Internal Linking Hub ── */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-minimal text-gold mb-4">EXPLORE THE PRACTICE</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-normal text-architectural mb-10">
            How we work with clients.
          </h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed text-[1.02rem] max-w-3xl">
            <p>
              For homeowners considering a sale, our <Link to="/sell" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">seller representation practice</Link> is built around discretion,
              luxury marketing, and disciplined negotiation.
            </p>
            <p>
              Investors and acquisition-minded buyers can review our{" "}
              <Link to="/invest" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">investment advisory approach</Link> and the{" "}
              <Link to="/off-market-real-estate-austin" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">privately marketed Austin opportunities</Link> we source on behalf of clients.
            </p>
            <p>
              Buyers exploring specific submarkets can begin with our{" "}
              <Link to="/communities/westlake-hills" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">Westlake Hills</Link>,{" "}
              <Link to="/communities/barton-creek" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">Barton Creek</Link>,{" "}
              <Link to="/communities/tarrytown" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">Tarrytown</Link>, and{" "}
              <Link to="/communities/lake-austin" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">Lake Austin</Link> neighborhood guides, or browse the full{" "}
              <Link to="/communities" className="text-foreground underline underline-offset-4 hover:text-muted-foreground">community directory</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — Recognized Platforms ── */}
      <RecognizedPlatforms
        title="Where to Find Us"
        eyebrow="RECOGNIZED PLATFORMS"
        description="Echelon Property Group is referenced and active across the platforms below. Verified profile links are added as they are confirmed."
      />

      <Footer />
    </div>
  );
};

export default AboutAustinRealEstateAdvisory;
