import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/listings", label: "LISTINGS" },
    { href: "/communities", label: "COMMUNITIES" },
    { href: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex flex-col items-start">
          <span className="text-xl font-display font-semibold tracking-wide text-foreground">
            ECHELON
          </span>
          <span className="text-minimal text-muted-foreground text-[9px] tracking-[0.35em]">
            PROPERTY GROUP
          </span>
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10">
          {links.map((link) => (
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
          ))}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://homescout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-minimal text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-2.5 transition-colors duration-300"
          >
            SEARCH HOMES
          </a>
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {links.map((link) => (
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
            ))}
            <a
              href="https://homescout.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-minimal text-gold hover:text-gold-light transition-colors duration-300"
            >
              SEARCH HOMES
            </a>
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
