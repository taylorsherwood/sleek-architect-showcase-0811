import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logo from "@/assets/echelon-header-logo.png";

interface NavLink {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Pages where the nav should never fade on scroll
  const noFadePages = ["/listings/commercial-investment-austin"];
  const shouldNeverFade = noFadePages.includes(location.pathname);

  useEffect(() => {
    if (shouldNeverFade) {
      setIsScrolled(false);
      return;
    }
    const handleScroll = () => {
      const threshold = window.innerHeight + 300;
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldNeverFade]);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const links: NavLink[] = [
    { href: "/", label: "HOME" },
    {
      href: "/listings",
      label: "LISTINGS",
      children: [
        { href: "/listings", label: "ECHELON LISTINGS" },
        { href: "/luxury-homes-austin", label: "AUSTIN LUXURY HOMES" },
        { href: "/listings/commercial-investment-austin", label: "COMMERCIAL & INVESTMENT" },
        { href: "/off-market-luxury-homes-austin", label: "PRIVATE LISTINGS" },
        { href: "/past-transactions", label: "PAST TRANSACTIONS" },
      ],
    },
    { href: "/buy", label: "BUY" },
    { href: "/sell", label: "SELL" },
    { href: "/invest", label: "INVEST" },
    { href: "/listings/commercial-investment-austin", label: "COMMERCIAL" },
    { href: "/communities", label: "COMMUNITIES" },
    { href: "/about", label: "ABOUT" },
    { href: "/blog", label: "BLOG" },
  ];

  const isActive = (link: NavLink) =>
    location.pathname === link.href ||
    link.children?.some((c) => location.pathname === c.href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-visible h-20 md:h-[6.5rem] lg:h-[7.5rem] border-b border-border/30">
      <div
        className={`absolute inset-0 backdrop-blur-md transition-all duration-500 ${
          isScrolled ? "bg-background/70" : "bg-background"
        }`}
      />
      <div className="relative container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" onClick={() => { if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center shrink-0 overflow-visible" style={{ height: '100%' }}>
          <img
            src={logo}
            alt="Echelon Property Group"
            title="Echelon Property Group — Austin Luxury Real Estate"
            className="w-auto max-w-none border-0 shrink-0 object-contain"
            style={{ height: '115%', maxHeight: '115%' }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-10 ml-8 xl:ml-12">
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
                  className={`relative text-minimal tracking-[0.25em] transition-colors duration-500 group cursor-pointer bg-transparent border-none ${
                    isActive(link)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span className="ml-1.5 text-[7px] align-middle opacity-30">▼</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold transition-transform duration-500 origin-left ${
                      isActive(link) ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
                {openDropdown === link.href && (
                  <div className="absolute top-full left-0 pt-4 min-w-[260px]">
                    <div className="bg-background border border-border/50 shadow-elegant">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-7 py-4 text-minimal tracking-[0.2em] transition-colors duration-300 ${
                            location.pathname === child.href
                              ? "text-foreground bg-muted/50"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                          }`}
                        >
                          {child.label}
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
                className={`relative text-minimal tracking-[0.25em] transition-colors duration-500 group ${
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-transform duration-500 origin-left ${
                    location.pathname === link.href ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            )
          )}
        </div>

        {/* Desktop action buttons */}
        <div className="hidden lg:flex items-center space-x-4 shrink-0 ml-4 xl:ml-8">
          <a
            href="https://echelonpropertygroup.outportal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-[0.65rem] tracking-[0.18em] uppercase font-medium border border-border/60 text-muted-foreground hover:bg-primary hover:text-white px-5 py-2.5 min-h-[38px] inline-flex items-center transition-all duration-400"
          >
            CLIENT PORTAL
          </a>
          <a
            href="https://taylorsherwood.realscout.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-[0.65rem] tracking-[0.18em] uppercase font-medium text-primary-foreground bg-primary hover:bg-gold hover:text-primary-foreground px-6 py-2.5 min-h-[38px] inline-flex items-center transition-all duration-400"
          >
            SEARCH HOMES
          </a>
        </div>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border/30">
          <div className="container mx-auto px-6 py-10 space-y-6">
            {links.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-4">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.href ? null : link.href)
                    }
                    className={`block text-minimal tracking-[0.25em] transition-colors duration-300 ${
                      isActive(link)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span className="ml-1.5 text-[7px] opacity-30">
                      {openDropdown === link.href ? "▲" : "▼"}
                    </span>
                  </button>
                  {openDropdown === link.href && (
                    <div className="pl-5 space-y-4 border-l border-border/40">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block text-minimal tracking-[0.2em] transition-colors duration-300 ${
                            location.pathname === child.href
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
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
                  onClick={() => { setIsMenuOpen(false); if (link.href === '/' && location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`block text-minimal tracking-[0.25em] transition-colors duration-300 ${
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-6 space-y-4 border-t border-border/30">
              <a
                href="https://taylorsherwood.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-minimal tracking-[0.2em] text-primary-foreground bg-primary px-4 py-3.5 text-center transition-colors duration-300"
              >
                SEARCH HOMES
              </a>
              <a
                href="https://echelonpropertygroup.outportal.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-minimal tracking-[0.2em] border border-border/50 text-muted-foreground hover:bg-primary hover:text-white px-4 py-3.5 text-center transition-colors duration-300"
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
