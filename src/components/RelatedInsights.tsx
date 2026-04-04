import { Link, useLocation } from "react-router-dom";

interface InsightLink {
  to: string;
  label: string;
  topics: string[];
}

const allInsightLinks: InsightLink[] = [
  { to: "/luxury-real-estate-austin", label: "Austin luxury real estate market trends", topics: ["luxury", "market", "homes"] },
  { to: "/off-market-real-estate-austin", label: "Off-market homes and private listings in Austin", topics: ["off-market", "investment", "private"] },
  { to: "/moving-to-austin-texas", label: "Moving to Austin Texas — relocation guide", topics: ["relocation", "moving", "guide"] },
  { to: "/invest", label: "Austin investment properties and value-add strategies", topics: ["investment", "investor", "flip"] },
  { to: "/private-opportunities", label: "Private real estate opportunities in Austin", topics: ["off-market", "private", "investor", "luxury"] },
  { to: "/sell-home-austin", label: "Sell your Austin home — comprehensive seller guide", topics: ["sell", "marketing", "luxury", "homes"] },
  { to: "/buy-homes-austin", label: "Buy a home in Austin — complete buyer guide", topics: ["buy", "luxury", "homes", "neighborhoods"] },
  { to: "/sell", label: "Sell your Austin home with strategic marketing", topics: ["sell", "marketing", "luxury"] },
  { to: "/buy", label: "Buy luxury homes in Austin Texas", topics: ["buy", "luxury", "homes"] },
  { to: "/land", label: "Austin land and development opportunities", topics: ["land", "investment", "development"] },
  { to: "/communities", label: "Explore Austin's luxury neighborhoods", topics: ["communities", "neighborhoods", "luxury"] },
  { to: "/best-neighborhoods-in-austin-texas", label: "Best neighborhoods in Austin Texas (2026 guide)", topics: ["neighborhoods", "relocation", "guide", "communities"] },
  { to: "/austin-commercial-real-estate", label: "Austin commercial real estate opportunities", topics: ["commercial", "investment"] },
  { to: "/listings/commercial-investment-austin", label: "Commercial and investment property listings", topics: ["commercial", "investment", "listings"] },
  { to: "/blog", label: "Austin real estate blog and market insights", topics: ["market", "luxury", "investment", "guide"] },
  { to: "/blog/best-luxury-neighborhoods-austin-texas", label: "Best luxury neighborhoods in Austin", topics: ["luxury", "neighborhoods", "homes"] },
  { to: "/blog/austin-luxury-real-estate-market-forecast", label: "Austin luxury real estate market forecast", topics: ["market", "luxury", "forecast"] },
  { to: "/blog/top-investment-neighborhoods-austin", label: "Top investment neighborhoods in Austin", topics: ["investment", "neighborhoods"] },
  { to: "/austin-multifamily-report-2026", label: "Austin multifamily market outlook 2026", topics: ["investment", "commercial", "market"] },
  { to: "/austin-luxury-homes-for-sale", label: "Austin luxury homes for sale", topics: ["luxury", "homes", "buy"] },
  { to: "/blog/how-to-find-off-market-real-estate-deals-austin-2026", label: "How to find off-market deals in Austin", topics: ["off-market", "investment", "investor"] },
  { to: "/why-billionaires-are-moving-to-austin", label: "Why billionaires are moving to Austin", topics: ["relocation", "luxury", "moving"] },
  { to: "/austin-luxury-market-report", label: "Austin luxury market report", topics: ["market", "luxury", "forecast"] },
];

// Map page paths to relevant topic keywords for matching
function getPageTopics(pathname: string): string[] {
  if (pathname.includes("invest") || pathname.includes("investment")) return ["investment", "investor", "flip", "market"];
  if (pathname.includes("off-market") || pathname.includes("private")) return ["off-market", "private", "investor", "luxury"];
  if (pathname.includes("luxury") || pathname.includes("homes")) return ["luxury", "homes", "market", "neighborhoods"];
  if (pathname.includes("moving") || pathname.includes("relocation") || pathname.includes("billionaire")) return ["relocation", "moving", "guide", "neighborhoods"];
  if (pathname.includes("sell")) return ["sell", "marketing", "luxury", "homes"];
  if (pathname.includes("buy")) return ["buy", "luxury", "homes", "neighborhoods"];
  if (pathname.includes("land") || pathname.includes("development")) return ["land", "investment", "development"];
  if (pathname.includes("commercial") || pathname.includes("multifamily")) return ["commercial", "investment", "market"];
  if (pathname.includes("community") || pathname.includes("neighborhood")) return ["neighborhoods", "luxury", "communities"];
  if (pathname.includes("blog") || pathname.includes("market")) return ["market", "luxury", "investment", "homes"];
  return ["luxury", "market", "investment", "homes"];
}

interface Props {
  maxLinks?: number;
}

const RelatedInsights = ({ maxLinks = 5 }: Props) => {
  const { pathname } = useLocation();

  const pageTopics = getPageTopics(pathname);

  const scored = allInsightLinks
    .filter((link) => link.to !== pathname && !pathname.endsWith(link.to))
    .map((link) => ({
      ...link,
      score: link.topics.filter((t) => pageTopics.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLinks);

  if (scored.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-minimal text-gold mb-4 tracking-[0.2em]">Further Reading</p>
        <h2 className="text-2xl md:text-3xl font-display font-normal text-architectural mb-10">
          Explore More Austin Real Estate Insights
        </h2>
        <nav aria-label="Related insights">
          <ul className="space-y-4">
            {scored.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="group flex items-center gap-3 text-foreground/80 hover:text-gold transition-colors duration-300"
                >
                  <span className="w-6 h-px bg-gold group-hover:w-10 transition-all duration-300" />
                  <span className="text-base md:text-lg leading-relaxed">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default RelatedInsights;
