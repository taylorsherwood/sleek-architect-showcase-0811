import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, createBreadcrumbSchema } from "@/components/SchemaMarkup";
import { communityPages } from "@/data/communityData";

const SITE_URL = "https://www.echelonpropertygroup.com";

function createCommunitySchema(community: { name: string; slug: string; metaDescription: string }) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Echelon Property Group",
      "description": `Expert real estate services in ${community.name}, Austin, Texas. Luxury homes, investment properties, and personalized guidance.`,
      "url": `${SITE_URL}/communities/${community.slug}`,
      "image": `${SITE_URL}/og-image.png`,
      "telephone": "+1-512-661-3843",
      "email": "taylor@echelonpropertygroup.com",
      "employee": {
        "@type": "Person",
        "name": "Taylor Sherwood",
        "jobTitle": "Certified Luxury Home Marketing Specialist (CLHMS)"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2105 East MLK Blvd Ste 227",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78702",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "Place",
        "name": `${community.name}, Austin, Texas`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Echelon Property Group",
      "description": `Luxury real estate brokerage serving ${community.name} and greater Austin, Texas.`,
      "url": `${SITE_URL}/communities/${community.slug}`,
      "image": `${SITE_URL}/og-image.png`,
      "telephone": "+1-512-661-3843",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "2105 East MLK Blvd Ste 227",
        "addressLocality": "Austin",
        "addressRegion": "TX",
        "postalCode": "78702",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 30.2672,
        "longitude": -97.7431
      },
      "priceRange": "$$$"
    }
  ];
}

/** Renders markdown-like content: ### for H3, - for bullets, paragraphs split by \n\n */
const ContentBlock = ({ text }: { text: string }) => {
  const blocks = text.split('\n\n');
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i} className="text-xl md:text-2xl font-display font-medium text-foreground mt-6 mb-2">
              {trimmed.substring(4)}
            </h3>
          );
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed ml-2">
              {items.map((item, j) => (
                <li key={j}>{item.trim().substring(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-muted-foreground leading-relaxed">{trimmed}</p>
        );
      })}
    </div>
  );
};

const slugAliases: Record<string, string> = {
  "zilker": "zilker-austin",
  "cat-mountain": "cat-mountain-northwest-hills",
  "northwest-hills": "cat-mountain-northwest-hills",
  "downtown-austin-condos": "downtown",
};

const CommunityPage = () => {
  const { slug: rawSlug } = useParams<{ slug: string }>();
  const slug = rawSlug ? (slugAliases[rawSlug] || rawSlug) : rawSlug;
  const community = communityPages.find((c) => c.slug === slug);

  if (!community) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-32 pb-32 text-center">
          <h1 className="text-4xl font-light text-architectural mb-4">Community Not Found</h1>
          <Link to="/communities" className="text-minimal text-foreground hover:text-muted-foreground">← BACK TO COMMUNITIES</Link>
        </div>
      </div>
    );
  }

  const related = communityPages.filter((c) => community.relatedCommunities.includes(c.slug));
  const existingFaqs = community.faqs;

  // Standardized FAQs for every community page
  const standardFaqs = [
    {
      question: `What is it like living in ${community.name} Austin?`,
      answer: `${community.name} is one of Austin's most desirable neighborhoods, offering a blend of luxury living, natural beauty, and convenient access to dining, entertainment, and outdoor recreation. Residents enjoy a high quality of life with strong community character and proximity to central Austin.`,
    },
    {
      question: `What are home prices in ${community.name}?`,
      answer: `Home prices in ${community.name} vary based on size, lot, and location. Current pricing typically falls within the ${community.priceRange} range. Contact Echelon Property Group for a detailed market analysis and current listings.`,
    },
    {
      question: `Are there luxury homes in ${community.name}?`,
      answer: `Yes. ${community.name} features some of Austin's finest luxury properties, including custom-built estates, architecturally significant homes, and premium residences with high-end finishes and desirable lot positions.`,
    },
    {
      question: `What schools serve ${community.name}?`,
      answer: `${community.name} is served by highly regarded public and private schools in the Austin area. School zoning varies by address. Contact Echelon Property Group for specific school boundary information related to properties in ${community.name}.`,
    },
    {
      question: `Is ${community.name} a good investment area?`,
      answer: `${community.name} has demonstrated strong long-term appreciation driven by limited inventory, high demand, and Austin's continued economic growth. The neighborhood remains a top choice for buyers seeking both lifestyle quality and investment value.`,
    },
  ];

  // Merge: existing FAQs first, then standardized ones (skip duplicates by question similarity)
  const existingQuestionLower = new Set(existingFaqs.map(f => f.question.toLowerCase()));
  const dedupedStandard = standardFaqs.filter(
    f => !existingQuestionLower.has(f.question.toLowerCase())
  );
  const allFaqs = [...existingFaqs, ...dedupedStandard];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={community.metaTitle || `${community.name} Homes for Sale | Echelon Property Group`}
        description={`${community.name} homes for sale in Austin, Texas. Explore listings, pricing trends, and neighborhood insights with Echelon Property Group — your luxury real estate advisor.`}
        canonical={`/communities/${community.slug}`}
      />
      <SchemaMarkup schema={createFAQSchema(allFaqs)} />
      <SchemaMarkup schema={createCommunitySchema(community)} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Communities", url: `${SITE_URL}/communities` },
        { name: community.name, url: `${SITE_URL}/communities/${community.slug}` },
      ])} />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <Link to="/communities" className="inline-block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8">
              ← ALL COMMUNITIES
            </Link>
            <p className="text-minimal text-gold mb-4">{community.priceRange}</p>
            <h1 className="text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
              {community.heroTitle || `${community.name} Homes for Sale in Austin Texas`}
            </h1>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {community.image && (
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <img
                src={community.image}
                alt={`Luxury homes in ${community.name} Austin Texas`}
                title={`${community.name} real estate — luxury homes for sale in Austin`}
                className="w-full aspect-[16/9] object-cover"
                loading="eager"
                decoding="async"
                style={{ imageRendering: 'auto' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <article className="pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Overview */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                {community.name} Neighborhood Overview
              </h2>
              <ContentBlock text={community.overview} />
            </section>

            {/* Lifestyle */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Lifestyle in {community.name}
              </h2>
              <ContentBlock text={community.lifestyle} />
            </section>

            {/* Market Insights */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                {community.name} Real Estate Market Insights
              </h2>
              <ContentBlock text={community.marketInsights} />
            </section>

            {/* Amenities & Schools */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Schools and Amenities Near {community.name}
              </h2>
              <ContentBlock text={community.amenitiesAndSchools} />
            </section>

            {/* Investment */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Investment Potential in {community.name}
              </h2>
              <ContentBlock text={community.investmentPotential} />
              <p className="text-muted-foreground leading-relaxed mt-4">
                Some homes in {community.name} present strong renovation or value-add opportunities — <Link to="/invest" className="text-foreground underline hover:text-gold transition-colors">explore our investor-focused approach</Link>.
              </p>
            </section>

            {/* Internal Links */}
            <section className="border border-border p-8">
              <h2 className="text-2xl font-display font-normal text-architectural mb-6">
                Explore Austin Real Estate
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/buy-homes-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → BUY A HOME IN AUSTIN
                </Link>
                <Link to="/sell-home-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → SELL YOUR AUSTIN HOME
                </Link>
                <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → OFF-MARKET & PRIVATE LISTINGS
                </Link>
                <Link to="/best-neighborhoods-in-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → BEST NEIGHBORHOODS IN AUSTIN
                </Link>
                <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → ALL AUSTIN COMMUNITIES
                </Link>
                <Link to="/blog" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → BLOG & MARKET INSIGHTS
                </Link>
                <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → CONTACT ECHELON PROPERTY GROUP
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                Frequently Asked Questions About {community.name}
              </h2>
              <div className="space-y-6">
                {allFaqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Related Communities */}
            {related.length > 0 && (
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                  Explore Nearby Austin Communities
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {related.map((rc) => (
                    <Link
                      key={rc.slug}
                      to={`/communities/${rc.slug}`}
                      className="group border-2 border-border p-6 rounded-lg hover:border-gold transition-colors duration-500"
                    >
                      <p className="text-minimal text-gold mb-2">{rc.priceRange}</p>
                      <h3 className="text-xl font-display font-normal text-architectural group-hover:text-gold transition-colors mb-2">
                        {rc.name}
                      </h3>
                      <p className="text-minimal text-muted-foreground group-hover:text-gold transition-colors duration-500">VIEW COMMUNITY →</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="text-center py-12 bg-secondary -mx-6 px-6">
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Interested in {community.name}?
              </h2>
              <p className="text-muted-foreground mb-8">
                Contact Echelon Property Group for expert guidance on buying or selling in {community.name}.
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
      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default CommunityPage;