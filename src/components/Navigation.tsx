import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo-echelon.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/listings", label: "LISTINGS" },
  { href: "/communities", label: "COMMUNITIES" },
  { href: "/contact", label: "CONTACT" }];


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-visible h-16 border-b border-border/50">
      <div className="absolute inset-0 bg-background/65 backdrop-blur-md"></div>
      <div className="relative container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Echelon Property Group" className="h-40 md:h-48 w-auto border-0" />
        </Link>
        
        <div className="hidden lg:flex items-center space-x-10">
          {links.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            className={`text-minimal transition-colors duration-300 ${
            location.pathname === link.href ?
            "text-foreground" :
            "text-muted-foreground hover:text-foreground"}`
            }>
            
              {link.label}
            </Link>
          )}
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <a
            href="https://homescout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-minimal text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-2.5 transition-colors duration-300">
            
            SEARCH HOMES
          </a>
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </div>
      </div>

      {isMenuOpen &&
      <div className="lg:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {links.map((link) =>
          <Link
            key={link.href}
            to={link.href}
            onClick={() => setIsMenuOpen(false)}
            className={`block text-minimal transition-colors duration-300 ${
            location.pathname === link.href ?
            "text-foreground" :
            "text-muted-foreground hover:text-foreground"}`
            }>
            
                {link.label}
              </Link>
          )}
            <a
            href="https://homescout.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-minimal text-gold hover:text-gold-light transition-colors duration-300">
            
              SEARCH HOMES
            </a>
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      }
    </nav>);

};

export default Navigation;