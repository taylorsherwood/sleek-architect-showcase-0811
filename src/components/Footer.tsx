import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";

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
  color: "#FAFAF8",
  marginBottom: "20px",
  fontWeight: 400,
};

const Footer = () => {
  return (
    <footer style={{ background: "#0D0D0D", fontFamily: '"Jost", sans-serif', fontWeight: 300 }}>
      <div className="container mx-auto px-6">
        <div className="max-w-[1320px] mx-auto" style={{ padding: "clamp(60px, 8vw, 100px) 0 40px" }}>
          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16 text-center sm:text-left">
            {/* Brand column */}
            <div>
              <Link to="/" className="inline-block mb-5">
                <img
                  src="/static-assets/echelon-logo-gold-square.png"
                  alt="Echelon Property Group"
                  className="h-12 w-auto mx-auto sm:mx-0"
                  loading="lazy" decoding="async"
                />
              </Link>
              <p style={{ ...footerLinkStyle, lineHeight: 1.7, marginBottom: "16px" }}>
                Strategic Austin Real Estate Advisory
              </p>
              <a
                href="https://www.instagram.com/theinvestorbroker"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 transition-colors duration-300 hover:opacity-80"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", letterSpacing: "0.12em", color: "hsl(38 39% 61%)", textTransform: "uppercase", fontWeight: 400 }}
              >
                <Instagram className="w-4 h-4" />
                @theinvestorbroker
              </a>
            </div>

            {/* Navigation column */}
            <div>
              <h4 style={footerHeadingStyle}>NAVIGATION</h4>
              <div className="space-y-0">
                {[
                  { to: "/buy", label: "Buy" },
                  { to: "/sell", label: "Sell" },
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
              <div className="mt-4">
                <a href="https://www.linkedin.com/in/taylorsherwood/" target="_blank" rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors duration-300"
                  style={{ ...footerLinkStyle, fontSize: "12px" }}>
                  <Linkedin className="w-4 h-4" fill="currentColor" />
                  Taylor Sherwood
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
                className="hover:text-gold transition-colors duration-300 underline underline-offset-2"
                style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", color: "#4A4844" }}
              >
                Information About Brokerage Services
              </a>
            </div>
            <p className="text-center" style={{ fontFamily: '"Jost", sans-serif', fontSize: "11px", color: "#4A4844" }}>
              <a href="https://expluxury.com/?tl=en" target="_blank" rel="noopener noreferrer nofollow" className="hover:text-gold transition-colors duration-300">
                eXp Luxury Division
              </a>
              {" · "}Licensed in Texas{" · "}© {new Date().getFullYear()} Echelon Property Group
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
