import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const footerLinkStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontWeight: 300,
  fontSize: "13px",
  lineHeight: 2,
  color: "#ffffff",
};

const footerHeadingStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#F5F3EF",
  marginBottom: "20px",
  fontWeight: 400,
};

const Footer = () => {
  return (
    <footer data-nav-dark-zone style={{ background: "#0C0F24", fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
      <div className="container mx-auto px-6">
        <div className="max-w-[1320px] mx-auto" style={{ padding: "clamp(60px, 8vw, 100px) 0 16px" }}>
          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-4 text-center sm:text-left lg:justify-items-center">
            {/* Brand column */}
            <div className="flex flex-col items-center sm:items-start -mt-16">
              <Link to="/" className="inline-block mb-0">
                <img
                  src="/static-assets/echelon-footer-logo.png"
                  alt="Echelon Property Group"
                  className="h-80 w-auto"
                  loading="lazy" decoding="async"
                  width={320}
                  height={320}
                />
              </Link>
            </div>

            {/* Navigation column */}
            <div>
              <h4 style={footerHeadingStyle}>NAVIGATION</h4>
              <div className="space-y-0">
                {[
                  { to: "/about", label: "About" },
                  { to: "/buy", label: "Buy" },
                  { to: "/sell", label: "Sell" },
                  { to: "/listings", label: "Listings" },
                  { to: "/austin-luxury-homes-for-sale", label: "Luxury Homes" },
                  { to: "/communities", label: "Communities" },
                  { to: "/blog", label: "Insights" },
                  { to: "/invest", label: "Investment Advisory" },
                  { to: "/off-market-real-estate-austin", label: "Private Access" },
                  { to: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block hover:text-white transition-colors duration-300"
                    style={footerLinkStyle}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Communities column */}
            <div>
              <h4 style={footerHeadingStyle}>COMMUNITIES</h4>
              <div className="space-y-0">
                {[
                  { to: "/communities/barton-creek", label: "Barton Creek" },
                  { to: "/communities/lake-austin", label: "Lake Austin" },
                  { to: "/communities/westlake-hills", label: "Westlake Hills" },
                  { to: "/communities/tarrytown", label: "Tarrytown" },
                  { to: "/communities/rollingwood", label: "Rollingwood" },
                  { to: "/communities/spanish-oaks", label: "Spanish Oaks" },
                  { to: "/communities/dripping-springs", label: "Dripping Springs" },
                  { to: "/best-luxury-neighborhoods-austin", label: "Best Neighborhoods" },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block hover:text-white transition-colors duration-300"
                    style={footerLinkStyle}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact column */}
            <div>
              <h4 style={footerHeadingStyle}>CONTACT</h4>
              <div style={footerLinkStyle}>
                <p>2105 East MLK Blvd Ste 227</p>
                <p>Austin, Texas 78702</p>
                <a href="tel:+15126613843" className="block hover:text-white transition-colors duration-300">(512) 661-3843</a>
                <a href="mailto:taylor@echelonpropertygroup.com" className="block hover:text-white transition-colors duration-300">taylor@echelonpropertygroup.com</a>
              </div>
              <div className="mt-4 flex flex-col gap-1 items-center sm:items-start">
                <a href="https://www.linkedin.com/in/taylorsherwood/" target="_blank" rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 text-white hover:text-[#b8a06d] transition-colors duration-300"
                  style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, fontSize: "12px", lineHeight: 2 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Taylor Sherwood
                </a>
                <a
                  href="https://www.instagram.com/theinvestorbroker"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 text-white hover:text-[#b8a06d] transition-colors duration-300"
                  style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, fontSize: "12px", lineHeight: 2 }}
                >
                  <Instagram className="w-4 h-4" />
                  @theinvestorbroker
                </a>
              </div>
            </div>
          </div>

          {/* Resources row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-0 mb-6">
            <div>
              <h4 style={footerHeadingStyle}>RESOURCES</h4>
              <div className="space-y-0">
                {[
                  { to: "/moving-to-austin-texas", label: "Moving to Austin" },
                  { to: "/best-luxury-neighborhoods-austin", label: "Best Luxury Neighborhoods" },
                  { to: "/home-value-austin", label: "Home Valuation" },
                  { to: "/off-market-real-estate-austin", label: "Off-Market Homes" },
                  { to: "/private-opportunities", label: "Private Opportunities" },
                  { to: "/luxury-real-estate-austin", label: "Luxury Real Estate Austin" },
                  { to: "/buy-homes-austin", label: "Buy Homes in Austin" },
                  { to: "/sell-home-austin", label: "Sell Your Austin Home" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className="block hover:text-white transition-colors duration-300" style={footerLinkStyle}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={footerHeadingStyle}>INVESTMENT</h4>
              <div className="space-y-0">
                {[
                  { to: "/austin-real-estate-investment", label: "Investment Advisory" },
                  { to: "/austin-commercial-real-estate", label: "Commercial Real Estate" },
                  { to: "/land-for-sale-austin", label: "Land for Sale" },
                  { to: "/austin-multifamily-report-2026", label: "Multifamily Report" },
                  { to: "/austin-land-development-opportunities", label: "Land Development" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className="block hover:text-white transition-colors duration-300" style={footerLinkStyle}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={footerHeadingStyle}>MARKET INSIGHTS</h4>
              <div className="space-y-0">
                {[
                  { to: "/austin-luxury-market-report", label: "Luxury Market Report" },
                  { to: "/austin-luxury-real-estate-market-report", label: "Market Data Report" },
                  { to: "/blog/austin-luxury-market-trends", label: "Market Trends 2026" },
                  { to: "/why-billionaires-are-moving-to-austin", label: "Billionaire Migration" },
                  { to: "/past-transactions", label: "Past Transactions" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className="block hover:text-white transition-colors duration-300" style={footerLinkStyle}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={footerHeadingStyle}>QUICK LINKS</h4>
              <div className="space-y-0">
                {[
                  { to: "/search", label: "Search Properties" },
                  { to: "/land", label: "Land & Lots" },
                  { to: "/connect", label: "Join Private Network" },
                  { to: "/sitemap", label: "Sitemap" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className="block hover:text-white transition-colors duration-300" style={footerLinkStyle}>{link.label}</Link>
                ))}
              </div>
            </div>
          </div>

          {/* Gold divider */}
          <div className="w-full h-px mb-5" style={{ background: "hsl(38 39% 61% / 0.3)" }} />

          {/* Explore insights link */}
          <div className="text-center mb-5">
            <Link to="/blog" className="relative inline-block hover:text-white transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left" style={{ fontFamily: '"Jost", sans-serif', fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 300, color: "hsl(38 39% 61% / 0.7)" }}>
              Explore More Insights →
            </Link>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-6">
            <div className="text-center md:text-left space-y-1">
              <a
                href="https://www.dropbox.com/scl/fi/ism1gkeqt0bol9srh3b0a/IABS-1-2.pdf?rlkey=l05zn9bqqmg8e1ru4qjzsnd1o&dl=0"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block hover:text-gold transition-colors duration-300 underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "12.5px", color: "hsl(38 39% 61% / 0.85)", letterSpacing: "0.03em" }}
              >
                Information About Brokerage Services (IABS)
              </a>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: "13px", color: "hsl(38 39% 61% / 0.9)", fontWeight: 700 }}>
                Brokered by eXp Realty
              </p>
            </div>
            <p className="text-center" style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", color: "hsl(38 39% 61% / 0.65)" }}>
              © {new Date().getFullYear()} Echelon Property Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
