import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const logo = "/images/echelon-logo.webp";
const logoMobile = "/images/echelon-logo-mobile.png";

interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
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
        { href: "/search", label: "SEARCH ALL LISTINGS" },
        { href: "/austin-luxury-homes-for-sale", label: "AUSTIN LUXURY HOMES" },
        { href: "/listings/commercial-investment-austin", label: "COMMERCIAL & INVESTMENT" },
        { href: "/past-transactions", label: "PAST TRANSACTIONS" },
      ],
    },
    { href: "/buy", label: "BUY" },
    { href: "/sell", label: "SELL" },
    { href: "/invest", label: "INVEST" },
    { href: "/communities", label: "COMMUNITIES" },
    { href: "/blog", label: "INSIGHTS" },
    { href: "/off-market-real-estate-austin", label: "PRIVATE ACCESS" },
    { href: "/about", label: "ABOUT" },
  ];

  const isActive = (link: NavLink) =>
    location.pathname === link.href ||
    link.children?.some((c) => location.pathname === c.href);

  const navLinkStyle: React.CSSProperties = {
    fontFamily: '"Jost", sans-serif',
    fontSize: "11px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    fontWeight: 400,
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-visible h-20 md:h-24 lg:h-[6.5rem]" style={{ borderBottom: "1px solid rgba(12, 15, 36, 0.06)", transition: "background 0.4s ease, border-color 0.4s ease" }}>
      <div
        className="absolute inset-0"
        style={{ background: "#f1ede4" }}
      />
      <div className="relative container mx-auto px-2 md:px-6 h-full flex items-center justify-center lg:justify-start">
        <Link to="/" onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center shrink-0 overflow-visible ml-0" style={{ height: '100%' }}>
          {/* Mobile/Tablet logo (below lg) */}
          <img
            src={logoMobile}
            alt="Echelon Property Group"
            title="Echelon Property Group — Austin Luxury Real Estate"
            className="block lg:hidden w-auto max-w-[420px] border-0 shrink-0 object-contain"
            style={{ height: 'auto', maxHeight: '120%' }}
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
            title="Echelon Property Group — Austin Luxury Real Estate"
            className="hidden lg:block w-auto max-w-none border-0 shrink-0 object-contain"
            style={{ height: '125%', maxHeight: '125%', aspectRatio: '200 / 80' }}
            loading="eager"
            decoding="async"
            width={200}
            height={80}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 -ml-8 xl:-ml-6">
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
                  className={`relative transition-colors duration-300 group cursor-pointer bg-transparent border-none ${
                    isActive(link) ? "text-foreground" : "text-foreground/75 hover:text-foreground"
                  }`}
                  style={navLinkStyle}
                >
                  {link.label}
                  <span className="ml-1.5 text-[7px] align-middle opacity-30">▼</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-300 origin-left ${
                      isActive(link) ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
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
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => { if (link.href === '/' && location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`relative transition-colors duration-300 group ${
                  location.pathname === link.href ? "text-foreground" : "text-foreground/75 hover:text-foreground"
                }`}
                style={navLinkStyle}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px transition-all duration-300 origin-left ${
                    location.pathname === link.href ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ background: "hsl(38 39% 61%)" }}
                />
              </Link>
            )
          )}
        </div>

        {/* Desktop Client Portal — ghost gold button */}
        <div className="hidden lg:flex items-center shrink-0 ml-auto">
          <a
            href="https://echelonpropertygroup.outportal.ai"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="whitespace-nowrap transition-all duration-300 px-5 py-2"
            style={{
              ...navLinkStyle,
              fontSize: "10px",
              border: "1px solid hsl(38 39% 61%)",
              color: "hsl(38 39% 61%)",
              background: "transparent",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "hsl(38 39% 61%)"; e.currentTarget.style.color = "#ffffff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "hsl(38 39% 61%)"; }}
          >
            CLIENT PORTAL
          </a>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden absolute right-2 md:right-6"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>
      </div>

      {/* Mobile menu — full-screen dark overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 md:top-24 z-40" style={{ background: "#0C0F24" }}>
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
                href="https://echelonpropertygroup.outportal.ai"
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