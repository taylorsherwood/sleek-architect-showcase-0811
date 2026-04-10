import { lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createFAQSchema, createBreadcrumbSchema, createPlaceSchema } from "@/components/SchemaMarkup";
import { communityPages } from "@/data/communityData";
import { autoLink } from "@/lib/autoLinker";

const SITE_URL = "https://www.echelonpropertygroup.com";

/* Neighborhood Insights — contextual blog links per community */
const neighborhoodInsights: Record<string, { title: string; description: string; href: string }[]> = {
  "tarrytown": [
    { title: "Tarrytown vs Bryker Woods", description: "How these two iconic 78703 neighborhoods compare for lifestyle, pricing, and long-term value.", href: "/blog/tarrytown-vs-bryker-woods" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Tarrytown ranks among Austin's most desirable addresses.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "westlake-hills": [
    { title: "Rollingwood vs Westlake Hills", description: "A side-by-side comparison of two premier west Austin neighborhoods.", href: "/blog/rollingwood-vs-westlake-hills" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Explore how Westlake Hills anchors Austin's luxury landscape.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "rollingwood": [
    { title: "Rollingwood vs Westlake Hills", description: "Compare proximity, lot sizes, and daily lifestyle between these two top communities.", href: "/blog/rollingwood-vs-westlake-hills" },
    { title: "Top Investment Neighborhoods in Austin", description: "Why Rollingwood's limited inventory drives exceptional long-term appreciation.", href: "/blog/top-investment-neighborhoods-austin" },
  ],
  "lake-austin": [
    { title: "Lake Austin vs Lake Travis", description: "Waterfront lifestyles compared — proximity, pricing, and daily experience.", href: "/blog/lake-austin-vs-lake-travis" },
    { title: "Best Waterfront Homes in Austin", description: "A comprehensive look at Austin's lakefront market and what drives value.", href: "/blog/best-waterfront-homes-austin" },
  ],
  "barton-creek": [
    { title: "Living in Barton Creek: What Luxury Buyers Should Know", description: "An insider's guide to country club lifestyle, Eanes ISD schools, and what makes Barton Creek a perennial luxury favorite.", href: "/blog/living-in-barton-creek-austin" },
    { title: "Luxury Lock-and-Leave in Governor's Hill", description: "Inside a fully reimagined residence in one of Barton Creek's most exclusive gated enclaves.", href: "/blog/2300-barton-creek-blvd" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Barton Creek fits within Austin's luxury real estate hierarchy.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "pemberton-heights": [
    { title: "What Makes Pemberton Heights So Desirable?", description: "Distinguished architecture, half-acre lots, and walk-to-downtown convenience in Austin's most prestigious central neighborhood.", href: "/blog/what-makes-pemberton-heights-desirable" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Pemberton Heights' distinguished architecture and central location.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "rob-roy": [
    { title: "Rob Roy: Inside Austin's Most Exclusive Gated Community", description: "Hilltop estates, panoramic views, and three distinct luxury enclaves in Austin's most private address.", href: "/blog/rob-roy-austin-gated-luxury" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Rob Roy's position among Austin's most exclusive addresses.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "bee-cave": [
    { title: "Bee Cave vs Lakeway for Luxury Buyers", description: "A side-by-side comparison of two premier Hill Country communities.", href: "/blog/bee-cave-vs-lakeway-luxury-buyers" },
    { title: "Top Investment Neighborhoods in Austin", description: "Bee Cave's growth trajectory and Lake Travis ISD premium.", href: "/blog/top-investment-neighborhoods-austin" },
  ],
  "steiner-ranch": [
    { title: "Steiner Ranch: Family Living with Lake Austin Views", description: "A comprehensive guide to Austin's most amenity-rich master-planned community.", href: "/blog/steiner-ranch-lake-austin-family-living" },
    { title: "Top Investment Neighborhoods in Austin", description: "Master-planned communities in Austin's luxury landscape.", href: "/blog/top-investment-neighborhoods-austin" },
  ],
  "lakeway": [
    { title: "A Guide to Lakeway: Waterfront and Golf Course Living", description: "Everything buyers need to know about Lake Travis waterfront estates and resort-caliber living.", href: "/blog/guide-to-lakeway-waterfront-golf-living" },
    { title: "Bee Cave vs Lakeway for Luxury Buyers", description: "How Lakeway compares to its nearest Hill Country neighbor.", href: "/blog/bee-cave-vs-lakeway-luxury-buyers" },
  ],
  "travis-heights": [
    { title: "Top Investment Neighborhoods in Austin", description: "Travis Heights' walkability and SoCo proximity make it a top investment play.", href: "/blog/top-investment-neighborhoods-austin" },
    { title: "Moving to Austin from California", description: "Why Travis Heights appeals to buyers relocating from coastal California.", href: "/blog/moving-to-austin-texas-from-california" },
  ],
  "downtown": [
    { title: "Austin Luxury Market Forecast", description: "What the data says about downtown Austin's condo market and pricing trajectory.", href: "/blog/austin-luxury-real-estate-market-forecast" },
    { title: "Moving to Austin — Complete Relocation Guide", description: "Downtown living, cost of living, and what to expect as a new Austin resident.", href: "/blog/moving-to-austin-texas-complete-relocation-guide" },
  ],
  "dripping-springs": [
    { title: "Top Investment Neighborhoods in Austin", description: "Dripping Springs sits on Austin's primary growth corridor — here's why investors are paying attention.", href: "/blog/top-investment-neighborhoods-austin" },
    { title: "Austin Property Taxes Explained", description: "How Hays County tax rates compare and what Hill Country buyers should know.", href: "/blog/austin-property-taxes-explained" },
  ],
  "texas-hill-country-estates": [
    { title: "Best Luxury Neighborhoods in Austin", description: "Ranch estates and vineyard properties in the Texas Hill Country.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "zilker-austin": [
    { title: "Tarrytown vs Bryker Woods", description: "How Zilker's closest neighbors compare for central Austin living.", href: "/blog/tarrytown-vs-bryker-woods" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Central Austin's most walkable neighborhoods and what makes them unique.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "spanish-oaks": [
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Spanish Oaks fits within Austin's gated luxury communities.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Top Investment Neighborhoods in Austin", description: "Hill Country estate communities and their long-term value trajectory.", href: "/blog/top-investment-neighborhoods-austin" },
  ],
  "cat-mountain-northwest-hills": [
    { title: "Best Luxury Neighborhoods in Austin", description: "How Cat Mountain and Northwest Hills serve Austin's luxury market.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Austin Luxury Market Forecast", description: "Market trends shaping pricing in Austin's western neighborhoods.", href: "/blog/austin-luxury-real-estate-market-forecast" },
  ],
  "clarksville": [
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Clarksville fits within Austin's walkable luxury landscape.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Tarrytown vs Bryker Woods", description: "How Clarksville's closest neighbors compare for central Austin living.", href: "/blog/tarrytown-vs-bryker-woods" },
  ],
  "lake-travis": [
    { title: "Lake Austin vs Lake Travis", description: "Waterfront lifestyles compared — proximity, pricing, and daily experience.", href: "/blog/lake-austin-vs-lake-travis" },
    { title: "Best Waterfront Homes in Austin", description: "A comprehensive look at Austin's lakefront market and what drives value.", href: "/blog/best-waterfront-homes-austin" },
  ],
  "mueller": [
    { title: "Best Luxury Neighborhoods in Austin", description: "How Mueller's walkable urban design compares to Austin's traditional luxury neighborhoods.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Top Investment Neighborhoods in Austin", description: "Mueller's master-planned value proposition for investors.", href: "/blog/top-investment-neighborhoods-austin" },
  ],
  "hyde-park": [
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Hyde Park's historic character fits in Austin's luxury landscape.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Moving to Austin — Complete Relocation Guide", description: "What makes Hyde Park appealing for newcomers to Austin.", href: "/blog/moving-to-austin-texas-complete-relocation-guide" },
  ],
  "great-hills": [
    { title: "Best Luxury Neighborhoods in Austin", description: "Northwest Austin's established neighborhoods and their investment appeal.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Austin Luxury Market Forecast", description: "Market trends for northwest Austin's premier neighborhoods.", href: "/blog/austin-luxury-real-estate-market-forecast" },
  ],
  "balcones-park": [
    { title: "Best Luxury Neighborhoods in Austin", description: "How Balcones Park offers value in Austin's northwest corridor.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Top Investment Neighborhoods in Austin", description: "Large lots and renovation potential in northwest Austin.", href: "/blog/top-investment-neighborhoods-austin" },
  ],
  "rob-roy": [
    { title: "Rollingwood vs Westlake Hills", description: "How Rob Roy's gated luxury compares to neighboring Westlake communities.", href: "/blog/rollingwood-vs-westlake-hills" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Rob Roy's position among Austin's most exclusive addresses.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "steiner-ranch": [
    { title: "Top Investment Neighborhoods in Austin", description: "Steiner Ranch's family-oriented value and Lake Austin proximity.", href: "/blog/top-investment-neighborhoods-austin" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Master-planned communities in Austin's luxury landscape.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "bryker-woods": [
    { title: "Tarrytown vs Bryker Woods", description: "A detailed comparison of two iconic 78703 neighborhoods for lifestyle, pricing, and value.", href: "/blog/tarrytown-vs-bryker-woods" },
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Bryker Woods fits within Austin's central luxury landscape.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "east-austin": [
    { title: "Top Investment Neighborhoods in Austin", description: "Why East Austin's appreciation trajectory makes it one of Austin's top investment plays.", href: "/blog/top-investment-neighborhoods-austin" },
    { title: "Best Luxury Neighborhoods in Austin", description: "How East Austin's modern architecture is reshaping Austin's luxury landscape.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
  ],
  "old-enfield": [
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Old Enfield ranks among Austin's most prestigious addresses.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Tarrytown vs Bryker Woods", description: "How Old Enfield compares to its neighboring 78703 communities.", href: "/blog/tarrytown-vs-bryker-woods" },
  ],
  "davenport-ranch": [
    { title: "Best Luxury Neighborhoods in Austin", description: "Where Davenport Ranch ranks among Austin's gated luxury communities.", href: "/blog/best-luxury-neighborhoods-austin-texas" },
    { title: "Rollingwood vs Westlake Hills", description: "How Davenport Ranch compares to neighboring West Austin enclaves.", href: "/blog/rollingwood-vs-westlake-hills" },
  ],
  "lakeway": [
    { title: "Lake Austin vs Lake Travis", description: "Waterfront lifestyles compared — proximity, pricing, and daily experience.", href: "/blog/lake-austin-vs-lake-travis" },
    { title: "Best Waterfront Homes in Austin", description: "A comprehensive look at Austin's lakefront market and what drives value.", href: "/blog/best-waterfront-homes-austin" },
  ],
};

function createCommunityPlaceSchema(community: { name: string; slug: string; metaDescription: string }) {
  return createPlaceSchema({
    name: community.name,
    slug: community.slug,
    description: community.metaDescription,
  });
}

/** Parses markdown-style [text](/url) links into React elements */
const parseInlineLinks = (text: string): React.ReactNode => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, linkText, href] = match;
    parts.push(
      <Link key={key++} to={href} className="text-foreground underline decoration-[hsl(var(--gold)/0.4)] hover:text-[hsl(var(--gold))] transition-colors duration-300">
        {linkText}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : <>{parts}</>;
};

/** Renders markdown-like content: ### for H3, - for bullets, [text](/url) links, paragraphs split by \n\n.
 *  When `currentSlug` is provided, auto-links community names and key phrases. */
const ContentBlock = ({ text, currentSlug }: { text: string; currentSlug?: string }) => {
  // Apply auto-linking before parsing markdown
  const linked = currentSlug ? autoLink(text, currentSlug) : text;
  const blocks = linked.split('\n\n');
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={i} className="text-xl md:text-2xl font-display font-medium text-foreground mt-6 mb-2">
              {parseInlineLinks(trimmed.substring(4))}
            </h3>
          );
        }
        if (trimmed.startsWith('- ')) {
          const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="list-disc list-inside space-y-1.5 text-muted-foreground leading-relaxed ml-2">
              {items.map((item, j) => (
                <li key={j}>{parseInlineLinks(item.trim().substring(2))}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-muted-foreground leading-relaxed">{parseInlineLinks(trimmed)}</p>
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
  "downtown-austin": "downtown",
  "lake-travis-waterfront": "lake-travis",
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
      <SchemaMarkup schema={createCommunityPlaceSchema(community)} />
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
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
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
              <ContentBlock text={community.overview} currentSlug={community.slug} />
            </section>

            {/* Lifestyle */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Lifestyle in {community.name}
              </h2>
              <ContentBlock text={community.lifestyle} currentSlug={community.slug} />
            </section>

            {/* Market Insights */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                {community.name} Real Estate Market Insights
              </h2>
              <ContentBlock text={community.marketInsights} currentSlug={community.slug} />
            </section>

            {/* Amenities & Schools */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Schools and Amenities Near {community.name}
              </h2>
              <ContentBlock text={community.amenitiesAndSchools} currentSlug={community.slug} />
            </section>

            {/* Investment */}
            <section>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                Investment Potential in {community.name}
              </h2>
              <ContentBlock text={community.investmentPotential} currentSlug={community.slug} />
              <p className="text-muted-foreground leading-relaxed mt-4">
                Some homes in {community.name} present strong renovation or value-add opportunities — <Link to="/invest" className="text-foreground underline hover:text-gold transition-colors">explore our investor-focused approach</Link>.
              </p>
            </section>

            {/* Echelon Perspective (optional, editorial authority section) */}
            {community.echelonPerspective && (
              <section>
                <p className="text-minimal text-gold mb-3 tracking-[0.2em]">LOCAL INSIGHT</p>
                <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                  Echelon Perspective on {community.name}
                </h2>
                <ContentBlock text={community.echelonPerspective} currentSlug={community.slug} />
              </section>
            )}

            {/* Community Comparison (optional, SEO-optimized) */}
            {community.communityComparison && (
              <section>
                <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-6">
                  {community.name} vs Other Austin Luxury Communities
                </h2>
                <ContentBlock text={community.communityComparison} currentSlug={community.slug} />
              </section>
            )}

            {/* Internal Links */}
            <section className="border border-border p-8">
              <h2 className="text-2xl font-display font-normal text-architectural mb-6">
                Explore Austin Real Estate
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link to="/austin-luxury-homes-for-sale" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → AUSTIN LUXURY HOMES FOR SALE
                </Link>
                <Link to="/luxury-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → LUXURY REAL ESTATE IN AUSTIN
                </Link>
                <Link to="/buy-homes-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → BUY A HOME IN AUSTIN
                </Link>
                <Link to="/sell-home-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → SELL YOUR AUSTIN HOME
                </Link>
                <Link to="/off-market-real-estate-austin" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → OFF-MARKET & PRIVATE LISTINGS
                </Link>
                <Link to="/austin-real-estate-investment" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → INVESTMENT ADVISORY
                </Link>
                <Link to="/best-neighborhoods-in-austin-texas" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
                  → BEST NEIGHBORHOODS IN AUSTIN
                </Link>
                <Link to="/communities" className="text-foreground hover:text-gold transition-colors duration-300 text-minimal">
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
                {allFaqs.map((faq, i) => (
                  <div key={i} className="border-b border-border pb-6">
                    <h3 className="text-lg font-medium text-foreground mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{parseInlineLinks(autoLink(faq.answer, community.slug, 2))}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Neighborhood Insights — contextual blog links */}
            {slug && neighborhoodInsights[slug] && neighborhoodInsights[slug].length > 0 && (
              <section>
                <p className="text-minimal text-gold mb-3 tracking-[0.2em]">EDITORIAL</p>
                <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-8">
                  Neighborhood Insights
                </h2>
                <div className="space-y-6">
                  {neighborhoodInsights[slug].map((article) => (
                    <Link
                      key={article.href}
                      to={article.href}
                      className="group flex items-start gap-4 py-4 border-b border-border/40 hover:border-gold/40 transition-colors duration-300"
                    >
                      <span className="w-8 h-px bg-gold mt-3 shrink-0 group-hover:w-12 transition-all duration-300" />
                      <div>
                        <h3 className="text-lg font-display font-normal text-foreground group-hover:text-gold transition-colors duration-300 mb-1">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed" style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
                          {article.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

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