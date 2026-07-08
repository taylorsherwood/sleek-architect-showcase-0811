import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const logo = "/images/echelon-logo.webp";
const logoMobile = "/images/echelon-logo-mobile.png";

interface NavLink {
  href: string;
  label: string;
  external?: boolean;
  children?: { href: string; label: string; external?: boolean }[];
}


const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const links: NavLink[] = [
    {
      href: "/search",
      label: "SEARCH PROPERTIES",
      children: [
        { href: "/austin-luxury-homes-for-sale", label: "AUSTIN LUXURY HOMES" },
        { href: "/listings/commercial-investment-austin", label: "COMMERCIAL & INVESTMENT" },
        { href: "/land-ranch", label: "LAND & RANCH" },
        { href: "/land-development", label: "LAND DEVELOPMENT" },
        { href: "/past-transactions", label: "PAST TRANSACTIONS" },
        { href: "/search", label: "SEARCH ALL LISTINGS" },
      ],
    },
    { href: "/buy", label: "BUY" },
    { href: "/sell", label: "SELL" },
    { href: "/invest", label: "INVEST" },
    { href: "/communities", label: "COMMUNITIES" },
    {
      href: "/blog",
      label: "INSIGHTS",
      children: [
        { href: "/blog", label: "BLOG & PRESS" },
        { href: "/market-intelligence", label: "MARKET INTELLIGENCE" },
        { href: "/private-distribution", label: "PRIVATE MARKET INTELLIGENCE" },
      ],
    },
    { href: "/developments", label: "DEVELOPMENTS" },
    { href: "/off-market-real-estate-austin", label: "PRIVATE ACCESS" },

    { href: "/about", label: "ABOUT" },
  ];

  const isActive = (link: NavLink) =>
    location.pathname === link.href ||
    link.children?.some((c) => location.pathname === c.href);

  const navLinkStyle: React.CSSProperties = {
    fontFamily: '"Jost", sans-serif',
    fontSize: "10px",
    letterSpacing: "0.11em",
    textTransform: "uppercase",
    fontWeight: 400,
    whiteSpace: "nowrap",
    lineHeight: 1,
  };

  const navItemClasses = "relative inline-flex items-center h-4 px-0 py-0 transition-colors duration-300 group cursor-pointer";
  const underlineClasses = "absolute -bottom-1 left-0 h-px w-full transition-all duration-300 origin-left";
  const arrowClasses = "ml-1.5 text-[7px] opacity-30 leading-none";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-visible h-32 md:h-28 lg:h-[6.5rem]" style={{ borderBottom: "1px solid rgba(12, 15, 36, 0.06)", transition: "background 0.4s ease, border-color 0.4s ease", WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}>
      <div
        className="absolute inset-0"
        style={{ background: "#FCFBF9" }}
      />
      <div className="relative w-full mx-auto px-4 md:px-6 lg:px-8 xl:px-10 h-full flex items-center justify-center min-[1400px]:justify-start pb-3 min-[1400px]:pb-0">
        <Link to="/" onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center shrink-0 overflow-visible ml-0" style={{ height: '100%' }}>
          {/* Mobile/Tablet logo (below lg) */}
          <img
            src={logoMobile}
            alt="Echelon Property Group"
            title="Echelon Property Group, Austin Luxury Real Estate"
            className="block min-[1400px]:hidden w-auto max-w-[450px] border-0 shrink-0 object-contain"
            style={{ height: 'auto', maxHeight: '128%' }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={400}
            height={218}
          />
          {/* Desktop logo (lg and up) */}
          <img
            src={logo}
            alt="Echelon Property Group"
            title="Echelon Property Group, Austin Luxury Real Estate"
            className="hidden min-[1400px]:block w-auto max-w-none border-0 shrink-0 object-contain"
            style={{ height: '140%', maxHeight: '140%', aspectRatio: '200 / 80' }}
            loading="eager"
            decoding="async"
            width={200}
            height={80}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden min-[1400px]:flex items-center gap-x-3 xl:gap-x-5 2xl:gap-x-7 ml-4 xl:ml-8 flex-nowrap">
          {links.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setOpenDropdown(link.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => setOpenDropdown(openDropdown === link.href ? null : link.href)}
                  className={`${navItemClasses} bg-transparent border-none ${
                    isActive(link) ? "text-foreground" : "text-foreground/85 hover:text-foreground"
                  }`}
                  style={navLinkStyle}
                >
                  {link.label}
                  <span className={arrowClasses}>▼</span>
                  <span
                    className={`${underlineClasses} ${
                      isActive(link) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                    style={{ background: "hsl(38 39% 61%)" }}
                  />
                </button>
                {openDropdown === link.href && (
                  <div className="absolute top-full left-0 pt-4 min-w-[260px]">
                    <div style={{ background: "hsl(var(--background))", border: "1px solid rgba(255,255,255,0.08)" }} className="shadow-elegant">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-7 py-4 transition-colors duration-300"
                          style={{
                            ...navLinkStyle,
                            fontSize: "10px",
                            color: location.pathname === child.href
                              ? "hsl(var(--foreground))"
                              : "hsl(var(--foreground) / 0.7)",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = "#b9a06c"; }}
                          onMouseLeave={(e) => {
                            if (location.pathname !== child.href) {
                              e.currentTarget.style.color = "hsl(var(--foreground) / 0.7)";
                            }
                          }}
                        >
                          <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-full after:h-[1px] after:bg-gold after:scale-x-0 after:origin-left after:transition-[transform] after:duration-500 after:ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:after:scale-x-100">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : link.external ? (
              <a
                key={link.href}
                href={link.href}
                rel="noopener"
                className={`${navItemClasses} text-foreground/85 hover:text-foreground`}
                style={navLinkStyle}
              >
                {link.label}
                <span
                  className={`${underlineClasses} scale-x-0 group-hover:scale-x-100`}
                  style={{ background: "hsl(38 39% 61%)" }}
                />
              </a>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => { if (link.href === '/' && location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`${navItemClasses} ${
                  location.pathname === link.href ? "text-foreground" : "text-foreground/85 hover:text-foreground"
                }`}
                style={navLinkStyle}
              >
                {link.label}
                <span
                  className={`${underlineClasses} ${
                    location.pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ background: "hsl(38 39% 61%)" }}
                />
              </Link>
            )

          )}
        </div>

        {/* Desktop Client Portal, ghost gold button */}
        <div className="hidden min-[1400px]:flex items-center shrink-0 ml-6 xl:ml-8">
          <a
            href="https://portal.echelonpropertygroup.com/login"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="whitespace-nowrap transition-all duration-300 px-4 py-1.5 backdrop-blur-md"
            style={{
              ...navLinkStyle,
              fontSize: "9.5px",
              border: "1px solid hsl(38 39% 61%)",
              color: "hsl(38 39% 61%)",
              background: "rgba(255, 255, 255, 0.25)",
              WebkitBackdropFilter: "blur(12px)",
              backdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(38 39% 61%)"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255, 255, 255, 0.25)"; e.currentTarget.style.color = "hsl(38 39% 61%)"; }}
          >
            CLIENT PORTAL
          </a>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="min-[1400px]:hidden absolute right-2 md:right-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>
      </div>

      {/* Mobile menu, Safari-safe overlay panel */}
      {isMenuOpen && (
        <div
          className="min-[1400px]:hidden absolute left-0 right-0 top-full z-40 overflow-y-auto"
          style={{ backgroundColor: "#0C0F24", minHeight: "calc(100vh - 7rem)", WebkitOverflowScrolling: "touch" }}
        >
          <div className="container mx-auto px-6 py-12 space-y-7">
            {links.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-5">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === link.href ? null : link.href)}
                    className="block transition-colors duration-300 text-white/80 hover:text-gold"
                    style={navLinkStyle}
                  >
                    {link.label}
                    <span className="ml-1.5 text-[7px] opacity-30">
                      {openDropdown === link.href ? "▲" : "▼"}
                    </span>
                  </button>
                  {openDropdown === link.href && (
                    <div className="pl-5 space-y-5" style={{ borderLeft: "1px solid hsl(38 39% 61% / 0.3)" }}>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-white/50 hover:text-gold transition-colors duration-300"
                          style={{ ...navLinkStyle, fontSize: "10px" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  rel="noopener"
                  onClick={() => { setIsMenuOpen(false); }}
                  className="block text-white/80 hover:text-gold transition-colors duration-300"
                  style={navLinkStyle}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => { setIsMenuOpen(false); }}
                  className="block text-white/80 hover:text-gold transition-colors duration-300"
                  style={navLinkStyle}
                >
                  {link.label}
                </Link>
              )

            )}
            <div className="pt-8" style={{ borderTop: "1px solid hsl(38 39% 61% / 0.2)" }}>
              <a
                href="https://portal.echelonpropertygroup.com/login"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block px-6 py-3 transition-all duration-300"
                style={{
                  ...navLinkStyle,
                  fontSize: "10px",
                  border: "1px solid hsl(38 39% 61%)",
                  color: "hsl(38 39% 61%)",
                }}
              >
                CLIENT PORTAL
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;