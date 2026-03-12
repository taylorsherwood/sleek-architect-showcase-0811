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
    { href: "/about", label: "ABOUT" },
    {
      href: "/listings",
      label: "LISTINGS",
      children: [
        { href: "/listings", label: "RESIDENTIAL LISTINGS" },
        { href: "/listings/commercial-investment-austin", label: "COMMERCIAL & INVESTMENT" },
      ],
    },
    { href: "/communities", label: "COMMUNITIES" },
    { href: "/blog", label: "BLOG" },
    { href: "/contact", label: "CONTACT" },
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
            className="h-40 md:h-48 w-auto border-0"
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-10">
          {links.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={() => setOpenDropdown(link.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`text-minimal transition-colors duration-300 ${
                    isActive(link)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span className="ml-1 text-[8px] align-middle">▼</span>
                </Link>
                {openDropdown === link.href && (
                  <div className="absolute top-full left-0 pt-2 min-w-[240px]">
                    <div className="bg-background border border-border shadow-lg">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={`block px-5 py-3 text-minimal transition-colors duration-200 ${
                            location.pathname === child.href
                              ? "text-foreground bg-muted"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                className={`text-minimal transition-colors duration-300 ${
                  location.pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://echelonpropertygroup.outportal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-minimal border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2.5 transition-colors duration-300"
          >
            TRANSACTION PORTAL
          </a>
          <a
            href="https://taylorsherwood.realscout.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-minimal text-primary-foreground bg-[#0C0F24] hover:bg-[#0C0F24]/90 px-5 py-2.5 transition-colors duration-300"
          >
            SEARCH HOMES
          </a>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {links.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-2">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === link.href ? null : link.href)
                    }
                    className={`block text-minimal transition-colors duration-300 ${
                      isActive(link)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    <span className="ml-1 text-[8px]">
                      {openDropdown === link.href ? "▲" : "▼"}
                    </span>
                  </button>
                  {openDropdown === link.href && (
                    <div className="pl-4 space-y-2 border-l border-border">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block text-minimal transition-colors duration-300 ${
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
                  className={`block text-minimal transition-colors duration-300 ${
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="https://echelonpropertygroup.outportal.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-minimal border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 text-center transition-colors duration-300"
            >
              TRANSACTION PORTAL
            </a>
            <a
              href="https://taylorsherwood.realscout.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-minimal text-gold hover:text-gold-light transition-colors duration-300"
            >
              SEARCH HOMES
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
