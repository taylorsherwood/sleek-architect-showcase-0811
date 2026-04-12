import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const headingStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontSize: "10px",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
  marginBottom: "14px",
  fontWeight: 500,
};

const linkStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontWeight: 300,
  fontSize: "12.5px",
  lineHeight: 1.9,
  color: "rgba(255,255,255,0.7)",
};

const linkHoverClass = "block transition-colors duration-300 hover:text-white";

const Footer = () => {
  return (
    <footer data-nav-dark-zone style={{ background: "#090b1a", fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
      {/* Top border */}
      <div className="w-full h-px" style={{ background: "rgba(184,160,109,0.15)" }} />

      <div className="max-w-[1140px] mx-auto px-8 md:px-12">
        <div style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "12px" }}>

          {/* ── ROW 1: Brand / Navigation / Communities / Contact ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8 lg:gap-x-6">

            {/* Brand block */}
            <div className="flex flex-col items-center sm:items-start order-1">
              <Link to="/" className="inline-block mb-1">
                <img
                  src="/static-assets/echelon-footer-logo.png"
                  alt="Echelon Property Group"
                  className="h-56 w-auto -ml-4"
                  loading="lazy" decoding="async"
                  width={224} height={224}
                />
              </Link>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: "11.5px", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, fontWeight: 300, maxWidth: "220px" }}
                className="text-center sm:text-left -mt-4 mb-3">
                Austin luxury, investment, and off-market real estate representation.
              </p>
              <Link
                to="/off-market-real-estate-austin"
                className="transition-colors duration-300 hover:text-white"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "#b9a06c", fontWeight: 400 }}
              >
                Explore Private Access →
              </Link>
            </div>

            {/* Navigation */}
            <div className="order-2">
              <h4 style={headingStyle}>Navigation</h4>
              <div>
                {[
                  { to: "/about", label: "About" },
                  { to: "/buy", label: "Buy" },
                  { to: "/sell", label: "Sell" },
                  { to: "/listings", label: "Listings" },
                  { to: "/austin-luxury-homes-for-sale", label: "Luxury Homes" },
                  { to: "/blog", label: "Insights" },
                  { to: "/invest", label: "Investment Advisory" },
                  { to: "/off-market-real-estate-austin", label: "Private Access" },
                  { to: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className={linkHoverClass} style={linkStyle}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Communities */}
            <div className="order-3">
              <h4 style={headingStyle}>Communities</h4>
              <div>
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
                  <Link key={link.to} to={link.to} className={linkHoverClass} style={linkStyle}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="order-4 sm:order-4">
              <h4 style={headingStyle}>Contact</h4>
              <div style={{ ...linkStyle, lineHeight: 1.7 }}>
                <p>2105 East MLK Blvd Ste 227</p>
                <p className="mb-2">Austin, Texas 78702</p>
                <a href="tel:+15126613843" className="block transition-colors duration-300 hover:text-white">(512) 661-3843</a>
                <a href="mailto:taylor@echelonpropertygroup.com" className="block transition-colors duration-300 hover:text-white" style={{ fontSize: "11.5px" }}>taylor@echelonpropertygroup.com</a>
              </div>
              <div className="mt-5 flex flex-col gap-1.5 items-start">
                <a href="https://www.linkedin.com/in/taylorsherwood/" target="_blank" rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#b9a06c]"
                  style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, fontSize: "11.5px", color: "rgba(255,255,255,0.55)" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Taylor Sherwood
                </a>
                <a href="https://www.instagram.com/theinvestorbroker" target="_blank" rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-[#b9a06c]"
                  style={{ fontFamily: '"Jost", sans-serif', fontWeight: 300, fontSize: "11.5px", color: "rgba(255,255,255,0.55)" }}>
                  <Instagram className="w-3.5 h-3.5" />
                  @theinvestorbroker
                </a>
              </div>
            </div>
          </div>

          {/* ── Divider between rows ── */}
          <div className="w-full h-px my-8 lg:my-10" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* ── ROW 2: Resources / Investment / Market Insights / Quick Links ── */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 lg:gap-x-6">
            <div>
              <h4 style={headingStyle}>Resources</h4>
              <div>
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
                  <Link key={link.to} to={link.to} className={linkHoverClass} style={linkStyle}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={headingStyle}>Investment</h4>
              <div>
                {[
                  { to: "/austin-real-estate-investment", label: "Investment Advisory" },
                  { to: "/austin-commercial-real-estate", label: "Commercial Real Estate" },
                  { to: "/land-for-sale-austin", label: "Land for Sale" },
                  { to: "/austin-multifamily-report-2026", label: "Multifamily Report" },
                  { to: "/austin-land-development-opportunities", label: "Land Development" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className={linkHoverClass} style={linkStyle}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={headingStyle}>Market Insights</h4>
              <div>
                {[
                  { to: "/austin-luxury-market-report", label: "Luxury Market Report" },
                  { to: "/austin-luxury-real-estate-market-report", label: "Market Data Report" },
                  { to: "/blog/austin-luxury-market-trends", label: "Market Trends 2026" },
                  { to: "/why-billionaires-are-moving-to-austin", label: "Billionaire Migration" },
                  { to: "/past-transactions", label: "Past Transactions" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className={linkHoverClass} style={linkStyle}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 style={headingStyle}>Quick Links</h4>
              <div>
                {[
                  { to: "/search", label: "Search Properties" },
                  { to: "/communities", label: "Communities" },
                  { to: "/land", label: "Land & Lots" },
                  { to: "/off-market-real-estate-austin", label: "Join Private Network" },
                ].map((link) => (
                  <Link key={link.to} to={link.to} className={linkHoverClass} style={linkStyle}>{link.label}</Link>
                ))}
                <Link to="/sitemap" className={linkHoverClass} style={{ ...linkStyle, color: "rgba(255,255,255,0.35)", fontSize: "11.5px" }}>Sitemap</Link>
              </div>
            </div>
          </div>

          {/* ── Gold divider ── */}
          <div className="w-full h-px mt-10 mb-5" style={{ background: "rgba(184,160,109,0.2)" }} />

          {/* ── Bottom bar ── */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 pb-6">
            <div className="text-center md:text-left space-y-0.5">
              <a
                href="https://www.dropbox.com/scl/fi/ism1gkeqt0bol9srh3b0a/IABS-1-2.pdf?rlkey=l05zn9bqqmg8e1ru4qjzsnd1o&dl=0"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block hover:text-[#b9a06c] transition-colors duration-300 underline decoration-[#b9a06c]/30 underline-offset-2 hover:decoration-[#b9a06c]"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11.5px", color: "rgba(184,160,109,0.7)", letterSpacing: "0.03em" }}
              >
                Information About Brokerage Services (IABS)
              </a>
              <p style={{ fontFamily: '"Jost", sans-serif', fontSize: "12px", color: "rgba(184,160,109,0.8)", fontWeight: 700 }}>
                Brokered by eXp Realty
              </p>
            </div>
            <p style={{ fontFamily: '"Jost", sans-serif', fontSize: "10.5px", color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em" }}>
              © {new Date().getFullYear()} Echelon Property Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
