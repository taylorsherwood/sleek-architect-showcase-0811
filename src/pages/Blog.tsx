import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
const Footer = lazy(() => import("@/components/Footer"));
import AboutBlock from "@/components/AboutBlock";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { realEstateAgentSchema, createBreadcrumbSchema, createFAQSchema } from "@/components/SchemaMarkup";
import { blogPosts } from "@/data/blogPosts";
import { seoBlogPosts } from "@/data/seoBlogPosts";

const allPosts = [...seoBlogPosts, ...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const formatDate = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-');
  return `${m}/${d}/${y}`;
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  
  const categories = ["ALL", "LUXURY LIVING", "NEIGHBORHOODS", "RELOCATION", "MARKET INSIGHTS", "INVESTMENT", "FEATURED LISTING", "SUSTAINABILITY", "DESIGN", "URBAN PLANNING"];
  
  const filteredPosts = activeCategory === "ALL" 
    ? allPosts 
    : allPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Blog | Echelon Property Group"
        description="Austin luxury real estate blog — market trends, neighborhood guides, investment insights, and expert analysis from Echelon Property Group."
      />
      <SchemaMarkup schema={realEstateAgentSchema} />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Blog", url: "https://www.echelonpropertygroup.com/blog" }
      ])} />
      <SchemaMarkup schema={createFAQSchema([
        { question: "What is the Austin luxury real estate market like in 2026?", answer: "Austin's luxury market in 2026 continues to grow, driven by tech relocations, no state income tax, and limited high-end inventory in neighborhoods like Westlake Hills, Lake Austin, and Barton Creek. Demand from out-of-state buyers remains strong, particularly from California and New York." },
        { question: "What neighborhoods are best for luxury homes in Austin?", answer: "The top luxury neighborhoods in Austin include Westlake Hills, Barton Creek, Lake Austin waterfront, Tarrytown, Rollingwood, Spanish Oaks, and Dripping Springs. Each offers distinct lifestyle benefits ranging from waterfront living to Hill Country estates and proximity to downtown." },
        { question: "How do I find off-market luxury homes in Austin?", answer: "Off-market properties are accessed through agent networks, private listings, and direct outreach. Working with a well-connected Austin luxury agent like Taylor Sherwood at Echelon Property Group provides access to exclusive inventory that never appears on public listing portals." },
        { question: "Is Austin a good place to invest in real estate?", answer: "Austin ranks among the top real estate investment markets in the U.S. thanks to strong population growth, a diversified tech economy, favorable tax environment, and consistent long-term appreciation. Both residential and commercial segments offer compelling opportunities for investors." },
      ])} />
      <Navigation />
      <div className="h-12 md:h-20" />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-gold mb-4">Blogs and Articles</p>
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-8">
                Austin Real Estate Insights
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mb-6">
                Your trusted resource for expert analysis of Austin's luxury real estate market. Whether you are a buyer evaluating neighborhoods, a seller preparing for market, or an investor assessing opportunities, our insights are grounded in real transaction experience and hyperlocal knowledge.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Explore in-depth articles on market trends, neighborhood guides, investment strategies, and lifestyle insights — written and reviewed by <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">Taylor Sherwood</Link>, Certified Luxury Home Marketing Specialist and founder of Echelon Property Group. Have a question about Austin real estate? <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">Reach out to our team</Link> or <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4">browse current listings</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-minimal transition-colors duration-300 relative group ${
                    activeCategory === category 
                      ? "text-foreground" 
                      : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {category}
                  <span className={`absolute bottom-0 left-0 w-full h-px transition-all duration-300 origin-left ${
                    activeCategory === category 
                      ? "scale-x-100 bg-foreground" 
                      : "scale-x-0 group-hover:scale-x-100 bg-gold"
                  }`}></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
              {filteredPosts.map((post) => (
                <article key={post.id} className="group">
                  <Link to={post.href || `/blog/${post.id}`} className="block">
                    <div className="relative overflow-hidden mb-6">
                      <img 
                        src={post.image} 
                        alt={`${post.title} - Austin luxury real estate insights`}
                        title={post.title}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy" decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1">
                        <span className="text-xs text-foreground font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center text-xs text-muted-foreground space-x-4">
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.author}</span>
                      </div>
                      
                      <h2 className="text-xl lg:text-2xl font-light text-architectural group-hover:text-muted-foreground transition-colors duration-500">
                        {post.title}
                      </h2>
                      
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="pt-4">
                        <span className="text-minimal text-foreground hover:text-muted-foreground transition-colors duration-300 relative group-hover:underline">
                          READ MORE
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO Content: Blog Overview ── */}
      <section className="py-28 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal text-architectural mb-8">
              Austin Luxury Real Estate Insights
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Welcome to the Echelon Property Group blog — your trusted source for expert analysis of Austin's luxury real estate market. Whether you're a seasoned investor evaluating your next acquisition, a first-time luxury home buyer exploring Austin's premier neighborhoods, or a homeowner considering a strategic sale, our articles provide the data-driven insights and local expertise you need to make informed decisions.
              </p>
              <p>
                Austin has emerged as one of the most dynamic luxury real estate markets in the United States. Fueled by a thriving technology economy anchored by Apple, Tesla, Google, Meta, and Oracle, the city attracts high-net-worth individuals and families from across the country. Texas's absence of state income tax amplifies purchasing power, and Austin's unique blend of natural beauty, cultural richness, and economic opportunity creates a market unlike any other.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                What We Cover
              </h3>
              <p>
                Our editorial team publishes in-depth articles across a range of topics relevant to Austin luxury real estate. Market reports analyze pricing trends, inventory levels, and demand drivers across neighborhoods like Westlake Hills, Barton Creek, Lake Austin, Tarrytown, and Rollingwood. Neighborhood guides explore the lifestyle, amenities, schools, and investment potential of Austin's most sought-after communities.
              </p>
              <p>
                Investment-focused content examines commercial real estate opportunities, land acquisition strategies, 1031 exchange considerations, and portfolio diversification through Austin property. Our relocation guides help out-of-state buyers navigate Austin's neighborhoods, school districts, and lifestyle offerings with confidence.
              </p>

              <h3 className="text-2xl font-display font-normal text-architectural pt-4">
                Why Trust Echelon Property Group
              </h3>
              <p>
                Every article is written or reviewed by Taylor Sherwood, a Certified Luxury Home Marketing Specialist and founder of Echelon Property Group. With deep experience across residential, commercial, land, and investment real estate in Austin, Taylor brings a practitioner's perspective that goes beyond surface-level commentary. Our insights are grounded in real transaction experience and hyperlocal market knowledge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-light text-architectural mb-8">
              Stay Informed
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Subscribe to our newsletter for the latest insights on Austin luxury real estate
            </p>
            <a
              href="https://taylorsherwood.myflodesk.com/biolink"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-block px-8 py-4 bg-[#0C0F24] text-background hover:bg-[#0C0F24]/90 transition-colors duration-300"
            >
              SUBSCRIBE
            </a>
          </div>
        </div>
      </section>

      {/* ── Explore More ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-gold mb-6">Explore More</p>
            <p className="text-muted-foreground leading-[2] text-[15px]">
              <Link to="/listings" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">Explore available homes</Link> across Austin's premier neighborhoods, <Link to="/about" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">learn about our team and approach</Link>, or <Link to="/contact" className="text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border">connect with us</Link> to discuss your real estate goals.
            </p>
          </div>
        </div>
      </section>

      <AboutBlock />
      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default Blog;
