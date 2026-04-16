import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { lazy, Suspense } from "react";
import SEOHead from "@/components/SEOHead";
import SchemaMarkup, { createBreadcrumbSchema } from "@/components/SchemaMarkup";

const Footer = lazy(() => import("@/components/Footer"));

const linkClass = "text-foreground hover:text-gold transition-colors duration-300 underline underline-offset-4 decoration-border text-[15px] leading-[2.2]";

const sections = [
  {
    title: "Main Pages",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About Taylor Sherwood" },
      { to: "/buy", label: "Buy a Home in Austin" },
      { to: "/sell", label: "Sell Your Austin Home" },
      { to: "/listings", label: "Current Listings" },
      { to: "/communities", label: "Austin Luxury Communities" },
      { to: "/invest", label: "Investment Advisory" },
      { to: "/contact", label: "Contact Us" },
      { to: "/search", label: "Search All Properties" },
      { to: "/past-transactions", label: "Past Transactions" },
    ],
  },
  {
    title: "Communities",
    links: [
      { to: "/communities/barton-creek", label: "Barton Creek Homes for Sale" },
      { to: "/communities/westlake-hills", label: "Westlake Hills Homes for Sale" },
      { to: "/communities/lake-austin", label: "Lake Austin Waterfront Homes" },
      { to: "/communities/tarrytown", label: "Tarrytown Homes for Sale" },
      { to: "/communities/rollingwood", label: "Rollingwood Homes for Sale" },
      { to: "/communities/spanish-oaks", label: "Spanish Oaks Homes for Sale" },
      { to: "/communities/dripping-springs", label: "Dripping Springs Homes for Sale" },
      { to: "/communities/zilker-austin", label: "Zilker Homes for Sale" },
      { to: "/communities/downtown-austin-condos", label: "Downtown Austin Condos" },
      { to: "/communities/travis-heights", label: "Travis Heights Homes for Sale" },
      { to: "/communities/cat-mountain-northwest-hills", label: "Cat Mountain & Northwest Hills" },
      { to: "/communities/texas-hill-country-estates", label: "Texas Hill Country" },
    ],
  },
  {
    title: "SEO Community Pages",
    links: [
      { to: "/westlake-hills-homes-for-sale", label: "Westlake Hills Homes for Sale" },
      { to: "/tarrytown-homes-for-sale", label: "Tarrytown Homes for Sale" },
      { to: "/rollingwood-homes-for-sale", label: "Rollingwood Homes for Sale" },
      { to: "/barton-creek-homes-for-sale", label: "Barton Creek Homes for Sale" },
      { to: "/lake-austin-waterfront-homes-for-sale", label: "Lake Austin Waterfront Homes" },
      { to: "/lake-travis-waterfront-homes-for-sale", label: "Lake Travis Waterfront Homes" },
      { to: "/dripping-springs-homes-for-sale", label: "Dripping Springs Homes for Sale" },
      { to: "/bee-cave-homes-for-sale", label: "Bee Cave Homes for Sale" },
      { to: "/steiner-ranch-homes-for-sale", label: "Steiner Ranch Homes for Sale" },
      { to: "/rob-roy-homes-for-sale", label: "Rob Roy Homes for Sale" },
      { to: "/zilker-homes-for-sale", label: "Zilker Homes for Sale" },
      { to: "/hyde-park-homes-for-sale", label: "Hyde Park Homes for Sale" },
      { to: "/mueller-homes-for-sale", label: "Mueller Homes for Sale" },
      { to: "/pemberton-heights-homes-for-sale", label: "Pemberton Heights Homes for Sale" },
      { to: "/great-hills-homes-for-sale", label: "Great Hills Homes for Sale" },
      { to: "/balcones-park-homes-for-sale", label: "Balcones Park Homes for Sale" },
      { to: "/clarksville-homes-for-sale", label: "Clarksville Homes for Sale" },
    ],
  },
  {
    title: "Buyer & Seller Resources",
    links: [
      { to: "/buy-homes-austin", label: "Austin Home Buying Guide" },
      { to: "/sell-home-austin", label: "Austin Home Selling Guide" },
      { to: "/home-value-austin", label: "Free Austin Home Valuation" },
      { to: "/austin-luxury-homes-for-sale", label: "Austin Luxury Homes for Sale" },
      { to: "/luxury-real-estate-austin", label: "Luxury Real Estate in Austin" },
      { to: "/off-market-real-estate-austin", label: "Off-Market Real Estate Austin" },
      { to: "/private-opportunities", label: "Private Market Opportunities" },
      { to: "/moving-to-austin-texas", label: "Moving to Austin Guide" },
      { to: "/best-luxury-neighborhoods-austin", label: "Best Luxury Neighborhoods in Austin" },
      { to: "/best-neighborhoods-in-austin-texas", label: "Best Neighborhoods in Austin" },
    ],
  },
  {
    title: "Investment & Commercial",
    links: [
      { to: "/austin-real-estate-investment", label: "Austin Real Estate Investment" },
      { to: "/austin-commercial-real-estate", label: "Austin Commercial Real Estate" },
      { to: "/listings/commercial-investment-austin", label: "Commercial Investment Listings" },
      { to: "/land", label: "Land & Development" },
      { to: "/land-for-sale-austin", label: "Land for Sale in Austin" },
      { to: "/austin-land-development-opportunities", label: "Austin Land Development Opportunities" },
      { to: "/austin-multifamily-report-2026", label: "Austin Multifamily Report 2026" },
    ],
  },
  {
    title: "Market Reports & Insights",
    links: [
      { to: "/blog", label: "Blog & Market Insights" },
      { to: "/austin-luxury-market-report", label: "Austin Luxury Market Report" },
      { to: "/austin-luxury-real-estate-market-report", label: "Austin Luxury Real Estate Market Report" },
      { to: "/blog/austin-luxury-market-trends", label: "Austin Luxury Market Trends (2026)" },
      { to: "/why-billionaires-are-moving-to-austin", label: "Why Billionaires Are Moving to Austin" },
      { to: "/blog/how-to-find-off-market-real-estate-deals-austin-2026", label: "Off-Market Deals Playbook 2026" },
      { to: "/blog/how-to-find-off-market-homes-in-austin-that-nobody-lists", label: "How to Find Off-Market Homes in Austin" },
    ],
  },
  {
    title: "Connect",
    links: [
      { to: "/connect", label: "Join Our Private Network" },
      { to: "/contact", label: "Contact Echelon Property Group" },
    ],
  },
];

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sitemap | Echelon Property Group"
        description="Full sitemap for Echelon Property Group — Austin real estate listings, communities, market reports, and investment resources."
        noindex
      />
      <SchemaMarkup schema={createBreadcrumbSchema([
        { name: "Home", url: "https://www.echelonpropertygroup.com/" },
        { name: "Sitemap", url: "https://www.echelonpropertygroup.com/sitemap" },
      ])} />
      <Navigation />
      <div className="h-12 md:h-20" />

      <section className="pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <p className="text-minimal text-gold mb-3 font-extrabold">SITEMAP</p>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-normal text-architectural mb-6">
              All Pages
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-16">
              A complete directory of every page on our website — from luxury listings and community guides to market reports and investment resources.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {sections.map((section) => (
                <div key={section.title}>
                  <h2 className="text-xs tracking-[0.2em] uppercase text-gold mb-4 font-semibold">
                    {section.title}
                  </h2>
                  <ul className="space-y-0">
                    {section.links.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className={linkClass}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[100px]" />}><Footer /></Suspense>
    </div>
  );
};

export default Sitemap;
