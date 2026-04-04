import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema, realEstateAgentSchema } from "@/components/SchemaMarkup";
import { MapPin, Building2, TrendingUp } from "lucide-react";

const opportunities = [
  {
    title: "East Austin Development Site",
    location: "East Austin",
    assetType: "Development Land",
    priceRange: "$2.5M – $4M",
    icon: MapPin,
  },
  {
    title: "Barton Hills Off-Market Estate",
    location: "Barton Hills",
    assetType: "Luxury Residential",
    priceRange: "$3.8M – $5.2M",
    icon: Building2,
  },
  {
    title: "Value-Add Multifamily Opportunity",
    location: "South Austin Corridor",
    assetType: "Multifamily",
    priceRange: "$7M – $12M",
    icon: TrendingUp,
  },
];

const privateOpportunitiesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Austin Real Estate Opportunities",
  description:
    "Exclusive off-market real estate opportunities in Austin, Texas including luxury homes, development sites, and investment properties.",
  provider: {
    "@type": "Organization",
    name: "Echelon Property Group",
    url: "https://www.echelonpropertygroup.com",
  },
  areaServed: {
    "@type": "Place",
    name: "Austin, Texas",
  },
};

const PrivateOpportunitiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Private Austin Opportunities | Echelon Property Group"
        description="Access select off-market homes, development sites, and investment opportunities across Austin through Echelon Property Group's private network."
      />
      <SchemaMarkup schema={privateOpportunitiesSchema} />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Private Opportunities", url: "https://www.echelonpropertygroup.com/private-opportunities" }
      ])} />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--gold)/0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-minimal text-[hsl(var(--gold))] mb-3 tracking-widest">
              PRIVATE ACCESS
            </p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal text-primary-foreground leading-tight mb-5">
              Private Austin Opportunities
            </h1>
            <p className="text-lg text-primary-foreground/60 leading-relaxed max-w-xl mx-auto">
              Thank you. You now have access to select off-market opportunities
              sourced through Echelon Property Group's private network.
            </p>
          </div>
        </div>
      </section>

      {/* Opportunity Cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-minimal text-[hsl(var(--gold))] mb-2 tracking-widest">
                SELECT OPPORTUNITIES
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-foreground">
                Current Private Listings
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {opportunities.map((opp) => (
                <div
                  key={opp.title}
                  className="group bg-card border border-border rounded-lg p-6 hover:shadow-[var(--shadow-elegant)] transition-all duration-500"
                >
                  <opp.icon
                    className="w-6 h-6 mb-4"
                    strokeWidth={1.4}
                    style={{ color: "hsl(var(--gold))" }}
                  />
                  <h3 className="text-lg font-display font-medium text-foreground mb-4">
                    {opp.title}
                  </h3>
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location</span>
                      <span className="text-foreground">{opp.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Asset Type</span>
                      <span className="text-foreground">{opp.assetType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price Range</span>
                      <span className="text-foreground">{opp.priceRange}</span>
                    </div>
                  </div>
                  <a
                    href="mailto:taylor@echelonpropertygroup.com?subject=Private Opportunity Inquiry"
                    className="inline-block w-full text-center px-4 py-2.5 text-sm tracking-widest uppercase font-medium bg-primary text-primary-foreground rounded hover:bg-[hsl(var(--gold))] hover:text-white transition-all duration-200"
                  >
                    Request Details
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="py-14 md:py-16 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-minimal text-[hsl(var(--gold))] mb-3 tracking-widest">
              NEXT STEP
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-normal text-primary-foreground leading-tight mb-4">
              Ready to Explore Further?
            </h2>
            <p className="text-primary-foreground/60 text-lg leading-relaxed mb-6">
              Schedule a private consultation with our team to discuss these
              opportunities and your investment criteria.
            </p>
            <Link
              to="/contact"
              className="inline-block px-10 py-4 text-sm tracking-widest uppercase font-medium bg-[hsl(var(--gold))] text-primary-foreground hover:bg-white hover:text-[#0C0F24] transition-all duration-200 rounded"
            >
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-display font-normal text-architectural mb-6">
              Explore Austin Real Estate
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ OFF-MARKET REAL ESTATE</Link>
              <Link to="/invest" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ INVESTMENT ADVISORY</Link>
              <Link to="/austin-luxury-homes-for-sale" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN LUXURY HOMES</Link>
              <Link to="/search" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ SEARCH ALL LISTINGS</Link>
              <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ AUSTIN COMMUNITIES</Link>
              <Link to="/land" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">→ LAND & DEVELOPMENT</Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default PrivateOpportunitiesPage;
