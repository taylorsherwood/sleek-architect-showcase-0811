import { Link, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { seoCommunityPages } from "@/data/seoCommunityData";
import AboutBlock from "@/components/AboutBlock";

const Footer = lazy(() => import("@/components/Footer"));
const RealScoutListings = lazy(() => import("@/components/RealScoutListings"));

const SITE_URL = "https://www.echelonpropertygroup.com";

function createPageSchema(name: string, slug: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Echelon Property Group",
      "description": `Expert real estate services in ${name}, Austin, Texas. Luxury homes, investment properties, and personalized guidance.`,
      "url": `${SITE_URL}/${slug}`,
      "image": `${SITE_URL}/og-image.png`,
      "telephone": "+1-512-661-3843",
      "email": "taylor@echelonpropertygroup.com",
      "employee": {
        "@type": "Person",
        "name": "Taylor Sherwood",
        "jobTitle": "Certified Luxury Home Marketing Specialist (CLHMS)",
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2105 East MLK Blvd Ste 227",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78702",
        "addressCountry": "US",
      },
      "areaServed": {
        "@type": "Place",
        "name": `${name}, Austin, Texas`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Echelon Property Group",
      "description": `Luxury real estate brokerage serving ${name} and greater Austin, Texas.`,
      "url": `${SITE_URL}/${slug}`,
      "image": `${SITE_URL}/og-image.png`,
      "telephone": "+1-512-661-3843",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2105 East MLK Blvd Ste 227",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78702",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.2672,
        "longitude": -97.7431,
      },
      "priceRange": "$$$",
    },
  ];
}

const SEOCommunityPage = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, "");
  const community = seoCommunityPages.find((c) => c.slug === slug);

  if (!community) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-32 text-center">
          <h1 className="text-4xl font-light text-architectural mb-4">
            Community Not Found
          </h1>
          <Link
            to="/communities"
            className="text-minimal text-foreground hover:text-muted-foreground"
          >
            ← BACK TO COMMUNITIES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={community.metaTitle}
        description={community.metaDescription}
      />
      <SchemaMarkup schema={createFAQSchema(community.faqs)} />
      <SchemaMarkup schema={createPageSchema(community.name, community.slug)} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Communities", url: `${SITE_URL}/communities` },
        { name: `${community.name} Homes for Sale`, url: `${SITE_URL}/${community.slug}` },
      ])} />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Link
              to="/communities"
              className="inline-block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8"
            >
              ← ALL COMMUNITIES
            </Link>
            <p className="text-minimal text-gold mb-4">{community.priceRange}</p>
            <h1 className="text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              {community.name} Homes for Sale in Austin Texas
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Overview */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Overview of {community.name}
              </h2>
              <div className="space-y-4">
                {community.overview.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p.trim()}
                  </p>
                ))}
              </div>
            </section>

            {/* Market */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Real Estate Market in {community.name}
              </h2>
              <div className="space-y-4">
                {community.market.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p.trim()}
                  </p>
                ))}
              </div>
            </section>

            {/* Why Buyers Love */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Why Buyers Love {community.name}
              </h2>
              <div className="space-y-4">
                {community.whyBuyersLove.split("\n\n").map((p, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed">
                    {p.trim()}
                  </p>
                ))}
              </div>
            </section>

            {/* Homes for Sale — RealScout Widget */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Homes for Sale in {community.name}
              </h2>
              <Suspense
                fallback={
                  <div className="min-h-[300px] flex items-center justify-center text-muted-foreground">
                    Loading listings…
                  </div>
                }
              >
                <RealScoutListings
                  heading={`${community.name.toUpperCase()} LISTINGS`}
                  subheading="Available Properties"
                  listingStatus="For Sale"
                />
              </Suspense>
            </section>

            {/* Internal Links */}
            <section className="border border-border p-8">
              <h2 className="text-2xl font-display font-normal text-architectural mb-6">
                Explore Austin Real Estate
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  to="/buy"
                  className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal"
                >
                  → BUYING A HOME IN AUSTIN
                </Link>
                <Link
                  to="/sell"
                  className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal"
                >
                  → SELLING YOUR AUSTIN HOME
                </Link>
                <Link
                  to="/luxury-real-estate-austin"
                  className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal"
                >
                  → AUSTIN LUXURY REAL ESTATE
                </Link>
                <Link
                  to="/off-market-real-estate-austin"
                  className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal"
                >
                  → OFF-MARKET & PRIVATE LISTINGS
                </Link>
                <Link
                  to="/communities"
                  className="text-foreground hover:text-muted-foreground transition-colors duration-300 text-minimal"
                >
                  → ALL AUSTIN COMMUNITIES
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Frequently Asked Questions About {community.name}
              </h2>
              <div className="space-y-6">
                {community.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="text-center py-12 bg-secondary -mx-6 px-6">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Interested in {community.name}?
              </h2>
              <p className="text-muted-foreground mb-8">
                Contact Echelon Property Group for expert guidance on buying or
                selling in {community.name}.
              </p>
              <Link
                to="/contact"
                className="inline-block text-minimal bg-primary text-primary-foreground hover:bg-gold hover:text-white px-10 py-4 transition-colors duration-300"
              >
                CONTACT US
              </Link>
            </section>
          </div>
        </div>
      </article>

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default SEOCommunityPage;
