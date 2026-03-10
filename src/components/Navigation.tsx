import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

import logo from "@/assets/logo-echelon.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/listings", label: "LISTINGS" },
  { href: "/communities", label: "COMMUNITIES" },
  { href: "/contact", label: "CONTACT" }];


  return (
    <nav className="fixed top-0 left-0 right-0 z-50 overflow-visible h-24 border-b border-border/50">
      <div className={`absolute inset-0 backdrop-blur-md transition-colors duration-300 ${isScrolled ? 'bg-background/65' : 'bg-background'}`}></div>
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
            href="https://echelonpropertygroup.outportal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-minimal border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-5 py-2.5 transition-colors duration-300">TRANSACTION PORTAL

          </a>
          <a
            href="https://taylorsherwood.realscout.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-minimal text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-2.5 transition-colors duration-300">
            SEARCH HOMES
          </a>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          
          {isMenuOpen ? '✕' : '☰'}
        </Button>
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
            href="https://echelonpropertygroup.outportal.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-minimal border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 text-center transition-colors duration-300">
              TRANSACTION PORTAL
            </a>
            <a
            href="https://taylorsherwood.realscout.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-minimal text-gold hover:text-gold-light transition-colors duration-300">
              SEARCH HOMES
            </a>
          </div>
        </div>
      }
    </nav>);

};

export default Navigation;