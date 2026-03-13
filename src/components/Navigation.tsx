import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo-echelon.png";

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        { href: "/listings", label: "RESIDENTIAL LISTINGS" },
        { href: "/listings/commercial-investment-austin", label: "COMMERCIAL & INVESTMENT" },
        { href: "/off-market-luxury-homes-austin", label: "EXCLUSIVE PRIVATE LISTINGS" },
        { href: "/past-transactions", label: "PAST TRANSACTIONS" },
      ],
    },
    { href: "/buy", label: "BUY" },
    { href: "/sell", label: "SELL" },
    { href: "/listings/commercial-investment-austin", label: "INVEST" },
    { href: "/communities", label: "COMMUNITIES" },
    { href: "/about", label: "ABOUT" },
  ];

  const isActive = (link: NavLink) =>
    location.pathname === link.href ||
    link.children?.some((c) => location.pathname === c.href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-visible h-24 border-b border-border/50">
      <div
        className={`absolute inset-0 backdrop-blur-md transition-colors duration-300 ${
          isScrolled ? "bg-background/65" : "bg-background"
        }`}
      />
      <div className="relative container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/">
          <img
            src={logo}
            alt="Echelon Property Group"
            className="h-64 md:h-72 w-auto border-0 object-contain"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center space-x-12 ml-12">
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
                  className={`relative text-minimal tracking-[0.25em] transition-colors duration-300 group cursor-pointer bg-transparent border-none ${
                    isActive(link)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span className="ml-1.5 text-[7px] align-middle opacity-40">▼</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-foreground transition-transform duration-500 origin-left ${
                      isActive(link) ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
                {openDropdown === link.href && (
                  <div className="absolute top-full left-0 pt-3 min-w-[260px]">
                    <div className="bg-background border border-border shadow-elegant">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-6 py-3.5 text-minimal tracking-[0.2em] transition-colors duration-200 ${
                            location.pathname === child.href
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
                className={`relative text-minimal tracking-[0.25em] transition-colors duration-300 group ${
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-foreground transition-transform duration-500 origin-left ${
                    location.pathname === link.href ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            )
          )}
        </div>

        {/* Desktop action buttons */}
        <div className="hidden lg:flex items-center space-x-3 shrink-0 ml-8">
          <a
            href="https://echelonpropertygroup.outportal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-minimal tracking-[0.2em] border border-border text-muted-foreground hover:text-primary-foreground hover:bg-[#0C0F24] hover:border-[#0C0F24] px-5 py-2.5 min-h-[40px] inline-flex items-center transition-all duration-300"
          >
            CLIENT PORTAL
          </a>
          <a
            href="https://taylorsherwood.realscout.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap text-minimal tracking-[0.2em] text-primary-foreground bg-[#0C0F24] hover:bg-gold hover:border-gold px-6 py-2.5 min-h-[40px] inline-flex items-center transition-colors duration-300"
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
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-8 space-y-5">
            {links.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-3">
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
                    <span className="ml-1.5 text-[7px] opacity-40">
                      {openDropdown === link.href ? "▲" : "▼"}
                    </span>
                  </button>
                  {openDropdown === link.href && (
                    <div className="pl-4 space-y-3 border-l border-border">
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
                  onClick={() => setIsMenuOpen(false)}
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
            <div className="pt-4 space-y-3 border-t border-border">
              <a
                href="https://taylorsherwood.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-minimal tracking-[0.2em] text-primary-foreground bg-[#0C0F24] px-4 py-3 text-center transition-colors duration-300"
              >
                SEARCH HOMES
              </a>
              <a
                href="https://echelonpropertygroup.outportal.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-minimal tracking-[0.2em] border border-border text-muted-foreground hover:text-foreground px-4 py-3 text-center transition-colors duration-300"
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
