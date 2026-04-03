import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";

const footerLinkStyle: React.CSSProperties = {
  fontFamily: '"Jost", sans-serif',
  fontWeight: 300,
  fontSize: "13px",
  lineHeight: 2,
  color: "#9A9690",
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
                  { to: "/communities", label: "Communities" },
                  { to: "/blog", label: "Insights" },
                  { to: "/invest", label: "Private Access" },
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
                  className="inline-flex items-center gap-2 hover:text-white transition-colors duration-300"
                  style={{ ...footerLinkStyle, fontSize: "12px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Taylor Sherwood
                </a>
                <a
                  href="https://www.instagram.com/theinvestorbroker"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors duration-300"
                  style={{ ...footerLinkStyle, fontSize: "12px", color: "hsl(38 39% 61%)" }}
                >
                  <Instagram className="w-4 h-4" />
                  @theinvestorbroker
                </a>
              </div>
            </div>
          </div>

          {/* Gold divider */}
          <div className="w-full h-px mb-6" style={{ background: "hsl(38 39% 61% / 0.3)" }} />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pb-6">
            <div className="text-center md:text-left">
              <a
                href="https://www.dropbox.com/scl/fi/ism1gkeqt0bol9srh3b0a/IABS-1-2.pdf?rlkey=l05zn9bqqmg8e1ru4qjzsnd1o&dl=0"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-gold transition-colors duration-300 block whitespace-pre-line"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", color: "hsl(38 39% 61% / 0.65)" }}
              >
                Information About Brokerage Services{"\n"}
                <b className="font-extrabold">Brokered by eXp Realty</b>
              </a>
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
