import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

const featuredArticles = [
  {
    to: "/blog/austin-luxury-real-estate-market-forecast",
    title: "Austin Luxury Real Estate Market Forecast",
    excerpt: "Data-driven analysis of pricing trends, inventory shifts, and what luxury buyers should expect.",
    category: "Market Insights",
  },
  {
    to: "/blog/how-to-find-off-market-real-estate-deals-austin-2026",
    title: "How to Find Off-Market Deals in Austin",
    excerpt: "An investor playbook for sourcing pre-market and pocket listings across Austin's competitive landscape.",
    category: "Investment",
  },
  {
    to: "/why-billionaires-are-moving-to-austin",
    title: "Why Billionaires Are Moving to Austin",
    excerpt: "The economic, tax, and lifestyle factors driving ultra-high-net-worth migration to Central Texas.",
    category: "Relocation",
  },
  {
    to: "/best-neighborhoods-in-austin-texas",
    title: "Best Neighborhoods in Austin Texas",
    excerpt: "A comprehensive guide to Austin's top neighborhoods for families, professionals, and investors in 2026.",
    category: "Neighborhoods",
  },
  {
    to: "/off-market-real-estate-austin",
    title: "Off-Market Real Estate in Austin",
    excerpt: "How to access private listings and discreet opportunities before they hit the open market.",
    category: "Off-Market",
  },
  {
    to: "/austin-luxury-market-report",
    title: "Austin Luxury Market Report",
    excerpt: "Quarterly insights on pricing, days on market, and luxury segment performance across Austin.",
    category: "Market Insights",
  },
];

const MarketInsights = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-minimal text-gold mb-4 tracking-[0.25em] font-semibold">Market Insights</p>
              <h2 className="text-3xl md:text-4xl font-display font-normal text-architectural mb-4">
                Strategic Perspective on Austin Real Estate
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Off-market opportunities, investment trends, and market intelligence for informed decision-making. We recently published an in-depth breakdown of{" "}
                <Link to="/blog/austin-luxury-market-trends" className="text-foreground underline underline-offset-4 decoration-accent-gold/40 hover:decoration-accent-gold transition-colors duration-300">Austin's luxury real estate market trends</Link>, including where pricing, inventory, and buyer behavior are heading. You can also explore our latest guide on{" "}
                <Link to="/blog?post=private-listings-austin-buyers-actually-want" className="text-foreground underline underline-offset-4 decoration-accent-gold/40 hover:decoration-accent-gold transition-colors duration-300">private listings Austin buyers actually want</Link>.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article, i) => (
              <ScrollReveal key={article.to} delay={i * 80}>
                <Link to={article.to} className="group block h-full">
                  <div className="border-2 border-border/80 p-6 h-full flex flex-col hover:border-gold shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-architectural)] hover:-translate-y-1 transition-all duration-500 bg-[#f5f4f1] dark:bg-[hsl(38_15%_15%/0.2)]">
                    <p className="text-[0.65rem] tracking-[0.2em] uppercase text-gold font-semibold mb-3">
                      {article.category}
                    </p>
                    <h3 className="text-lg font-display font-normal text-foreground mb-3 group-hover:text-gold transition-colors duration-300 leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {article.excerpt}
                    </p>
                    <span className="mt-4 text-xs tracking-[0.15em] uppercase text-foreground/50 group-hover:text-gold transition-colors duration-300">
                      Read More →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketInsights;
