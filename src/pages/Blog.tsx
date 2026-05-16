import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/SchemaMarkup";
import { blogPosts } from "@/data/blogPosts";
import { seoBlogPosts } from "@/data/seoBlogPosts";
import heroLuxury from "@/assets/blog-hero-austin-skyline.jpg";

const allPosts = [...seoBlogPosts, ...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const formatDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split("-");
  return `${m}/${d}/${y}`;
};

const smoothScrollTo = (elementId: string) => {
  const target = document.getElementById(elementId);
  if (!target) return;
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY - 80;
  const distance = end - start;
  const duration = 1600;
  let startTime: number | null = null;
  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = [
    "ALL",
    "LUXURY LIVING",
    "NEIGHBORHOODS",
    "RELOCATION",
    "MARKET INSIGHTS",
    "INVESTMENT",
    "FEATURED LISTING",
    "SUSTAINABILITY",
    "DESIGN",
    "URBAN PLANNING",
  ];

  const filteredPosts =
    activeCategory === "ALL"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  const featured = allPosts[0];
  const gridPosts = activeCategory === "ALL" ? filteredPosts.slice(1) : filteredPosts;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog | Echelon Property Group"
        description="Austin luxury real estate blog — market trends, neighborhood guides, investment insights, and expert analysis from Echelon Property Group."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup
        schema={createBreadcrumbSchema([
          { name: "Home", url: "https://www.echelonpropertygroup.com/" },
          { name: "Blog", url: "https://www.echelonpropertygroup.com/blog" },
        ])}
      />
      <SchemaMarkup
        schema={createFAQSchema([
          { question: "What is the Austin luxury real estate market like in 2026?", answer: "Austin's luxury market in 2026 continues to grow, driven by tech relocations, no state income tax, and limited high-end inventory in neighborhoods like West lake Hills, Lake Austin, and Barton Creek. Demand from out-of-state buyers remains strong, particularly from California and New York." },
          { question: "What neighborhoods are best for luxury homes in Austin?", answer: "The top luxury neighborhoods in Austin include West lake Hills, Barton Creek, Lake Austin waterfront, Tarrytown, Rollingwood, Spanish Oaks, and Dripping Springs. Each offers distinct lifestyle benefits ranging from waterfront living to Hill Country estates and proximity to downtown." },
          { question: "How do I find off-market luxury homes in Austin?", answer: "Off-market properties are accessed through agent networks, private listings, and direct outreach. Working with a well-connected Austin luxury agent like Taylor Sherwood at Echelon Property Group provides access to exclusive inventory that never appears on public listing portals." },
          { question: "Is Austin a good place to invest in real estate?", answer: "Austin ranks among the top real estate investment markets in the U.S. thanks to strong population growth, a diversified tech economy, favorable tax environment, and consistent long-term appreciation. Both residential and commercial segments offer compelling opportunities for investors." },
        ])}
      />
      <Navigation />

      {/* ── Cinematic Editorial Hero ── */}
      <section className="relative w-full min-h-[580px] md:min-h-[650px] lg:h-[740px] xl:h-[775px] 2xl:h-[795px] overflow-hidden">
        <img
          src={heroLuxury}
          alt="Austin luxury real estate editorial"
          className="absolute inset-0 w-full h-full object-cover object-top scale-105 motion-safe:animate-[heroDrift_24s_ease-in-out_infinite_alternate]"
          loading="eager"
          decoding="async"
        />
        {/* Soft warm cinematic grade — no muddy blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-[#1a1410]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0F24]/35 via-transparent to-transparent" />

        <div className="absolute inset-0 flex items-end md:items-center">
          <div className="container mx-auto px-6 pb-16 md:pb-0">
            <div className="max-w-xl md:max-w-2xl motion-safe:animate-[fadeUp_1.1s_ease-out_both]" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.45)' }}>
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#b9a06c] mb-10 md:mb-14">
                Luxury Real Estate Insights
              </p>
              <h1 className="text-[1.75rem] sm:text-3xl md:text-[2.5rem] lg:text-[3rem] font-display font-normal leading-[1.25] md:leading-[1.2] tracking-[-0.01em] text-background mb-12 md:mb-16 max-w-[18ch]">
                Austin real estate intelligence for buyers, sellers &amp; investors.
              </h1>
              <p className="text-[15px] md:text-base text-background/75 leading-[1.9] max-w-lg mb-14 md:mb-16">
                Hyperlocal analysis, off-market strategy, and neighborhood expertise across Austin's most desirable communities.
              </p>
              <div className="flex items-center gap-7 md:gap-9">
                <a
                  href="#articles"
                  onClick={(e) => { e.preventDefault(); smoothScrollTo("articles"); }}
                  className="group relative inline-flex items-center text-[11px] tracking-[0.25em] uppercase text-background pb-2 transition-colors duration-500 hover:text-[#b9a06c]"
                >
                  Explore Articles
                  <span className="ml-3 transition-transform duration-500 group-hover:translate-x-1">→</span>
                  <span className="pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-[#b9a06c] transition-transform duration-500 group-hover:scale-x-100" />
                </a>
                <Link
                  to="/off-market-real-estate-austin"
                  className="group relative inline-flex items-center text-[11px] tracking-[0.25em] uppercase text-background/65 pb-2 transition-colors duration-500 hover:text-[#b9a06c]"
                >
                  Private Access
                  <span className="pointer-events-none absolute left-0 bottom-0 h-px w-full origin-left scale-x-0 bg-[#b9a06c] transition-transform duration-500 group-hover:scale-x-100" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Insight — placed below hero with breathing room ── */}
      {featured && (
        <section className="pt-20 md:pt-32 pb-20 md:pb-28">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-10 md:mb-14">
                <p className="text-[10px] tracking-[0.35em] uppercase text-[#b9a06c]">
                  Featured Insight
                </p>
                <span className="hidden md:block text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
                  {featured.category}
                </span>
              </div>

              <Link
                to={featured.href || `/blog/${featured.id}`}
                className="group block"
              >
                <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-center">
                  <div className="md:col-span-7 relative aspect-[5/4] md:aspect-[4/3] overflow-hidden">
                    <img
                      src={featured.image}
                      alt={`${featured.title} - Austin luxury real estate insights`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="md:col-span-5">
                    <h2 className="text-[1.65rem] md:text-3xl lg:text-[2.125rem] font-display font-normal leading-[1.18] tracking-[-0.005em] text-architectural mb-6 group-hover:text-foreground/75 transition-colors duration-500">
                      {featured.title}
                    </h2>
                    <p className="text-[15px] text-muted-foreground leading-[1.8] line-clamp-3 mb-9 max-w-md">
                      {featured.excerpt}
                    </p>
                    <div className="flex items-center gap-5 text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                      <span>{formatDate(featured.date)}</span>
                      <span className="w-[3px] h-[3px] rounded-full bg-muted-foreground/40" />
                      <span>{featured.readTime}</span>
                    </div>
                    <div className="mt-8 inline-flex items-center text-[11px] tracking-[0.25em] uppercase text-foreground pb-1.5 border-b border-[#b9a06c] group-hover:text-[#b9a06c] transition-colors duration-500">
                      Read Article
                      <span className="ml-3 transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* ── Refined Editorial Category Filter ── */}
      <section id="articles" className="pb-10 md:pb-14 scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-foreground/10 pb-4">
              <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                The Journal
              </p>
              <p className="hidden md:block text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? "Article" : "Articles"}
              </p>
            </div>
            <div className="-mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto scrollbar-none">
              <div className="flex gap-7 md:gap-8 whitespace-nowrap md:flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 relative pb-1.5 ${
                      activeCategory === category
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-px transition-transform duration-500 origin-left ${
                        activeCategory === category
                          ? "scale-x-100 bg-[#b9a06c]"
                          : "scale-x-0 bg-[#b9a06c]/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Editorial Article Grid ── */}
      <section className="pb-28 md:pb-36">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {gridPosts.length === 0 ? (
              <p className="text-center text-muted-foreground py-20">
                No articles in this category yet.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-14 gap-y-16 md:gap-y-20">
                {gridPosts.map((post, idx) => {
                  // Subtle editorial rhythm: every 7th card spans wider on desktop
                  const wide = idx % 7 === 0 && idx !== 0;
                  return (
                    <article
                      key={post.id}
                      className={`group ${wide ? "lg:col-span-2" : ""}`}
                    >
                      <Link
                        to={post.href || `/blog/${post.id}`}
                        className="flex flex-col h-full"
                      >
                        <div
                          className={`relative overflow-hidden mb-6 ${
                            wide ? "aspect-[16/9]" : "aspect-[4/3]"
                          }`}
                        >
                          <img
                            src={post.image}
                            alt={`${post.title} - Austin luxury real estate insights`}
                            title={post.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="flex flex-col flex-1">
                          <p className="text-[10px] tracking-[0.25em] uppercase text-[#b9a06c] mb-3">
                            {post.category}
                          </p>
                          <h2
                            className={`font-display font-normal leading-[1.2] text-architectural mb-3 group-hover:text-foreground/75 transition-colors duration-500 ${
                              wide
                                ? "text-2xl md:text-3xl lg:text-[2rem]"
                                : "text-xl lg:text-[1.4rem]"
                            }`}
                          >
                            {post.title}
                          </h2>
                          <p className="text-[15px] text-muted-foreground leading-[1.7] line-clamp-2 mb-5">
                            {post.excerpt}
                          </p>
                          <div className="mt-auto flex items-center gap-3 text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
                            <span>{formatDate(post.date)}</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── About Our Insights (SEO content preserved) ── */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#b9a06c] mb-5">
              About Our Insights
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal text-architectural mb-10 leading-[1.15]">
              Austin Luxury Real Estate, Understood Deeply
            </h2>
            <div className="space-y-6 text-muted-foreground leading-[1.85] text-[15px] md:text-base">
              <p>
                The Echelon Property Group journal is a trusted source for expert analysis of Austin's luxury real estate market. Whether you're a seasoned investor evaluating your next acquisition, a first-time luxury home buyer exploring Austin's premier neighborhoods, or a homeowner considering a strategic sale, our articles provide the data-driven insights and local expertise you need to make informed decisions.
              </p>
              <p>
                Austin has emerged as one of the most dynamic luxury real estate markets in the United States. Fueled by a thriving technology economy anchored by Apple, Tesla, Google, Meta, and Oracle, the city attracts high-net-worth individuals and families from across the country. Texas's absence of state income tax amplifies purchasing power, and Austin's unique blend of natural beauty, cultural richness, and economic opportunity creates a market unlike any other.
              </p>

              <h3 className="text-xl md:text-2xl font-display font-normal text-architectural pt-6">
                What We Cover
              </h3>
              <p>
                Our editorial team publishes in-depth articles across topics relevant to Austin luxury real estate. Market reports analyze pricing trends, inventory levels, and demand drivers across neighborhoods like <Link to="/communities/westlake-hills" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">Westlake Hills</Link>, <Link to="/communities/barton-creek" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">Barton Creek</Link>, <Link to="/communities/lake-austin" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">Lake Austin</Link>, <Link to="/communities/tarrytown" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">Tarrytown</Link>, and <Link to="/communities/rollingwood" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">Rollingwood</Link>. Neighborhood guides explore the lifestyle, amenities, schools, and investment potential of Austin's most sought-after communities.
              </p>
              <p>
                Investment-focused content examines <Link to="/invest" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">commercial real estate opportunities</Link>, land acquisition strategies, 1031 exchange considerations, and portfolio diversification through Austin property. Our <Link to="/blog/moving-to-austin-texas-from-california" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">relocation guides</Link> help out-of-state buyers navigate Austin's neighborhoods, school districts, and lifestyle offerings with confidence.
              </p>

              <h3 className="text-xl md:text-2xl font-display font-normal text-architectural pt-6">
                Why Trust Echelon Property Group
              </h3>
              <p>
                Every article is written or reviewed by <Link to="/about" className="text-foreground hover:text-[#b9a06c] transition-colors underline underline-offset-4 decoration-border">Taylor Sherwood</Link>, a Certified Luxury Home Marketing Specialist and founder of Echelon Property Group. With deep experience across residential, commercial, land, and investment real estate in Austin, Taylor brings a practitioner's perspective that goes beyond surface-level commentary. Our insights are grounded in real transaction experience and hyperlocal market knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-28 md:py-32 bg-secondary border-t border-foreground/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#b9a06c] mb-5">
              The Echelon Letter
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal text-architectural mb-6 leading-[1.15]">
              Stay Informed
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed">
              A quiet, occasional dispatch on Austin's luxury market — market shifts, off-market opportunities, and neighborhood intelligence.
            </p>
            <a
              href="https://taylorsherwood.myflodesk.com/biolink"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-block px-8 py-4 bg-[#0C0F24] text-background hover:bg-[#b9a06c] transition-colors duration-500 text-xs tracking-[0.2em] uppercase"
            >
              Subscribe
            </a>
          </div>
        </div>
      </section>

      {/* ── Explore More ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-[#b9a06c] mb-6">Explore More</p>
            <p className="text-muted-foreground leading-[2] text-[15px]">
              <Link to="/listings" className="text-foreground hover:text-[#b9a06c] transition-colors duration-300 underline underline-offset-4 decoration-border">Explore available homes</Link> across Austin's premier neighborhoods, <Link to="/about" className="text-foreground hover:text-[#b9a06c] transition-colors duration-300 underline underline-offset-4 decoration-border">learn about our team and approach</Link>, or <Link to="/contact" className="text-foreground hover:text-[#b9a06c] transition-colors duration-300 underline underline-offset-4 decoration-border">connect with us</Link> to discuss your real estate goals.
            </p>
          </div>
        </div>
      </section>

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Blog;
